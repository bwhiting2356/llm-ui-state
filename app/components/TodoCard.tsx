import { useContext, useState } from 'react';
import { PencilSimple, TrashSimple } from '@phosphor-icons/react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { capitalizeWords } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TodoContext } from '../state/context';
import { Todo } from '../state/todoReducer';

interface TodoCardProps {
    todo: Todo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
    const { todoState, dispatch } = useContext(TodoContext);

    const onDeleteTodo = () => {
        dispatch({ type: 'batch_delete_todos', payload: { ids: [todo.id] } });
    }

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card 
            key={todo.id} 
            className="border p-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardTitle className="text-sm mb-2 font-normal">{todo.text}</CardTitle>
            <CardContent className="p-0">
                {todoState.groupBy !== 'status' && (
                    <StatusBadge variant={todo.status}>
                        {capitalizeWords(todo.status)}
                    </StatusBadge>
                )}
                {todoState.groupBy !== 'assigned' && (
                    <Badge variant="outline">{todo.assigned}</Badge>
                )}
            </CardContent>
            {isHovered && (
                <div className="absolute top-2 right-2 flex space-x-2 bg-white bg-opacity-100 border rounded p-1 rounded">
                    <PencilSimple className="cursor-pointer " size={16} />
                    <TrashSimple className="cursor-pointer " size={16} onClick={() => onDeleteTodo()} />
                </div>
            )}
        </Card>
    );
};