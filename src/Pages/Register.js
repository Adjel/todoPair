"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/Providers/UserProvider";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const { user, handleRegister } = useContext(UserContext);

  const router = useRouter();

  const notify = (message) =>
    toast(message, {
      autoClose: 3500,
      hideProgressBar: true,
    });

  useEffect(() => {
    if (user) router.push("/TodoList");
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
      return notify("You need an email to register");
    }
    // invalid email
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regexEmail.test(credential.email)) {
      return notify("this email is not valid");
    }
    if (credential.password === "") {
      return notify("You need a password to register");
    }
    // invalid password
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regexPassword.test(credential.password)) {
      return notify(
        `invalid password, the password need:
         One uppercase 
         One undercase 
         At least 8 chart 
         One special chart
         `
      );
    }
    await handleRegister(credential, notify);
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
          sign up
        </button>
      </form>
      <ToastContainer />
      <Link href={"/Login"}>login</Link>
    </div>
  );
}
