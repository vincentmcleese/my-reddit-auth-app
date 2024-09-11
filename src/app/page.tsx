"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import HomePage from "@/components/HomePage";
import Login from "@/components/Login";
export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    return <HomePage />;
  }
  return <Login />;
}
