import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchOrderDetails } from "../services/orderAPI";
import { OrderDetails } from "../orders/type";

export const useOrderInfo = (id: string) => {
  console.log("useOrderInfo", id);
  const orderInfo: UseQueryResult<OrderDetails, Error> = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderDetails(id),
    refetchInterval: 100000,
    enabled: !!id,
  });
  console.log("orderInfo", orderInfo.data);

  return {
    orderInfo: orderInfo.data,
    isOrderLoading: orderInfo.isLoading,
    isOrderError: orderInfo.isError,
  };
};
