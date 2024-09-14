"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import GetEmail from "./GetEmail";
import { checkEmail } from "@/actions";

export default function UserRouter() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string | false | null>(null);

  console.log("UserRouter rendered. Status:", status, "Session:", session);

  useEffect(() => {
    if (status === "authenticated" && session?.user.id) {
      checkEmail(session.user.id).then(setEmail);
    }
  }, [status, session?.user.id]); // Add session?.user.id to the dependency array

  if (status === "loading" || (status === "authenticated" && email === null)) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <Login />;
  }

  if (status === "authenticated" && email === false) {
    return <GetEmail />;
  }

  return <HomePage />;
}
