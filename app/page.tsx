'use client'
import React from 'react';
import { useWallet } from '@/context/WalletContext';
import BtcDataComponent from '@/components/BTCInfo';

const Homepage = () => {
  const { walletAddress } = useWallet();

  return (
    <div className="text-white font-sans p-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4  text-green-400">
          Welcome to OrdinalsBot
        </h1>
        <p className="text-gray-300 text-lg">
          The home of Ordinals on Bitcoin. Explore Bitcoin ordinals with simplicity. View balances, orders, and more.
        </p>
      </header>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center px-6">
        {/* Wallet Status Card */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gradient">
            Wallet Status
          </h2>
          {walletAddress ? (
            <p className="text-lg text-center break-words ">
              <span className="font-semibold text-green-400">Connected Wallet:</span>{' '}
              <span className="font-bold">{walletAddress}</span>
            </p>
          ) : (
            <p className="text-lg text-center text-red-400">
              Connect to a wallet to see details.
            </p>
          )}
        </div>
        <BtcDataComponent />
      </div>
    </div>
  );
};

export default Homepage;
