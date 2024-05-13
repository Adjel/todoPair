import TodoItem from "@/Components/TodoItem";
import AddTodo from "@/Components/AddTodo";
import React from "react";

export default function TodoList() {
  return (
    <div>
      <TodoItem />
      <AddTodo />
    </div>
  );
}
