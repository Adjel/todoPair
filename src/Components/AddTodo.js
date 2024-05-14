"use client";
import { TodoContext } from "@/Providers/TodoProvider";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState({
    title: "",
    isCompleted: false,
  });

  const { handleTodo, todos } = useContext(TodoContext);

  const notify = (message) =>
    toast(message, {
      autoClose: 3500,
      hideProgressBar: true,
    });

  const handleNewTodo = (event) => {
    const { name, value, checked } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: name === "isCompleted" ? checked : value,
    });
  };

  async function createTodo(event) {
    event.preventDefault();
    if (newTodo.title === "")
      return notify("This todo already exist, you have to set another title");
    if (todos.find((item) => item.title === newTodo.title))
      return notify("This todo already exist, you have to set another title");
    if (await handleTodo(newTodo)) {
      setNewTodo({
        title: "",
        isCompleted: false,
      });
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newTodo.title}
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
      <ToastContainer />
    </div>
  );
}
