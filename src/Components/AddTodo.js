import React, { useEffect, useState } from "react";

export default function AddTodo() {
  const [newTodo, setNewTodo] = useState({
    title: "",
    isCompleted: false,
  });

  return (
    <div>
      <form>
        <label htmlFor="title">title:</label>
        <input type="text" id="title" name="title" value={newTodo.name}></input>
      </form>
    </div>
  );
}
