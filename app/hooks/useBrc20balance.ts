import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBrc20Balance = async (address: string, ticker: string) => {
  const { data } = await axios.get(
    `api/brc20balance?address=${address}&ticker=${ticker}`
  );

  return data;
};

export const useBalanceInfo = (address: string, ticker: string) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["brc20Balance", address, ticker],
    queryFn: () => fetchBrc20Balance(address, ticker),
    enabled: !!address && !!ticker,
  });

  return {
    brc20Balance: data?.result?.[0],
    isBalanceLoading: isLoading,
    isBalanceError: isError,
    error,
  };
};
