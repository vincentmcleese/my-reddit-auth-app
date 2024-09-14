import { NextApiRequest, NextApiResponse } from "next";

//create a test route that returns data from the reddit api

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://www.reddit.com/r/aww/top.json?limit=100"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text(); // Get the raw text first
    console.log("Raw response:", text.substring(0, 200) + "..."); // Log the first 200 characters

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON parse error:", e);
      return res
        .status(500)
        .json({
          error: "Failed to parse JSON response",
          details: (e as Error).message,
        });
    }

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
