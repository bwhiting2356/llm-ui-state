'use client';

import Todos from './components/Todos';
import Chat from './components/Chat';
import { TodoProvider } from './state/context';
import Hotjar from '@hotjar/browser';
import { useEffect } from 'react';

const siteId = process.env.NEXT_PUBLIC_HOTJAR_SITE_ID;
const hotjarVersion = 6;

export default function Home() {
    useEffect(() => {
        Hotjar.init(siteId as any, hotjarVersion);
    }, []);
    return (
        <main className="flex h-screen flex items-center justify-between">
            <TodoProvider>
                <Chat />
                <Todos />
            </TodoProvider>
        </main>
    );
}
