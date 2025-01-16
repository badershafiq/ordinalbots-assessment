import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("https://blockchain.info/q/getblockcount");
    const blockHeight = response.data;

    return NextResponse.json({ blockHeight });
  } catch (error) {
    console.error("Error fetching BTC price:", error);
    return NextResponse.json(
      { error: "Failed to fetch BTC price." },
      { status: 500 }
    );
  }
}
