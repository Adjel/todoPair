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

  return (
    <TodoContext.Provider value={{ todos, handleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
