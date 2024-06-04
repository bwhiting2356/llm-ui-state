import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../state/context';
import { Message, useAssistant } from 'ai/react';

const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'white',
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
    useEffect(() => {
        if (status === 'awaiting_message') {
            inputRef.current?.focus();
        }
    }, [status]);

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen ${panelOpen ? 'w-1/2' : 'w-16'} h-full border-r transition-width duration-300 relative bg-gray-900`}
        >
            <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
                {error != null && (
                    <div className="relative px-6 py-4 text-white bg-red-500 rounded-md">
                        <span className="block sm:inline">Error: {(error as any).toString()}</span>
                    </div>
                )}

                {filteredMessages.map((m: Message) => (
                    <div
                        key={m.id}
                        className="whitespace-pre-wrap"
                        style={{ color: roleToColorMap[m.role] }}
                    >
                        <strong>{`${m.role}: `}</strong>
                        {m.role !== 'data' && m.content}
                        {m.role === 'data' && (
                            <>
                                {(m.data as any).description}
                                <br />
                                <pre className={'bg-gray-200'}>
                                    {JSON.stringify(m.data, null, 2)}
                                </pre>
                            </>
                        )}
                        <br />
                        <br />
                    </div>
                ))}

                {status === 'in_progress' && (
                    <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
                )}
                {panelOpen && (
                    <div>
                        <form onSubmit={submitMessage}>
                            <input
                                ref={inputRef}
                                disabled={status !== 'awaiting_message'}
                                className="fixed w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl bottom-14 ax-w-md"
                                value={input}
                                placeholder="What is the temperature in the living room?"
                                onChange={handleInputChange}
                            />
                        </form>

                        <button
                            className="fixed bottom-0 w-full max-w-md p-2 mb-8 text-white bg-red-500 rounded-lg"
                            onClick={stop}
                        >
                            Stop
                        </button>
                    </div>
                )}
            </div>
            <button
                onClick={() => setPanelOpen(!panelOpen)}
                className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-full shadow-md focus:outline-none"
            >
                {panelOpen ? '<' : '>'}
            </button>
        </div>
    );
}
