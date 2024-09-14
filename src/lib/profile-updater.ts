import prisma from "@/lib/prisma";

export interface RedditProfile {
  name?: string; // Changed to optional
  icon_img?: string;
  total_karma?: number;
  link_karma?: number;
  comment_karma?: number;
  is_employee?: boolean;
  verified?: boolean;
}

/**
 * Function to update the user's profile with data from Reddit's profile object.
 * @param userId - The user's ID as a string
 * @param profile - An object containing the Reddit profile data
 */
export async function updateUserProfile(
  userId: string,
  profile: Partial<RedditProfile>
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        icon_img: profile.icon_img ?? null,
        total_karma: profile.total_karma ?? 0,
        link_karma: profile.link_karma ?? 0,
        comment_karma: profile.comment_karma ?? 0,
        is_employee: profile.is_employee ?? false,
        verified: profile.verified ?? false,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Could not update user profile.");
  }
}
