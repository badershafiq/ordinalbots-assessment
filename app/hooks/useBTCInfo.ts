import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchBTCPrice, fetchBTCHeight } from "../services/btcAPI";

export const useBTCInfo = () => {
  const btcPriceQuery: UseQueryResult<number, Error> = useQuery({
    queryKey: ["btcPrice"],
    queryFn: fetchBTCPrice,
    refetchInterval: 100000,
  });

  const blockHeightQuery: UseQueryResult<number, Error> = useQuery({
    queryKey: ["btcHeight"],
    queryFn: fetchBTCHeight,
  });

  return {
    btcPrice: btcPriceQuery.data,
    blockHeight: blockHeightQuery.data,
    isPriceLoading: btcPriceQuery.isLoading,
    isHeightLoading: blockHeightQuery.isLoading,
    isPriceError: btcPriceQuery.isError,
    isHeightError: blockHeightQuery.isError,
  };
};
