"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PageCard from "@/components/shared/PageCard";
import ScratchCard from "@/components/ScratchCard";
import BoostList from "@/components/BoostBadge";
import Logo from "@/components/shared/logo";
import Confetti from "react-confetti";
import WinOddsBar from "@/components/WinOddsBar";
import ScratchComplete from "@/components/ScratchComplete";

export default function HomePage() {
  const { data: session } = useSession();

  const baseWinOdds = 0.5; // 10% default win odds
  const [boosts, setBoosts] = useState(0); // Track boosts
  const calculateWinOdds = () => baseWinOdds + boosts * 0.05; // Each boost adds 5%

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

  // Calculate total boosts from boostArray
  useEffect(() => {
    const totalBoosts = boostArray.reduce(
      (total, boost) => total + boost.boost,
      0
    );
    setBoosts(totalBoosts);
  }, [boostArray]);

  // Scratch card logic: check if the player wins based on the calculated odds
  const scratchCard = () => {
    const winOdds = calculateWinOdds();
    const didWin = Math.random() < winOdds; // Randomly determine win
    return didWin;
  };

  const [isScratched, setIsScratched] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    const winStatus = scratchCard();
    setDidWin(winStatus);
    setWinMessage(winStatus ? "YOU WIN" : "TRY AGAIN TOMORROW");
  }, [boosts]); // Recalculate win message if boosts change

  const handleScratchComplete = () => {
    setIsScratched(true);
    console.log("Over 30% of the card has been scratched!");
  };

  return (
    <PageCard title={<Logo />} footer={`r/${session?.user?.name}`}>
      {isScratched && didWin && (
        <Confetti recycle={false} numberOfPieces={500} tweenDuration={2000} />
      )}

      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="w-full">
          <ScratchCard
            message={winMessage}
            onScratchComplete={handleScratchComplete}
          />
          {isScratched && (
            <div>
              <ScratchComplete outcome={didWin} />
            </div>
          )}
        </div>
        <div>
          {/* Show win odds */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-reddit-orange">
              🔥 {boosts}x Boosts 🔥
            </div>
            <WinOddsBar filledSections={boosts} />
            <div className="flex items-center justify-center mt-2 text-sm">
              <span>
                You have a boosted win chance! Keep your Karma high and your
                streak going to increase your odds!
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <BoostList boosts={boostArray} />
        </div>
      </div>
    </PageCard>
  );
}
