import {
    useState,
    createContext,
    useReducer,
    SetStateAction,
    Dispatch,
    useEffect,
    useMemo,
} from 'react';
import { initialTodoState, todoReducer, TodoState } from './todoReducer';
import { Message, useAssistant } from 'ai/react';

interface TodoAppStateType {
    messages: Message[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitMessage: () => void;
    panelOpen: boolean;
    setPanelOpen: Dispatch<SetStateAction<boolean>>;
    todoState: TodoState;
    error?: any;
    input?: string;
    status?: string;
    stop?: () => void;
}

const initialContextState: TodoAppStateType = {
    handleInputChange: () => {},
    submitMessage: () => {},
    messages: [],
    panelOpen: false,
    setPanelOpen: () => {},
    todoState: initialTodoState,
    error: undefined,
    input: '',
    status: '',
    stop: () => {},
};

export const TodoContext = createContext<TodoAppStateType>(initialContextState);

interface TodoProviderProps {
    children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todoState, dispatch] = useReducer(todoReducer, initialTodoState);
    const { messages, ...assistantHelpers } = useAssistant({
        api: '/api/assistant',
        body: { state: todoState },
    });
    console.log('messages', messages);
    const [panelOpen, setPanelOpen] = useState(true);
    const [seenMessages, setSeenMessages] = useState(new Set());

    const lastDataMessage = useMemo(
        () => messages.filter(m => m.role === 'data').slice(-1)[0],
        [messages],
    );
    useEffect(() => {
        if (
            lastDataMessage &&
            lastDataMessage.role === 'data' &&
            !seenMessages.has(lastDataMessage.id)
        ) {
            const { function: func } = lastDataMessage.data as any;
            const action = { type: func.name, payload: JSON.parse(func.arguments) };
            dispatch(action);
            setSeenMessages(prev => new Set(prev).add(lastDataMessage.id));
        }
    }, [lastDataMessage, seenMessages]);

    const mergedState: TodoAppStateType = {
        messages,
        ...assistantHelpers,
        panelOpen,
        setPanelOpen,
        todoState,
    };

    return <TodoContext.Provider value={mergedState}>{children}</TodoContext.Provider>;
};
