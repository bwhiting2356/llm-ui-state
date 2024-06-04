import { AssistantResponse } from 'ai';
import OpenAI from 'openai';
import { queryUIState } from './query-ui-state';
import { generateUUID } from './generate-uuid';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const input: {
        threadId: string | null;
        message: string;
        state: any;
    } = await req.json();

    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

    const createdMessage = await openai.beta.threads.messages.create(
        threadId,
        {
            role: 'user',
            content: input.message,
        },
        { signal: req.signal },
    );

    return AssistantResponse(
        { threadId, messageId: createdMessage.id },
        async ({ forwardStream, sendDataMessage }) => {
            const runStream = openai.beta.threads.runs.stream(
                threadId,
                {
                    assistant_id:
                        process.env.ASSISTANT_ID ??
                        (() => {
                            throw new Error('ASSISTANT_ID is not set');
                        })(),
                },
                { signal: req.signal },
            );

            // forward run status would stream message deltas
            let runResult = await forwardStream(runStream);

            // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
            while (
                runResult?.status === 'requires_action' &&
                runResult.required_action?.type === 'submit_tool_outputs'
            ) {
                const toolCalls = runResult.required_action.submit_tool_outputs.tool_calls;
                const tool_outputs = await Promise.all(
                    toolCalls.map(async (toolCall: any) => {
                        if (toolCall.function.name === 'query_ui_state') {
                            const state = input.state;
                            const { query } = JSON.parse(toolCall.function.arguments);

                            const response = await queryUIState({ query, state });
                            return {
                                tool_call_id: toolCall.id,
                                output: response,
                            };
                        }

                        if (toolCall.function.name === 'generate_uuid') {
                            return {
                                tool_call_id: toolCall.id,
                                output: generateUUID(),
                            };
                        }

                        sendDataMessage({
                            role: 'data',
                            data: {
                                ...toolCall,
                            },
                        });

                        return {
                            tool_call_id: toolCall.id,
                            output: 'success',
                        };
                    }),
                );

                runResult = await forwardStream(
                    openai.beta.threads.runs.submitToolOutputsStream(
                        threadId,
                        runResult.id,
                        { tool_outputs },
                        { signal: req.signal },
                    ),
                );
            }
        },
    );
}
