'use client';

import Todos from './components/Todos';
import Chat from './components/Chat';
import { TodoProvider } from './state/context';
import Hotjar from '@hotjar/browser';
import { useEffect } from 'react';

const siteId = 5023792;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

export default function Home() {
    useEffect(() => {
        Hotjar.init(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID as any, hotjarVersion);
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
