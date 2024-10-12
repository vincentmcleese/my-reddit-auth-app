"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function saveScratchResult(won: boolean) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error("Not authenticated");
  }

  try {
    await prisma.scratchResult.create({
      data: {
        userId: session.user.id,
        scratchTime: new Date(),
        won: won,
      },
    });
    console.log("New scratch result saved. Result:", won);
    return { success: true };
  } catch (error) {
    console.error("Error saving scratch result:", error);
    return { success: false, error: "Failed to save scratch result" };
  }
}
