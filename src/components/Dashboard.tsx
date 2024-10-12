import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";

import { ReferralWidget } from "@/components/ReferralWidget";
import { Button } from "@/components/ui/button";
import { ScratchResult } from "@/hooks/useScratchCard";
import { format } from "date-fns";
import { BoostBreakdown } from "@/components/shared/BoostBreakdwon";

interface DashboardProps {
  onScratch: () => void;
  isAvailable: boolean;
  nextAvailableTime: Date;
  todayScratchResults: ScratchResult[];
  streak: number;
  referralCount: number;
  karma: number;
}

export default function Dashboard({
  onScratch,
  isAvailable,
  nextAvailableTime,
  streak,
  referralCount,
  karma,
}: DashboardProps) {
  const { data: session } = useSession();

  return (
    <PageCard title={<Logo />} footer={`r/${session?.user?.name}`}>
      <ReferralWidget />
      <div className="space-y-6">
        <div className="text-2xl font-semibold text-center">
          {isAvailable ? "Ready to Scratch" : "Next Scratch"}
        </div>
        <div className="text-center text-gray-600">
          {isAvailable
            ? "Your card is ready to be scratched!"
            : `Available at ${format(nextAvailableTime, "h:mm a")}`}
        </div>

        <BoostBreakdown
          referralCount={referralCount}
          streak={streak}
          karma={karma}
        />

        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={onScratch}
          disabled={!isAvailable}
        >
          {isAvailable ? "Scratch Now" : "Scratch Unavailable"}
        </Button>
      </div>
    </PageCard>
  );
}
