"use client";
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/Providers/UserProvider";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const { user, handleLogIn } = useContext(UserContext);

  const router = useRouter();
  const notify = (message) =>
    toast(message, {
      autoClose: 3500,
      hideProgressBar: true,
    });

  useEffect(() => {
    if (user) {
      router.push("/TodoList");
      setCredential({
        email: "",
        password: "",
      });
    }
  }, [user]);

  function handleOnchange(event) {
    const { name, value } = event.target;
    setCredential((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (credential.email === "") {
      return notify("You need an email to sign in");
    }
    if (credential.password === "") {
      return notify("You need a password to sign in");
    }
    await handleLogIn(credential, notify);
  }

  return (
    <div>
      <form>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={credential.email}
          onChange={(event) => handleOnchange(event)}
        ></input>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={credential.password}
          onChange={(event) => handleOnchange(event)}
        ></input>
        <button type="submit" onClick={(event) => handleSubmit(event)}>
          Log in
        </button>
      </form>
      <ToastContainer />
      <Link href="/Register"> No account ? Register here</Link>
    </div>
  );
}
