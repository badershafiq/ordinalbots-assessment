export const fetchBTCPrice = async (): Promise<number> => {
  const response = await fetch("/api/btcPrice");
  console.log("fetchBTCPrice", response);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch BTC price");
  return data.price;
};

export const fetchBTCHeight = async (): Promise<number> => {
  const response = await fetch("/api/btcHeight");
  console.log("fetchBlockHeight", response);
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "Failed to fetch block height");
  return data.blockHeight;
};
