import React, { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  function handleOnchange(event) {
    const { name, value } = event.target;
    setCredential((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
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
        "invalid password, the password need: One uppercase, one undercase, at least 8 chart and one special chart"
      );
    }
    // already exist email
    // todo
    console.log({ credential });
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
