import { useSession } from "next-auth/react";
import PageCard from "@/components/shared/PageCard";
import Logo from "@/components/shared/logo";
import BoostList from "@/components/BoostBadge";
import WinOddsBar from "@/components/WinOddsBar";
import { Button } from "@/components/ui/button";

export default function Dashboard({ onScratch }: { onScratch: () => void }) {
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
          You can scratch your card now!
        </div>
        <div>
          <div className="text-2xl font-bold text-reddit-orange">
            🔥 {totalBoosts}x Boosts 🔥
          </div>
          <WinOddsBar filledSections={totalBoosts} />
          <div className="flex items-center justify-center mt-2 text-sm">
            <span>
              You have a boosted win chance! Keep your Karma high and your
              streak going to increase your odds!
            </span>
          </div>
        </div>
        <BoostList boosts={boostArray} />
        <Button
          className="w-full bg-[#FF4500] hover:bg-[#FF5722] text-white font-semibold py-2 px-4 rounded-full"
          onClick={onScratch}
        >
          Scratch Now!
        </Button>
      </div>
    </PageCard>
  );
}
