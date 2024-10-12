import { NextAuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { storeTokens, refreshAccessToken } from "@/lib/token-handler";
import { updateUserProfile } from "@/lib/profile-updater";

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
    async session({ session, user }) {
      const account = await prisma.account.findFirst({
        where: { userId: user.id, provider: "reddit" },
      });

      if (!account) return session;

      if (account.expires_at && Date.now() > account.expires_at) {
        console.log("Access token has expired, refreshing...");
        try {
          const refreshedTokens = await refreshAccessToken({
            id: account.id,
            refresh_token: account.refresh_token as string,
          });
          session.accessToken = refreshedTokens.access_token;
          session.error = null;
        } catch (error) {
          session.error = "RefreshAccessTokenError";
        }
      } else {
        session.accessToken = account.access_token;
      }

      session.user.id = user.id;
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (dbUser) {
        // Add custom user profile data to the session object
        session.user.icon_img = dbUser.icon_img;
        session.user.total_karma = dbUser.total_karma;
        session.user.link_karma = dbUser.link_karma;
        session.user.comment_karma = dbUser.comment_karma;
        session.user.is_employee = dbUser.is_employee;
        session.user.verified = dbUser.verified;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      if (profile && account?.provider === "reddit") {
        try {
          console.log("SignIn callback - user:", user); // Log the user object
          console.log("SignIn callback - account:", account); // Log the account object
          console.log("SignIn callback - profile:", profile); // Log the profile object

          const existingUser = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            include: {
              user: true, // To get the related User model
            },
          });

          if (existingUser) {
            // You now have access to the user's model ID (existingUser.user.id)
            console.log("User ID:", existingUser.user.id);
            // Update the user's profile
            await updateUserProfile(existingUser.user.id, profile);
            // Store or update the access/refresh tokens
            await storeTokens(existingUser.user.id, {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token || "",
              refresh_token: account.refresh_token || "",
              expires_at: account.expires_at,
            });

            return true;
          }
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },
};
