"use client";

import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";
import BoostList from "@/components/BoostBadge";
import WinOddsBar from "@/components/WinOddsBar";

// Define a type for the scratch result
type ScratchResult = {
  won: boolean;
  // Add any other properties that might be part of the scratch result
};

export default function HomePage({
  scratchResult,
}: {
  scratchResult: ScratchResult | null;
}) {
  const { data: session } = useSession();

  const boostArray = [
    {
      title: `High Karma`,
      description: ` ${session?.user?.total_karma} Karma`,
      boost: 2,
    },
    {
      title: `Streak`,
      description: `1 day streak`,
      boost: 1,
    },
  ];

  const totalBoosts = boostArray.reduce(
    (total, boost) => total + boost.boost,
    0
  );

  return (
    <PageCard title={<Logo />} footer={`r/${session?.user?.name}`}>
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="text-2xl font-bold text-center">
          {scratchResult?.won
            ? "Congratulations! You won!"
            : "Better luck next time!"}
        </div>
        <div>
          <div className="text-2xl font-bold text-reddit-orange">
            🔥 {totalBoosts}x Boosts 🔥
          </div>
          <WinOddsBar filledSections={totalBoosts} />
          <div className="flex items-center justify-center mt-2 text-sm">
            <span>
              Keep your Karma high and your streak going to increase your odds!
            </span>
          </div>
        </div>
        <BoostList boosts={boostArray} />
        <div className="text-center">
          Come back tomorrow for another chance to win!
        </div>
      </div>
    </PageCard>
  );
}
