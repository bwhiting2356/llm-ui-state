import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { TodoStatus } from '@/app/state/todoReducer';

const badgeVariants = cva(
    'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                [TodoStatus.BACKLOG]: 'bg-gray-100 text-gray-700',
                [TodoStatus.TO_DO]: 'bg-blue-100 text-blue-700',
                [TodoStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-700',
                [TodoStatus.IN_REVIEW]: 'bg-purple-100 text-purple-700',
                [TodoStatus.BLOCKED]: 'bg-red-100 text-red-700',
                [TodoStatus.DONE]: 'bg-green-100 text-green-700',
                default: 'bg-gray-100 text-gray-700',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function StatusBadge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { StatusBadge, badgeVariants };
