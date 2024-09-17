"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// update the user's email
export async function updateEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  console.log("User ID:", userId);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email },
    });

    console.log("User updated:", user);
    // Revalidate the relevant path to ensure the cache is refreshed
    // revalidatePath("/");
  } catch (error) {
    console.error("Error updating email:", error);
    throw new Error("Error updating email");
  }

  return "success";
}
