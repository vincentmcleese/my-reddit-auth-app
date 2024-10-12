"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import GetEmail from "./GetEmail";
import Dashboard from "./Dashboard";
import ScratchExperience from "./ScratchExperience";
import { checkEmail } from "@/actions";

type ScratchResult = {
  won: boolean;
  // Add any other properties that might be part of the scratch result
};

export default function UserRouter() {
  const { data: session, status } = useSession();
  const [userState, setUserState] = useState<{
    email: string | boolean | null;
    showScratch: boolean;
    scratchResult: ScratchResult | null;
  }>({
    email: null,
    showScratch: false,
    scratchResult: null,
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user.id) {
      checkEmail(session.user.id).then((email) =>
        setUserState((prev) => ({ ...prev, email }))
      );
    }
  }, [status, session?.user.id]);

  const handleEmailUpdated = (email: string) =>
    setUserState((prev) => ({ ...prev, email }));
  const handleScratch = () =>
    setUserState((prev) => ({ ...prev, showScratch: true }));
  const handleScratchComplete = (didWin: boolean) =>
    setUserState((prev) => ({
      ...prev,
      scratchResult: { won: didWin },
      showScratch: false,
    }));

  if (
    status === "loading" ||
    (status === "authenticated" && userState.email === null)
  ) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") return <Login />;
  if (status === "authenticated" && userState.email === false)
    return <GetEmail onEmailUpdated={handleEmailUpdated} />;
  if (userState.showScratch)
    return <ScratchExperience onComplete={handleScratchComplete} />;
  if (userState.scratchResult !== null)
    return <HomePage scratchResult={userState.scratchResult} />;
  return <Dashboard onScratch={handleScratch} />;
}
