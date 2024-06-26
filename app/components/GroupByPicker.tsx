'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TodoContext } from '../state/context';
import { useContext, useState } from 'react';

type Option = {
    value: 'status' | 'assigned';
    label: string;
};

const groupByOptions: Option[] = [
    {
        value: 'status',
        label: 'Status',
    },
    {
        value: 'assigned',
        label: 'Assigned',
    },
];

const getLabel = (value: string | null) =>
    groupByOptions.find(option => option.value === value)?.label;

export function GroupByPicker() {
    const [open, setOpen] = useState(false);
    const {
        todoState: { groupBy },
        dispatch,
    } = useContext(TodoContext);

    const setGroupBy = (option: Option) => {
        dispatch({ type: 'set_group_by', payload: { groupBy: option.value } });
    };

    return (
        <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground">Group By</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {getLabel(groupBy)}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {groupByOptions.map(option => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={value => {
                                            setGroupBy(
                                                groupByOptions.find(
                                                    opt => opt.value === value,
                                                ) as Option,
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
