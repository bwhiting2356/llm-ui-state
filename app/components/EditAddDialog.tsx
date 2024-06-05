import { useState } from 'react';
import { Todo, TodoStatus } from '../state/todoReducer';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PencilSimple, Plus, PlusCircle } from '@phosphor-icons/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { capitalizeWords } from '@/lib/utils';

interface EditAddDialogProps {
    todo?: Todo;
    onSave: (todo: Todo) => void;
}
export const EditAddDialog = ({ todo, onSave }: EditAddDialogProps) => {
    const [newTodo, setNewTodo] = useState<Todo>(() => {
        if (todo) {
            return { ...todo };
        }
        return new Todo();
    });

    const onChangeText = (e: any) => {
        setNewTodo({
            ...newTodo,
            text: e.target.value,
        });
    };

    const onChangeAssigned = (e: any) => {
        setNewTodo({
            ...newTodo,
            assigned: e.target.value,
        });
    };

    const onChangeStatus = (value: TodoStatus) => {
        setNewTodo({
            ...newTodo,
            status: value,
        });
    };

    return (
        <Dialog>
            <DialogTrigger>
                {todo ? (
                    <PencilSimple className="cursor-pointer " size={16} />
                ) : (
                    <div className="border rounded flex items-center p-2 font-normal text-xs">
                        <div className="mr-2">
                            <PlusCircle />
                        </div>
                        Add Todo
                    </div>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2">{todo ? 'Edit Todo' : 'Add Todo'}</DialogTitle>
                    <DialogDescription className="space-y-4">
                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Input
                                placeholder="A description of the task"
                                value={newTodo?.text}
                                onChange={onChangeText}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Assigned</Label>
                            <Input
                                placeholder="Someone to assign the task to"
                                value={newTodo?.assigned}
                                onChange={onChangeAssigned}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Status</Label>
                            <Select onValueChange={onChangeStatus} defaultValue={newTodo?.status}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select status">
                                        {capitalizeWords(newTodo?.status as any)}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(TodoStatus).map(status => (
                                        <SelectItem key={status} value={status}>
                                            {capitalizeWords(status)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogTrigger asChild>
                            <Button variant="default" onClick={() => onSave(newTodo)}>
                                Save
                            </Button>
                        </DialogTrigger>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
