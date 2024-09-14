"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/shared/PageCard";
import ScratchCard from "@/components/ScratchCard";
import BoostList from "@/components/BoostBadge";
import Logo from "@/components/shared/logo";
import Confetti from "react-confetti";

export default function HomePage() {
  const { data: session } = useSession();

  const boosts = [
    {
      emoji: "🌟",
      description: ` ${session?.user?.total_karma} Karma`,
      points: 50,
    },
    { emoji: "🔥", description: "subreddit", points: 50 },
    { emoji: "⚡", description: "streak", points: 10 },
  ];

  const [isScratched, setIsScratched] = useState(false);
  const handleScratchComplete = () => {
    setIsScratched(true);
    console.log("Over 30% of the card has been scratched!");
  };

  return (
    <PageCard
      title={<Logo />}
      footer={
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      }
    >
      {isScratched && <Confetti />}

      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="w-full">
          <ScratchCard onScratchComplete={handleScratchComplete} />
          {isScratched && <div>Congratulations! </div>}
        </div>
        <div className="w-full">
          <BoostList
            boosts={boosts.map((boost) => ({
              ...boost,
              points:
                typeof boost.points === "string"
                  ? parseInt(boost.points, 10)
                  : boost.points,
            }))}
          />
        </div>
      </div>
      {/* <div className="text-left">
        <h2 className="text-lg font-semibold mt-4">Session Data:</h2>
        <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>

        <h2 className="text-lg font-semibold mt-4">Karma Data:</h2>
        {karma ? (
          <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-sm">
            {JSON.stringify(karma, null, 2)}
          </pre>
        ) : fetchError ? (
          <p className="mt-2 text-red-500">Error: {fetchError.message}</p>
        ) : (
          <p className="mt-2">Fetching karma data...</p>
        )}
      </div> */}
    </PageCard>
  );
}
