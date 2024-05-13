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
      </form>
      <Link href={"/Login"}>login</Link>
    </div>
  );
}
