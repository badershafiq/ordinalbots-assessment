import axios from "axios";
import { NextResponse } from "next/server";

const apiKey = process.env.ORDINALSBOT_API_KEY;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Order ID is required." },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get("https://api.ordinalsbot.com/order", {
      params: {
        id,
      },
      headers: { "x-api-key": apiKey },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching Order details:", error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
