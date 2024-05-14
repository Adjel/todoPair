import React, { createContext, useContext, useEffect, useState } from "react";
import {
  db,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "@/Firebase";
import { UserContext } from "./UserProvider";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const todosRef = collection(db, "users", user.uid, "todos");

      const unsubscribe = onSnapshot(todosRef, (querySnapshot) => {
        const allTodos = [];

        querySnapshot.forEach((doc) => {
          allTodos.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setTodos(allTodos);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleTodo = async ({ title, isCompleted }) => {
    const todosRef = collection(db, "users", user.uid, "todos");
    const todoRef = await addDoc(todosRef, {
      completed: isCompleted,
      createdAt: serverTimestamp(),
      title: title,
    });
    return todoRef;
  };

  async function handleUpdateTodo({ title, isCompleted, id }, notify) {
    try {
      const todosRef = doc(db, "users", user.uid, "todos", id);
      await updateDoc(todosRef, {
        title: title,
        completed: isCompleted,
        createdAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      notify(error);
    }
  }

  async function handleDelete(todo, notify) {
    try {
      const todoRef = doc(db, "users", user.uid, "todos", todo.id);
      await deleteDoc(todoRef).then(() => {
        return true;
      });
    } catch (e) {
      notify(e);
      return false;
    }
  }

  return (
    <TodoContext.Provider
      value={{ todos, handleTodo, handleUpdateTodo, handleDelete, setTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}
