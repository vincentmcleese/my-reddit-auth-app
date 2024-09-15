"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import PageCard from "@/components/shared/PageCard";
import ScratchCard from "@/components/ScratchCard";
import BoostList from "@/components/BoostBadge";
import Logo from "@/components/shared/logo";
import Confetti from "react-confetti";

export default function HomePage() {
  const { data: session } = useSession();

  const boosts = [
    {
      emoji: "🌟",
      description: ` ${session?.user?.total_karma} Karma`,
      points: 50,
    },
    { emoji: "🔥", description: "subreddit", points: 50 },
    { emoji: "⚡", description: "streak", points: 10 },
  ];

  const message = "YOU WON"; // Define the message to pass

  const [isScratched, setIsScratched] = useState(false);
  const handleScratchComplete = () => {
    setIsScratched(true);
    console.log("Over 30% of the card has been scratched!");
  };

  return (
    <PageCard title={<Logo />} footer="footer">
      {isScratched && (
        <Confetti recycle={false} numberOfPieces={500} tweenDuration={2000} />
      )}

      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="w-full">
          <ScratchCard
            message={message}
            onScratchComplete={handleScratchComplete}
          />
          {isScratched && <div>Congratulations! </div>}
        </div>
        <div className="w-full">
          <BoostList
            boosts={boosts.map((boost) => ({
              ...boost,
              points:
                typeof boost.points === "string"
                  ? parseInt(boost.points, 10)
                  : boost.points,
            }))}
          />
        </div>
      </div>
    </PageCard>
  );
}
