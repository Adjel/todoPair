import React from "react";
import AddTodo from "./AddTodo";

export default function TodoItem({ title, isCompleted }) {
  return (
    <>
      <div>{title}</div>
      <div>{isCompleted}</div>
    </>
  );
}
