import axios from "axios";

export interface BalanceResult {
  overall_balance: string;
  available_balance: string;
  block_height: number;
  tick: string;
}

export interface BalanceResponse {
  error: string | null;
  result: BalanceResult[];
}

export const fetchBrc20Balance = async (
  address: string,
  ticker: string
): Promise<BalanceResult> => {
  if (!address || !ticker) {
    throw new Error("Address and ticker are required");
  }

  try {
    const response = await axios.get("/api/brc20balance", {
      params: { address, ticker },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching BRC20 balance:", error);

    throw new Error("Failed to fetch BRC20 wallet balance");
  }
};
