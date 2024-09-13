"use server";

import prisma from "@/lib/prisma";

// create a function that checks if the user has an email, if not return false
export async function checkEmail(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  console.log("This user has already entered an email:", user);
  return user?.email || false;
}
