import { v4 as uuidv4 } from 'uuid';

export enum TodoStatus {
    BACKLOG = 'backlog',
    TO_DO = 'to do',
    IN_PROGRESS = 'in progress',
    IN_REVIEW = 'in review',
    BLOCKED = 'blocked',
    DONE = 'done',
}

export interface Todo {
    id: string;
    text: string;
    state: TodoStatus;
    assigned: string;
}

type Action =
    | { type: 'change_tab'; payload: { tab: 'board' | 'summary' } }
    | { type: 'batch_add_todos'; payload: { todos: Todo[] } }
    | { type: 'batch_edit_todos'; payload: { todos: { id: string; todo: Partial<Todo> }[] } }
    | { type: 'batch_delete_todos'; payload: { ids: string[] } }
    | { type: 'set_group_by'; payload: { groupBy: 'state' | 'assigned' } };

export interface TodoState {
    todos: Todo[];
    tab: 'board' | 'summary';
    groupBy: 'state' | 'assigned';
}

export const mockInitialTodoState: TodoState = {
    todos: [
        // Backlog
        {
            id: uuidv4(),
            text: 'Research new frameworks',
            state: TodoStatus.BACKLOG,
            assigned: 'Alice',
        },
        {
            id: uuidv4(),
            text: 'Create project roadmap',
            state: TodoStatus.BACKLOG,
            assigned: 'Bob',
        },
        {
            id: uuidv4(),
            text: 'Identify key stakeholders',
            state: TodoStatus.BACKLOG,
            assigned: 'Charlie',
        },

        // To Do
        {
            id: uuidv4(),
            text: 'Set up project repository',
            state: TodoStatus.TO_DO,
            assigned: 'Alice',
        },
        {
            id: uuidv4(),
            text: 'Prepare design mockups',
            state: TodoStatus.TO_DO,
            assigned: 'Dana',
        },
        {
            id: uuidv4(),
            text: 'Write project documentation',
            state: TodoStatus.TO_DO,
            assigned: 'Eve',
        },

        // In Progress
        {
            id: uuidv4(),
            text: 'Implement authentication',
            state: TodoStatus.IN_PROGRESS,
            assigned: 'Charlie',
        },
        {
            id: uuidv4(),
            text: 'Set up CI/CD pipeline',
            state: TodoStatus.IN_PROGRESS,
            assigned: 'Bob',
        },
        {
            id: uuidv4(),
            text: 'Develop user registration feature',
            state: TodoStatus.IN_PROGRESS,
            assigned: 'Dana',
        },

        // In Review
        {
            id: uuidv4(),
            text: 'Write unit tests',
            state: TodoStatus.IN_REVIEW,
            assigned: 'Dana',
        },
        {
            id: uuidv4(),
            text: 'Code review for authentication',
            state: TodoStatus.IN_REVIEW,
            assigned: 'Eve',
        },
        {
            id: uuidv4(),
            text: 'Review design mockups',
            state: TodoStatus.IN_REVIEW,
            assigned: 'Alice',
        },

        // Blocked
        {
            id: uuidv4(),
            text: 'Deploy to staging environment',
            state: TodoStatus.BLOCKED,
            assigned: 'Eve',
        },
        {
            id: uuidv4(),
            text: 'Resolve API integration issues',
            state: TodoStatus.BLOCKED,
            assigned: 'Charlie',
        },
        {
            id: uuidv4(),
            text: 'Fix bugs from testing',
            state: TodoStatus.BLOCKED,
            assigned: 'Bob',
        },

        // Done
        {
            id: uuidv4(),
            text: 'Design user interface',
            state: TodoStatus.DONE,
            assigned: 'Bob',
        },
        {
            id: uuidv4(),
            text: 'Set up development environment',
            state: TodoStatus.DONE,
            assigned: 'Alice',
        },
        {
            id: uuidv4(),
            text: 'Complete initial project setup',
            state: TodoStatus.DONE,
            assigned: 'Dana',
        },
    ],
    tab: 'board',
    groupBy: 'state',
};

export function todoReducer(state: TodoState, action: Action) {
    const { type, payload } = action;
    switch (type) {
        case 'change_tab':
            return {
                ...state,
                tab: payload.tab,
            };
        case 'batch_add_todos':
            return {
                ...state,
                todos: [...state.todos, ...payload.todos],
            };
        case 'batch_edit_todos':
            const updatesMap = new Map(payload.todos.map(p => [p.id, p.todo]));
            return {
                ...state,
                todos: state.todos.map(todo =>
                    updatesMap.has(todo.id) ? { ...todo, ...updatesMap.get(todo.id) } : todo,
                ),
            };
        case 'batch_delete_todos':
            return {
                ...state,
                todos: state.todos.filter(todo => !payload.ids.includes(todo.id)),
            };
        case 'set_group_by':
            return {
                ...state,
                groupBy: payload.groupBy,
            };
        default:
            return state;
    }
}
