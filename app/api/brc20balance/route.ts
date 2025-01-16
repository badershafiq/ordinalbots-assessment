import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "../config";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const query = new URL(request.url).searchParams;
  const address = query.get("address");
  const ticker = query.get("ticker");

  if (!address || !ticker) {
    return NextResponse.json(
      { error: "Both address and ticker are required." },
      { status: 400 }
    );
  }

  try {
    const response = await axiosInstance.get(
      "opi/v1/brc20/get_current_balance_of_wallet",
      {
        params: { address, ticker },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    const result = response.data.result;
    console.log("result", result);
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("Invalid response structure or empty result.");
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    console.error("Failed to fetch BRC20 balance:", errorMessage);

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: error instanceof Error ? 500 : 400,
      }
    );
  }
}
