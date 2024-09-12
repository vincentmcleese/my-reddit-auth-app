"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define a custom session type
interface CustomSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  accessToken?: string;
}

// Type guard function
function isCustomSession(session: unknown): session is CustomSession {
  return (
    !!session && typeof (session as CustomSession).accessToken === "string"
  );
}

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
  const { data: session, status } = useSession();
  const [karma, setKarma] = useState<KarmaData | null>(null);
  const [fetchError, setFetchError] = useState<FetchError>(null);

  useEffect(() => {
    console.log("HomePage useEffect running");
    if (isCustomSession(session) && session.accessToken) {
      console.log("Access Token exists:", session.accessToken);
      fetchKarma(session.accessToken).then(({ data, error }) => {
        if (data) {
          setKarma(data);
        }
        if (error) {
          setFetchError(error);
        }
      });
    } else {
      console.log("Access Token does not exist");
    }
  }, [session]);

  if (status === "loading") {
    return <div className="text-black">Loading...</div>;
  }

  if (isCustomSession(session)) {
    return (
      <Card className="max-w-2xl mx-auto mt-10 bg-white text-black">
        <CardHeader>
          <CardTitle className="text-black">
            Welcome, {session.user?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          <h2 className="text-lg font-semibold mt-4 text-black">
            Session Data:
          </h2>
          <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-black">
            {JSON.stringify(session, null, 2)}
          </pre>
          <h2 className="text-lg font-semibold mt-4 text-black">
            Access Token:
          </h2>
          <p className="mt-2 text-black">
            {session.accessToken || "No access token available"}
          </p>
          <h2 className="text-lg font-semibold mt-4 text-black">Karma Data:</h2>
          {karma ? (
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-black">
              {JSON.stringify(karma, null, 2)}
            </pre>
          ) : (
            <p className="mt-2 text-black">Fetching karma data...</p>
          )}
          {fetchError && (
            <p className="mt-2 text-red-500">
              Error fetching karma: {fetchError.message}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 bg-white text-black">
      <CardHeader>
        <CardTitle className="text-black">You are not logged in</CardTitle>
      </CardHeader>
      <CardContent>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn("reddit")}
        >
          Sign in with Reddit
        </button>
      </CardContent>
    </Card>
  );
}
