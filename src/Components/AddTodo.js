import { TodoContext } from "@/Providers/TodoProvider";
import React, { useContext, useEffect, useState } from "react";

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState({
    title: "",
    isCompleted: false,
  });

  const { handleTodo } = useContext(TodoContext);

  useEffect(() => {
    console.log(newTodo.isCompleted);
  }, []);

  const handleNewTodo = (event) => {
    const { name, value, checked } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: name === "isCompleted" ? checked : value,
    });
  };

  async function createTodo(event) {
    event.preventDefault();
    await handleTodo(newTodo);
  }

  return (
    <div>
      <form>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newTodo.name}
          onChange={(event) => handleNewTodo(event)}
        ></input>
        <label htmlFor="isCompleted">Completed</label>
        <input
          type="checkbox"
          id="isCompleted"
          name="isCompleted"
          checked={newTodo.isCompleted}
          onChange={(event) => handleNewTodo(event)}
        ></input>
        <button type="submit" onClick={(event) => createTodo(event)}>
          Create
        </button>
      </form>
    </div>
  );
}
