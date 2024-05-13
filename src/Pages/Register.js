"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/Providers/UserProvider";
import { useRouter } from "next/navigation";

export default function Register() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const { user, handleRegister } = useContext(UserContext);
  const router = useRouter();

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
    if (credential.email === "" || credential.password === "") {
      return console.log(`${credential}:empty email or password`);
    }
    // invalid email
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regexEmail.test(credential.email)) {
      return console.log("email invalide");
    }
    // invalid password
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regexPassword.test(credential.password)) {
      return console.log(
        `invalid password, the password need:
         One uppercase 
         One undercase 
         At least 8 chart 
         One special chart
         `
      );
    }
    // already exist email
    // todo
    console.log({ credential });
    await handleRegister(credential);
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
      <Link href={"/Login"}>login</Link>
    </div>
  );
}
