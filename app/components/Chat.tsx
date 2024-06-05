import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../state/context';
import { Message } from 'ai/react';
import { Input } from '@/components/ui/input';

const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'black',
    function: 'blue',
    tool: 'purple',
    assistant: 'green',
    data: 'orange',
};

export default function Chat() {
    const {
        panelOpen,
        setPanelOpen,
        submitMessage,
        messages,
        error,
        handleInputChange,
        input,
        status,
        stop,
    } = useContext(TodoContext);

    const filteredMessages = messages.filter((m: Message) => m.role !== 'data');
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === 'awaiting_message') {
            inputRef.current?.focus();
        }
    }, [status]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <div
            className={`flex flex-col overflow-y-scroll items-center justify-between max-h-screen text-sm ${panelOpen ? 'w-1/3' : 'w-16'} h-full border-r transition-width duration-300 relative`}
        >
            {panelOpen && (
                <div className="flex flex-col w-full max-w-md mx-auto flex-grow px-2">
                    <div className="mt-6">
                        <h2 className="font-bold text-xl">AI Copilot</h2>
                    </div>
                    {error != null && (
                        <div className="relative px-6 py-4 text-white bg-red-500 rounded-md">
                            <span className="block sm:inline">
                                Error: {(error as any).toString()}
                            </span>
                        </div>
                    )}

                    {filteredMessages.map((m: Message) => (
                        <div
                            key={m.id}
                            className={`whitespace-pre-wrap pb-2 ${m.role === 'user' ? 'text-right self-end' : 'text-left self-start'} ${m.role === 'user' ? 'bg-gray-200 rounded px-2 py-1' : ''}`}
                            style={{
                                color: roleToColorMap[m.role],
                                maxWidth: '75%',
                                backgroundColor: m.role === 'assistant' ? 'transparent' : undefined,
                            }}
                        >
                            <div className="flex">
                                {m.role === 'assistant' && (
                                    <div role="img" aria-label="AI">
                                        🤖
                                    </div>
                                )}
                                <div className="markdown">
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                    {status === 'in_progress' && (
                        <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
                    )}
                </div>
            )}
            {panelOpen && (
                <div className="w-full max-w-md sticky bottom-0 p-2 border-t border-gray-300 bg-white">
                    <form onSubmit={submitMessage} className="flex w-full items-center space-x-2 ">
                        <Input
                            ref={inputRef}
                            disabled={status !== 'awaiting_message'}
                            className="flex-grow p-2 border border-gray-300 rounded-l shadow-xl"
                            value={input}
                            placeholder="What is the temperature in the living room?"
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className={`p-2 ${status === 'in_progress' ? 'bg-red-500' : 'bg-blue-500'} rounded text-white`}
                            onClick={status === 'in_progress' ? stop : undefined}
                        >
                            {status === 'in_progress' ? '■' : '→'}
                        </button>
                    </form>
                </div>
            )}
            <button
                onClick={() => setPanelOpen(!panelOpen)}
                className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-full shadow-md focus:outline-none"
            >
                {panelOpen ? '<' : '>'}
            </button>
        </div>
    );
}
