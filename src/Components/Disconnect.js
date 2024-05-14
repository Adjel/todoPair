import { UserContext } from "@/Providers/UserProvider";
import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Disconnect() {
  const { disconnected, handleSignOut } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (disconnected) router.push("/Login");
  }, [disconnected]);

  return (
    <>
      <button onClick={handleSignOut}>Disconnect</button>
      <ToastContainer />
    </>
  );
}
