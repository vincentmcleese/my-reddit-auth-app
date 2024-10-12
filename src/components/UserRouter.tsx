"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Login from "./Login";
import GetEmail from "./GetEmail";
import Dashboard from "./Dashboard";
import ScratchExperience from "./ScratchExperience";
import { checkEmail } from "@/actions";
import { useScratchCard, ScratchResult } from "@/hooks/useScratchCard";
import { useReferralCount } from "@/hooks/useReferralCount";

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

  const {
    isAvailable,
    todayScratchResults,
    nextAvailableTime,
    streak,
    handleScratch: hookHandleScratch,
    refetchScratchState,
  } = useScratchCard();
  const referralCount = useReferralCount();

  useEffect(() => {
    if (status === "authenticated" && session?.user.id) {
      checkEmail(session.user.id).then((email) =>
        setUserState((prev) => ({ ...prev, email }))
      );
    }
  }, [status, session?.user.id]);

  const handleEmailUpdated = (email: string) =>
    setUserState((prev) => ({ ...prev, email }));

  const handleScratch = () => {
    if (isAvailable) {
      setUserState((prev) => ({ ...prev, showScratch: true }));
    }
  };

  const handleScratchComplete = async (didWin: boolean) => {
    await hookHandleScratch(didWin);
    setUserState((prev) => ({
      ...prev,
      scratchResult: { won: didWin, scratchTime: new Date().toISOString() },
      showScratch: false,
    }));
    await refetchScratchState();
  };

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
  // Get the karma value from the session
  const karma = session?.user.total_karma || 0;

  return (
    <Dashboard
      onScratch={handleScratch}
      isAvailable={isAvailable}
      nextAvailableTime={nextAvailableTime}
      todayScratchResults={todayScratchResults}
      streak={streak}
      referralCount={referralCount}
      karma={karma}
    />
  );
}
