type FileInfo = {
  name: string;
  size: number;
  type: string;
  url: string;
  s3Key?: string;
  completed?: boolean;
  processing?: boolean;
  status?: string;
  tx?: {
    inscription?: string;
    reveal?: string;
    totalFees?: number;
    updatedAt?: number;
  };
};

type LightningInvoice = {
  expires_at: number;
  payreq: string;
};

type ChargeInfo = {
  address: string;
  amount: number;
  auto_settle?: boolean;
  chain_invoice: {
    address: string;
  };
  created_at: number;
  currency: string;
  desc_hash: boolean;
  description: string;
  fiat_value: number;
  hosted_checkout_url: string;
  id: string;
  lightning_invoice: LightningInvoice;
  source_fiat_value: number;
  status: string;
  ttl: number;
  uri: string;
  callback_url: string;
};

type RefundInfo = {
  address: string;
  amount: number;
  txid: string;
};

export type OrderDetails = {
  additionalFeeCharged: number;
  amount?: number;
  baseFee?: number;
  chainFee: number;
  charge: ChargeInfo;
  completed?: boolean;
  createdAt: number;
  error?: string;
  fee: number | string;
  fileCount?: number;
  files?: FileInfo[];
  id: string;
  inscribedCount?: number;
  lowPostage: boolean;
  orderType: string;
  paid?: boolean;
  paidAt?: number;
  postage: number;
  price?: number;
  rareSats: string;
  rareSatsFee: number;
  receiveAddress: string;
  refund?: RefundInfo;
  referral?: string;
  serviceFee: number;
  state: string;
  status: string;
  collection?: {
    accessCode?: string;
    count?: number;
    id?: string;
    type?: string;
  };
  projectTag?: string;
};
