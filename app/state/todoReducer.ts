import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id: string;
    text: string;
    state: 'done' | 'pending';
    assigned: string;
    location: {
        lat: number;
        lng: number;
    };
}

type Action =
    | { type: 'add_todo'; payload: Todo }
    | { type: 'edit_todo'; payload: { id: string; todo: Partial<Todo> } }
    | { type: 'delete_todo'; payload: { id: string } }
    | { type: 'change_tab'; payload: { tab: 'board' | 'summary' | 'map' } };

export interface TodoState {
    todos: Todo[];
    tab: 'board' | 'summary' | 'map';
}

export const initialTodoState: TodoState = {
    todos: [
        {
            id: uuidv4(),
            text: 'Set up project repository',
            state: 'pending',
            assigned: 'Alice',
            location: {
                lat: 37.7749,
                lng: -122.4194,
            },
        },
        {
            id: uuidv4(),
            text: 'Design user interface',
            state: 'done',
            assigned: 'Bob',
            location: {
                lat: 34.0522,
                lng: -118.2437,
            },
        },
        {
            id: uuidv4(),
            text: 'Implement authentication',
            state: 'pending',
            assigned: 'Charlie',
            location: {
                lat: 40.7128,
                lng: -74.006,
            },
        },
        {
            id: uuidv4(),
            text: 'Write unit tests',
            state: 'done',
            assigned: 'Dana',
            location: {
                lat: 41.8781,
                lng: -87.6298,
            },
        },
        {
            id: uuidv4(),
            text: 'Deploy to staging environment',
            state: 'pending',
            assigned: 'Eve',
            location: {
                lat: 47.6062,
                lng: -122.3321,
            },
        },
    ],
    tab: 'board',
};

export function todoReducer(state: TodoState, action: Action) {
    const { type, payload } = action;
    switch (type) {
        case 'add_todo':
            return {
                ...state,
                todos: [...state.todos, payload],
            };
        case 'edit_todo':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === payload.id ? { ...todo, ...payload.todo } : todo,
                ),
            };
        case 'delete_todo':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== payload.id),
            };
        case 'change_tab':
            return {
                ...state,
                tab: payload.tab,
            };
        default:
            return state;
    }
}
