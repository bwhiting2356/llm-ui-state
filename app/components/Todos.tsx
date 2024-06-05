import React, { useContext } from 'react';
import { TodoContext } from '../state/context';
import { Todo } from '../state/todoReducer';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import { GroupByPicker } from './GroupByPicker';

function groupTodos(todos: Todo[], groupBy: 'state' | 'assigned') {
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

const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default function Todos() {
    const { todoState } = useContext(TodoContext);
    const groupedTodos = groupTodos(todoState.todos, todoState.groupBy);

    const renderColumn = (key: string, todos: Todo[]) => (
        <div key={key} className="flex-1">
            <h2 className="text-normal font-semibold mb-4">{capitalizeWords(key)}</h2>
            <div className="space-y-4">
                {todos.map(todo => (
                    <Card key={todo.id} className="border p-2">
                        <CardTitle className="text-sm mb-2 font-normal">{todo.text}</CardTitle>
                        <CardContent className="p-0">
                            {todoState.groupBy !== 'state' && (
                                <StatusBadge variant={todo.state}>
                                    {capitalizeWords(todo.state)}
                                </StatusBadge>
                            )}
                            {todoState.groupBy !== 'assigned' && (
                                <Badge variant="outline">{todo.assigned}</Badge>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen px-4 justify-start">
            <div className="flex space-x-12 items-center my-4">
                <h2 className="font-bold text-xl">Todos</h2>
                <GroupByPicker />
            </div>
            <div className="flex space-x-4">
                {Object.keys(groupedTodos).map(key => renderColumn(key, groupedTodos[key]))}
            </div>
        </div>
    );
}
