import TodoItem from "@/Components/TodoItem";
import AddTodo from "@/Components/AddTodo";
import React from "react";
import Disconnect from "@/Components/Disconnect";

export default function TodoList() {
  return (
    <div>
      <TodoItem />
      <AddTodo />
      <Disconnect />
    </div>
  );
}
