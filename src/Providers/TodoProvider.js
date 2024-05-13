import React, { createContext, useContext, useEffect, useState } from "react";
import {
  db,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
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
            id: doc.id,
            ...doc.data(),
          });
        });

        setTodos(allTodos);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  async function handleTodo({ title, isCompleted }) {
    const todosRef = collection(db, "users", user.uid, "todos");
    const todoRef = await addDoc(todosRef, {
      title: title,
      isCompleted: isCompleted,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <TodoContext.Provider value={{ todos, handleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
