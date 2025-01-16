'use client';
import React from "react";
import { useWallet } from "@/context/WalletContext";
import { useBalanceInfo } from "../hooks/useBrc20balance";

const BalanceDisplay = () => {
  const { walletAddress, balance } = useWallet();
  const ticker = "ordi";
  const { isBalanceLoading, brc20Balance } = useBalanceInfo(walletAddress || '', ticker);

  return (
    <div className="flex items-center justify-center p-4 ">
      {/* Card */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md w-full border border-white/20">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gradient mb-6 text-center">
          Wallet Information
        </h1>

        {/* Wallet Address */}
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Wallet Address:</p>
          {!walletAddress ? (
            <span className="text-gray-400">No wallet connected.</span>
          ) : (
            <span className="text-sm break-all text-blue-300">{walletAddress}</span>
          )}
        </div>

        {/* Wallet Balance */}
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Wallet Balance:</p>
          <span className="text-2xl font-bold text-green-400">
            {balance ? `${balance} sats` : "N/A"}
          </span>
        </div>

        {/* BRC-20 Balance */}
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">BRC-20 Balance ({ticker.toUpperCase()}):</p>
          {!walletAddress ? (
            <p className="text-gray-400">Please connect a wallet to view balances.</p>
          ) : isBalanceLoading ? (
            <span className="inline-block bg-gray-300 animate-pulse w-40 h-6 rounded-md"></span>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-semibold">Confirmed:</span>
                <span className="text-blue-400">{(Number(brc20Balance?.available_balance ?? 0) / 10 ** 18).toFixed(8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="text-blue-400">{(Number(brc20Balance?.overall_balance ?? 0) / 10 ** 18).toFixed(8)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;
