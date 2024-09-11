"use client";

import Login from "@/components/Login";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

async function fetchKarma(accessToken: string) {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching karma:", error);
    return null;
  }
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const [karma, setKarma] = useState<any>(null);

  useEffect(() => {
    console.log("HomePage useEffect running");
    if (session && session.accessToken) {
      console.log("Access Token exists:", session.accessToken);
      fetchKarma(session.accessToken).then(setKarma);
    } else {
      console.log("Access Token does not exist");
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center text-orange-600">
          Karm-a
          <span className="text-5xl">h</span>
          <span className="text-6xl">h</span>
          <span className="text-7xl">h</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h1>Welcome, {session.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>

        <h2>Karma Data:</h2>
        {karma ? (
          <pre>{JSON.stringify(karma, null, 2)}</pre>
        ) : (
          <p>Fetching karma data...</p>
        )}
      </CardContent>
    </Card>
  );
}
