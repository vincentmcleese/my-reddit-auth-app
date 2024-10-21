import React from "react";
import BoostList from "@/components/BoostBadge";

export interface Boost {
  title: string;
  description: string;
  boost: number;
}

interface BoostBreakdownProps {
  referralCount: number;
  streak: number;
  karma: number;
}

export function BoostBreakdown({
  referralCount,
  streak,
  karma,
}: BoostBreakdownProps) {
  const karmaBoost = Math.floor(karma / 500);
  const boostArray: Boost[] = [
    {
      title: "Karma",
      description: `${karma} karma, (1 boost per 500 karma).`,
      boost: karmaBoost,
    },
    {
      title: "Streak",
      description: `${streak} day streak`,
      boost: streak,
    },
    {
      title: "Referrals",
      description: `${referralCount} friends referred`,
      boost: referralCount,
    },
  ];

  const totalBoost = boostArray.reduce(
    (total, boost) => total + boost.boost,
    1 // Start with a base of 1
  );

  const winChanceIncrease = ((totalBoost - 1) / 1) * 100; // Assuming base chance is 1x

  return (
    <div>
      <div>
        <h2 className="text-2xl text-black font-bold mb-4 text-center">
          🔥 {totalBoost}x Boost 🔥
        </h2>
        <p className="text-sm text-gray-600 text-center mb-2">
          Increasing win chance by {winChanceIncrease.toFixed(0)}%
        </p>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${(totalBoost / 10) * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm font-medium mt-1">{totalBoost}x</p>
      </div>
      <BoostList boosts={boostArray} />
    </div>
  );
}
