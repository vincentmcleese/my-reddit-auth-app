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
      title: "Base",
      description: "Everyone starts here",
      boost: 1,
    },
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
    0
  );

  return (
    <div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Boost Multiplier</p>
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
