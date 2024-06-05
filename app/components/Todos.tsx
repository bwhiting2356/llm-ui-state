import React, { useContext } from 'react';
import { TodoContext } from '../state/context';
import { Todo } from '../state/todoReducer';
import { GroupByPicker } from './GroupByPicker';
import { capitalizeWords } from '@/lib/utils';
import { TodoCard } from './TodoCard';
import { EditAddDialog } from './EditAddDialog';

function groupTodos(todos: Todo[], groupBy: 'status' | 'assigned') {
    return todos.reduce(
        (acc, todo) => {
            const key = todo[groupBy];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(todo);
            return acc;
        },
        {} as Record<string, Todo[]>,
    );
}

export default function Todos() {
    const { todoState, panelOpen, dispatch } = useContext(TodoContext);
    const groupedTodos = groupTodos(todoState.todos, todoState.groupBy);

    const onAddTodo = (todo: Todo) => {
        dispatch({ type: 'batch_add_todos', payload: { todos: [todo] } });
    };

    const renderColumn = (key: string, todos: Todo[]) => (
        <div key={key} className="flex-1">
            <h2 className="text-normal font-semibold mb-4">{capitalizeWords(key)}</h2>
            <div className="space-y-4">
                {todos.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );

    return (
        <div
            className={`flex flex-col h-screen overflow-scroll px-4 justify-start transition-width duration-300 ${panelOpen ? 'w-2/3' : 'w-full'}`}
        >
            <div className="flex justify-between items-center mt-2 mb-4">
                <h2 className="font-bold text-xl">Todos</h2>
                <GroupByPicker />
                <EditAddDialog onSave={onAddTodo} />
            </div>
            <div className="flex space-x-4">
                {Object.keys(groupedTodos).map(key => renderColumn(key, groupedTodos[key]))}
            </div>
        </div>
    );
}
