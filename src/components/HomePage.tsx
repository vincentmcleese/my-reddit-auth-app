"use client";

import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";
import { ReferralWidget } from "@/components/ReferralWidget";
import { BoostBreakdown } from "@/components/shared/BoostBreakdwon";

// Define a type for the scratch result
type ScratchResult = {
  won: boolean;
  // Add any other properties that might be part of the scratch result
};

interface HomePageProps {
  scratchResult: ScratchResult | null;
  streak: number;
  referralCount: number;
}

export default function HomePage({
  scratchResult,
  streak,
  referralCount,
}: HomePageProps) {
  const { data: session } = useSession();

  return (
    <PageCard title={<Logo />} footer={`r/${session?.user?.name}`}>
      <ReferralWidget />
      <div className="space-y-6">
        <div className="text-2xl font-semibold text-center">
          {scratchResult?.won
            ? "Congratulations! You won!"
            : "Better luck next time!"}
        </div>

        <BoostBreakdown referralCount={referralCount} streak={streak} />
        <div className="text-center text-gray-600">
          Keep your Karma high and your streak going to increase your odds!
        </div>
        <div className="text-center font-semibold">
          Come back tomorrow for another chance to win!
        </div>
      </div>
    </PageCard>
  );
}
