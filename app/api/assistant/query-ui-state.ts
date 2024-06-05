import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

const promptTemplate = `
<query>{QUERY}</query>
<state>{STATE}</state>
Please respond with the slice of JSON application state that is the most relevant, and a summary of how that state is relevant to the query
`;

const buildPrompt = (query: string, state: any) => {
    return promptTemplate.replace('{QUERY}', query).replace('{STATE}', JSON.stringify(state));
};

export async function queryUIState({ query, state }: { query: string; state: string }) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: buildPrompt(query, state) }],
        model: 'gpt-4o',
    });

    return completion.choices[0].message.content || '';
}
