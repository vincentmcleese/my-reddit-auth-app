"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PageCard from "@/components/shared/PageCard";
import ScratchCard from "@/components/ScratchCard";
import BoostList from "@/components/BoostBadge";

interface KarmaData {
  kind: string;
  data: {
    children: Array<{
      sr: string;
      comment_karma: number;
      link_karma: number;
    }>;
  };
}

type FetchError = Error | null;

async function fetchKarma(
  accessToken: string
): Promise<{ data: KarmaData | null; error: FetchError }> {
  try {
    const response = await fetch("https://oauth.reddit.com/api/v1/me/karma", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "MyApp/1.0.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: KarmaData = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching karma:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

export default function HomePage() {
  const { data: session } = useSession();
  const [karma, setKarma] = useState<KarmaData | null>(null);
  const [fetchError, setFetchError] = useState<FetchError>(null);

  useEffect(() => {
    async function fetchKarmaData() {
      if (session?.accessToken) {
        const { data, error } = await fetchKarma(session.accessToken);
        if (data) setKarma(data);
        if (error) setFetchError(error);
        console.log(fetchError);
      }
    }

    fetchKarmaData();
  }, [session?.accessToken]);

  const boosts = [
    { emoji: "🌟", description: "karma", points: 100 },
    { emoji: "🔥", description: "subreddit", points: 50 },
    { emoji: "⚡", description: "streak", points: 30 },
  ];

  return (
    <PageCard
      title={`Welcome, ${karma}`}
      footer={
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      }
    >
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="w-full">
          <ScratchCard />
        </div>
        <div className="w-full">
          <BoostList boosts={boosts} />
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
