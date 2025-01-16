import { OrderDetails } from "../orders/type";

export const fetchOrderDetails = async (id: string): Promise<OrderDetails> => {
  const response = await fetch(`api/order/${id}`);
  console.log("fetchOrderDetails", response);
  const data = await response.json();
  console.log("data:data", data);
  if (!response.ok)
    throw new Error(data.error || "Failed to fetch OrderDetails");
  return data;
};
