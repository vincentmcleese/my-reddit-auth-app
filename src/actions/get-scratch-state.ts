"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { startOfDay, endOfDay } from "date-fns";

export async function getScratchState() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error("Not authenticated");
  }

  try {
    const today = new Date();
    const allScratchResults = await prisma.scratchResult.findMany({
      where: { userId: session.user.id },
      orderBy: { scratchTime: "desc" },
    });

    const todayScratchResults = allScratchResults.filter(
      (result) =>
        result.scratchTime >= startOfDay(today) &&
        result.scratchTime <= endOfDay(today)
    );

    const latestScratchResult = allScratchResults[0];

    return {
      latestScratchResult: latestScratchResult
        ? {
            won: latestScratchResult.won,
            lastScratchTime: latestScratchResult.scratchTime.toISOString(),
          }
        : null,
      todayScratchResults: todayScratchResults.map((result) => ({
        won: result.won,
        scratchTime: result.scratchTime.toISOString(),
      })),
      allScratchResults: allScratchResults.map((result) => ({
        won: result.won,
        scratchTime: result.scratchTime.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching scratch state:", error);
    return {
      latestScratchResult: null,
      todayScratchResults: [],
      allScratchResults: [],
    };
  }
}
