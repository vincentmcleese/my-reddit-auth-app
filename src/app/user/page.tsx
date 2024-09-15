"use client";

import PageCard from "@/components/shared/PageCard";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserPage() {
  const { data: session } = useSession();
  return (
    <PageCard
      title="User Information"
      footer={
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      }
    >
      <div className="text-left">
        <h2 className="text-lg font-semibold mt-4">Session Data:</h2>
        <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto text-sm">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </PageCard>
  );
}
