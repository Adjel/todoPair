import React, { createContext, useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@/Firebase";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [disconnected, setDisconnected] = useState(false);

  function setUserStatus(newUser) {
    setUser(newUser ? newUser : undefined);
    setDisconnected(!newUser ? true : false);
  }

  const handleRegister = async ({ email, password }, notify) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUserStatus(userCredential.user);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        switch (error.code) {
          case "auth/email-already-in-use":
            notify("This email is already used");
            break;
          case "auth/missing-password":
            notify("You need a password to sign up");
            break;
          case "auth/weak-password":
            notify(`invalid password, the password need:
            One uppercase 
            One undercase 
            At least 8 chart 
            One special chart
            `);
            break;
          case "auth/invalid-email":
            notify("This email is not valid");
            break;
          default:
            notify(error.message);
        }
        // ..
      });
  };

  const handleLogIn = async ({ email, password }, notify) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUserStatus(userCredential.user);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.code === "auth/missing-password" ||
          error.code === "auth/invalid-password" ||
          error.code === "auth/missing-email" ||
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-email"
        ) {
          notify("Invalid email or password");
        } else {
          notify(error.message);
        }
      });
  };

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserStatus();
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  }

  return (
    <UserContext.Provider
      value={{ user, handleRegister, handleLogIn, handleSignOut, disconnected }}
    >
      {children}
    </UserContext.Provider>
  );
}
