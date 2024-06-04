import React, { useContext } from 'react';
import { TodoContext } from '../state/context';

export default function Todos() {
    const { todoState } = useContext(TodoContext);
    console.log('todoState', todoState);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-3xl font-bold">Todos</h1>
            <p className="text-lg">This is a todos page</p>
            <ul className="list-disc">
                {todoState.todos.map(todo => (
                    <li key={todo.id} className="my-2">
                        <div className="font-bold">{todo?.text}</div>
                        <div>Status: {todo?.state}</div>
                        <div>Assigned to: {todo.assigned}</div>
                        <div>
                            Location: ({todo.location.lat}, {todo.location.lng})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
