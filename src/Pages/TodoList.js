import TodoItem from "@/Components/TodoItem";
import AddTodo from "@/Components/AddTodo";
import React, { useContext, useEffect } from "react";
import Disconnect from "@/Components/Disconnect";
import { TodoContext } from "@/Providers/TodoProvider";
import { UserContext } from "@/Providers/UserProvider";
import { useRouter } from "next/navigation";

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/Login");
  }, [user]);

  return (
    <div>
      {todos.map(({ title, completed, id }) => (
        <TodoItem key={id} title={title} isCompleted={completed} id={id} />
      ))}
      <AddTodo />
      <Disconnect />
    </div>
  );
}
