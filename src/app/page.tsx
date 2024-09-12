"use client";

import { useSession } from "next-auth/react";

import HomePage from "@/components/HomePage";
import Login from "@/components/Login";
export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <HomePage />;
  }
  return <Login />;
}
