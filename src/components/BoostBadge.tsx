import React from "react";

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
    <div className="bg-gradient-to-r from-[#FF4500] to-[#FF5722] p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-white">Breakdown:</h3>
      <ul className="list-none p-0 m-0 mt-4">
        {boosts.map((boost, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-sm"
          >
            <div className="text-left">
              <span className="block font-bold capitalize">{boost.title}</span>
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
    </div>
  );
};

export default BoostList;
