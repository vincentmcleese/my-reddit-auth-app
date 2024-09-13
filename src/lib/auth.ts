import type { NextAuthOptions } from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
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
      session.accessToken = account?.access_token ?? null;
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async createUser(message) {
      console.log("User created:", message);
    },
    async linkAccount({ user, account, profile }) {
      console.log("Account linked:", { user, account, profile });
    },
  },
};
