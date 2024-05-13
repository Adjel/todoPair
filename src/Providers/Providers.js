"use client";
import UserProvider from "./UserProvider";
import TodoProvider from "./TodoProvider";

export function Providers({ children }) {
  return (
    <UserProvider>
      <TodoProvider>{children}</TodoProvider>
    </UserProvider>
  );
}
