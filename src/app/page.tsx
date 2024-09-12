"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import HomePage from "@/components/HomePage";
import Login from "@/components/Login";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Client-side - Session status:", status);
    console.log("Client-side - Session data:", session);
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <HomePage />;
  }

  return <Login />;
}
