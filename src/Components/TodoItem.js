import { TodoContext } from "@/Providers/TodoProvider";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoItem({ title, isCompleted, id }) {
  const [updatedTodo, setUpdatedTodo] = useState({
    title: title,
    isCompleted: isCompleted,
    id: id,
  });
  const [showInput, setShowInput] = useState(false);

  const { todos, handleUpdateTodo, handleDelete, setTodos } =
    useContext(TodoContext);

  const notify = (message) =>
    toast(message, {
      autoClose: 3500,
      hideProgressBar: true,
    });

  const handleModifTodo = (event) => {
    const { name, value, checked } = event.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: name === "isCompleted" ? checked : value,
    });
    if (name === "isCompleted") submitTodo(event);
  };

  async function submitTodo(event) {
    event.preventDefault();
    console.log(updatedTodo.title);
    if (
      todos.find(
        (item) => item.title === updatedTodo.title && item.id !== updatedTodo.id
      )
    )
      return notify("this todo already exist");
    console.log({ updatedTodo });
    if (await handleUpdateTodo(updatedTodo, notify)) setShowInput(false);
  }

  async function onClickDetele() {
    if (
      // if handledelet return false and todo delete is in the list
      !(await handleDelete(updatedTodo, notify)) &&
      !todos.find((item) => item.id === updatedTodo.id)
    )
      notify("can't delete the todo");
  }

  return (
    <Wrapper>
      <label htmlFor="title"></label>
      {showInput ? (
        <>
          <form>
            <input
              type="text"
              id="title"
              name="title"
              value={updatedTodo.title}
              onChange={(event) => handleModifTodo(event)}
            ></input>
            <button type="submit" onClick={(event) => submitTodo(event)}>
              Ok
            </button>
          </form>
          <button onClick={() => setShowInput(!showInput)}>Cancel</button>
        </>
      ) : (
        <div
          type="text"
          id="title"
          name="title"
          onClick={() => setShowInput(!showInput)}
        >
          {title}
        </div>
      )}
      <label htmlFor="isCompleted">Completed</label>
      <input
        type="checkbox"
        id="isCompleted"
        name="isCompleted"
        checked={updatedTodo.isCompleted}
        onChange={(event) => handleModifTodo(event)}
      ></input>
      <button onClick={onClickDetele}>Delete</button>
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;
