import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { TodoContext } from '../state/context';
import { Message } from 'ai/react';
import { Input } from '@/components/ui/input';
import MessageComponent from './MessageComponent';
import { X, Chat as ChatIcon } from '@phosphor-icons/react';

const suggestions = [
    "Reassign all of Bob's tasks to Alice",
    'How many tasks are in progress?',
    'Change the view to group by assigned',
    'Add a new task for Dana to do E2E QA testing',
];

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

    const showSuggestions = useMemo(
        () =>
            status === 'awaiting_message' &&
            !(input?.length && input.length > 0) &&
            filteredMessages.length === 0,
        [status, input, filteredMessages],
    );

    const showSkeleton = useMemo(() => {
        const lastMessage = filteredMessages[filteredMessages.length - 1];
        console.log('lastMessage', lastMessage);
        return lastMessage?.role !== 'assistant' && status !== 'awaiting_message';
    }, [status]);

    const handleSuggestionClick = useCallback(
        (suggestion: string) => {
            if (inputRef.current) {
                const event = {
                    target: inputRef.current,
                    currentTarget: inputRef.current,
                } as ChangeEvent<HTMLInputElement>;

                inputRef.current.value = suggestion;
                handleInputChange(event);
                inputRef.current.focus();
            }
        },
        [handleInputChange, submitMessage],
    );

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
            className={`flex flex-col overflow-y-scroll items-center justify-between max-h-screen text-sm ${panelOpen ? 'w-1/3' : 'w-12'} h-full border-r transition-width duration-300 relative`}
        >
            {panelOpen && (
                <div className="flex flex-col w-full mx-auto flex-grow px-2">
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
                        <MessageComponent key={m.id} message={m} />
                    ))}
                    {showSkeleton && <MessageComponent />}
                    <div ref={messagesEndRef} />
                </div>
            )}
            {panelOpen && (
                <div className="w-full sticky bottom-0 p-2 border-t border-gray-300 bg-white">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {showSuggestions &&
                            suggestions.map(s => (
                                <div
                                    key={s}
                                    className="p-2 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
                                    onClick={() => {
                                        handleSuggestionClick(s);
                                    }}
                                >
                                    {s}
                                </div>
                            ))}
                    </div>
                    <form onSubmit={submitMessage} className="flex w-full items-center space-x-2 ">
                        <Input
                            ref={inputRef}
                            disabled={status !== 'awaiting_message'}
                            className="flex-grow p-2 border border-gray-300 rounded-l shadow-xl"
                            value={input}
                            placeholder="What do you want to ask your AI Copilot"
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
                className="absolute top-4 right-2 p-2 bg-gray-700 text-white rounded-full shadow-md focus:outline-none"
            >
                {panelOpen ? <X /> : <ChatIcon />}
            </button>
        </div>
    );
}
