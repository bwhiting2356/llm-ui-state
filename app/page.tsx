"use client";

import Todos from "./components/Todos";
import Chat from "./components/Chat";
import { TodoProvider } from "./state/context";

export default function Home() {
  return (
    <main className="flex min-h-screen flex items-center justify-between">
      <TodoProvider>
      <Chat />
      <Todos />
      </TodoProvider>
    </main>
  );
}
