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
          (session as any).error = null;
        } catch (error) {
          (session as any).error = "RefreshAccessTokenError";
        }
      } else {
        session.accessToken = account.access_token;
      }

      session.user.id = user.id;
      return session;
    },

    async signIn({ user, account, profile }) {
      if (profile && account?.provider === "reddit") {
        try {
          // Update the user's profile
          await updateUserProfile(user.id, profile);
          // Store or update the access/refresh tokens
          await storeTokens(user.id, {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token || "",
            refresh_token: account.refresh_token || "",
            expires_at: account.expires_at,
          });
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
      return true;
    },
  },
};
