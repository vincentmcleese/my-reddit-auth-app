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

export async function createUserProfile(profile: Partial<RedditProfile>) {
  try {
    await prisma.user.create({
      data: {
        icon_img: profile.icon_img ?? null,
        total_karma: profile.total_karma ?? 0,
        link_karma: profile.link_karma ?? 0,
        comment_karma: profile.comment_karma ?? 0,
        is_employee: profile.is_employee ?? false,
        verified: profile.verified ?? false,
      },
    });
    console.log("User profile created successfully");
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw new Error("Could not create user profile.");
  }
}
