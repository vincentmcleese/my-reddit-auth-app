import prisma from "@/lib/prisma";

/**
 * Function to refresh the Reddit access token.
 */
export async function refreshAccessToken(account: {
  id: string;
  refresh_token: string;
}): Promise<{
  access_token: string;
  expires_at: number;
  refresh_token: string;
}> {
  try {
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: account.refresh_token,
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    const newRefreshToken =
      refreshedTokens.refresh_token ?? account.refresh_token;
    const expiresAt = Date.now() + refreshedTokens.expires_in * 1000;

    await prisma.account.update({
      where: { id: account.id },
      data: {
        access_token: refreshedTokens.access_token,
        expires_at: expiresAt,
        refresh_token: newRefreshToken,
      },
    });

    return {
      access_token: refreshedTokens.access_token,
      expires_at: expiresAt,
      refresh_token: newRefreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Could not refresh access token.");
  }
}

/**
 * Function to store or update the access/refresh tokens during sign-in.
 */
export async function storeTokens(
  userId: string,
  account: {
    provider: string;
    providerAccountId: string;
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  }
) {
  const existingAccount = await prisma.account.findFirst({
    where: {
      provider: account.provider,
      providerAccountId: account.providerAccountId,
    },
  });

  if (existingAccount) {
    // Update the existing account with new tokens and expiration date
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: {
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000,
      },
    });
  } else {
    // Create a new account entry with the tokens
    await prisma.account.create({
      data: {
        userId,
        type: account.provider,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expires_at: account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000,
      },
    });
  }
}
