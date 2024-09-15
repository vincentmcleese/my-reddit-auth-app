import React from "react";
import { Card } from "@/components/ui/card";

interface Boost {
  title: string;
  description: string;
  boost: number;
}

interface BoostListProps {
  boosts?: Boost[];
}

const BoostList: React.FC<BoostListProps> = ({ boosts = [] }) => {
  return (
    <div className="w-full font-sans">
      <Card className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
        <span className="text-lg font-bold">Breakdown:</span>

        <ul className="list-none p-0 m-0 mt-4">
          {boosts.map((boost, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-sm"
            >
              <div className="text-left">
                <span className="block font-bold capitalize">
                  {boost.title}
                </span>
                <span className="block text-sm text-gray-500">
                  {boost.description}
                </span>
              </div>
              <span className="font-bold text-reddit-orange">
                +{boost.boost}x
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default BoostList;
