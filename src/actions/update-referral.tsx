"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateReferral(referrerId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    throw new Error("Not authenticated");
  }

  try {
    // Check if a referral already exists
    const existingReferral = await prisma.referral.findFirst({
      where: {
        referredId: session.user.id,
      },
    });

    if (existingReferral) {
      console.log(`Referral already exists for user ${session.user.id}`);
      return "already_exists";
    }

    // Create the referral
    await prisma.referral.create({
      data: {
        referrerId: referrerId,
        referredId: session.user.id,
      },
    });
    console.log(`Referral created: ${referrerId} referred ${session.user.id}`);
    return "success";
  } catch (error) {
    console.error("Error creating referral:", error);
    throw new Error("Failed to create referral");
  }
}
