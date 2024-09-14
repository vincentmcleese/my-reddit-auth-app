import React from "react";
import { Card } from "@/components/ui/card";

interface Boost {
  emoji: string;
  description: string;
  points: number;
}

interface BoostListProps {
  boosts: Boost[];
}

const BoostList: React.FC<BoostListProps> = ({ boosts }) => {
  // Sum the total points to calculate the multiplier
  const totalPoints = boosts.reduce((total, boost) => total + boost.points, 0);
  const multiplier = (1 + totalPoints / 100).toFixed(2); // Assume multiplier logic

  return (
    <div className="w-full font-sans">
      <Card className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
        <div className="text-2xl font-bold mb-4 text-orange-500">
          🔥 Your Boosts 🔥
        </div>
        <ul className="list-none p-0 m-0">
          {boosts.map((boost, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-sm"
            >
              <span className="text-2xl">{boost.emoji}</span>
              <span className="font-bold capitalize mr-4">
                {boost.description}
              </span>
              <span className="font-bold text-orange-500">
                +{boost.points} points
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-lg font-bold text-orange-500">
          <span>Total Boost Multiplier: </span>
          <span className="text-2xl">{multiplier}x</span>
        </div>
      </Card>
    </div>
  );
};

export default BoostList;
