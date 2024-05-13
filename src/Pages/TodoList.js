import TodoItem from "@/Components/TodoItem";
import AddTodo from "@/Components/AddTodo";
import React, { useContext, useEffect } from "react";
import Disconnect from "@/Components/Disconnect";
import { TodoContext } from "@/Providers/TodoProvider";

export default function TodoList() {
  const { todos } = useContext(TodoContext);

  return (
    <div>
      {todos.map((item) => (
        <TodoItem title={item.title} isCompleted={item.isCompleted} />
      ))}
      <AddTodo />
      <Disconnect />
    </div>
  );
}
