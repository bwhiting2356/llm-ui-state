import { Message } from 'ai';
import React from 'react';
import Markdown from 'react-markdown';
import { Robot } from '@phosphor-icons/react';

interface MessageComponentProps {
    message?: Message;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
    return (
        <div
            className={`py-1 my-1 text-left ${message?.role === 'user' ? 'self-end' : 'text-left self-start'} ${message?.role === 'user' ? 'bg-gray-200 rounded px-2 py-1' : ''}`}
            style={{
                maxWidth: '75%',
                backgroundColor: message?.role === 'assistant' ? 'transparent' : undefined,
            }}
        >
            <div className="flex space-x-1 items-start">
                {' '}
                {message?.role !== 'user' && (
                    <div className="mt-0.5">
                        <Robot size={14} />
                    </div>
                )}
                <div className="markdown" style={{ flex: 1 }}>
                    {message?.content ? <Markdown>{message.content}</Markdown> : 'Thinking...'}
                </div>
            </div>
        </div>
    );
};

export default MessageComponent;
