import { NextAuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { updateUserProfile, RedditProfile } from "@/lib/profile-updater";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      authorization: {
        params: {
          duration: "permanent",
          scope: "identity mysubreddits read history",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "reddit" && profile) {
        try {
          await updateUserProfile(user.id, profile as Partial<RedditProfile>);
        } catch (error) {
          console.error("Error updating user profile during sign-in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            icon_img: true,
            total_karma: true,
            link_karma: true,
            comment_karma: true,
            is_employee: true,
            verified: true,
          },
        });

        if (dbUser) {
          session.user.icon_img = dbUser.icon_img;
          session.user.total_karma = dbUser.total_karma;
          session.user.link_karma = dbUser.link_karma;
          session.user.comment_karma = dbUser.comment_karma;
          session.user.is_employee = dbUser.is_employee;
          session.user.verified = dbUser.verified;
        }
      }
      return session;
    },
    // ... other callbacks
  },
  // ... other options
};
