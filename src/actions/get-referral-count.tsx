"use server";

import prisma from "@/lib/prisma";

export async function getReferralCount(userId: string) {
  try {
    const count = await prisma.referral.count({
      where: { referrerId: userId },
    });
    return count;
  } catch (error) {
    console.error("Error fetching referral count:", error);
    throw error;
  }
}
