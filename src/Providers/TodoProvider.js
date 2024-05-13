import React, { createContext, useContext, useEffect, useState } from "react";
import { db, onSnapshot, collection } from "@/Firebase";
import { UserContext } from "./UserProvider";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setTodos([
      {
        title: "tozz",
        isCompleted: false,
      },
      {
        title: "zozoz",
        isCompleted: true,
      },
    ]);
    if (user) {
      const todosRef = collection(db, "users", user?.uid, "todos");

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

  return (
    <TodoContext.Provider value={{ todos }}>{children}</TodoContext.Provider>
  );
}
