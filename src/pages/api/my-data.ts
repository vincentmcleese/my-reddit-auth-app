import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"; // Make sure this path is correct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user.id) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Fetch the account for the user
    const account = await prisma.account.findFirst({
      where: { userId: session.user.id, provider: "reddit" },
    });

    if (!account || !account.access_token) {
      return res.status(401).json({ error: "No access token found" });
    }

    // Check if the token is expired
    if (account.expires_at && account.expires_at * 1000 < Date.now()) {
      return res.status(401).json({ error: "Access token has expired" });
    }

    const response = await fetch("https://oauth.reddit.com/api/v1/me", {
      headers: { Authorization: `Bearer ${account.access_token}` },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Reddit API responded with status ${response.status}`,
        details: await response.text(),
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API route error:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred",
        details: error instanceof Error ? error.message : String(error),
      });
  }
}
