'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ProviderType, useLaserEyes } from '@omnisat/lasereyes';
import { toast } from "react-toastify";

interface WalletContextProps {
  walletAddress: string | null;
  connectWallet: (walletConnector: ProviderType) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  hasLeather: boolean;
  hasMagicEden: boolean;
  hasUnisat: boolean;
  hasXverse: boolean;
  hasOrange: boolean;
  balance: string | null;
  paymentAddress: string | null;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const {
    connect,
    connected,
    address,
    disconnect,
    hasLeather,
    hasMagicEden,
    hasUnisat,
    hasXverse,
    hasOrange,
    getBalance,
    paymentAddress
  } = useLaserEyes();

  console.log("paymentAddress", paymentAddress)
  const connectWallet = async (walletConnector: ProviderType) => {
    try {
      await connect(walletConnector);
      if (address) {
        setWalletAddress(address);
        toast.success('Successfully connected wallet');
      }
    } catch (error) {
      console.log('Failed to connect wallet:', error);
      toast.error('Error connecting to the wallet' + error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setWalletAddress(null);
      setBalance(null);
      toast.success('Successfully disconnected wallet');
    } catch (error) {
      console.log('Failed to disconnect wallet:', error);
      toast.error('Error: Failed to disconnect wallet' + error);
    }
  };

  const fetchBalance = async () => {
    try {
      if (address) {
        const balance = await getBalance();
        setBalance(balance);
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      toast.error('Error fetching wallet balance');
    }
  };

  useEffect(() => {
    if (connected && address) {
      setWalletAddress(address);
      fetchBalance();
    }
  }, [connected, address]);

  return (
    <WalletContext.Provider value={{
      walletAddress,
      connectWallet,
      disconnectWallet,
      hasLeather,
      hasMagicEden,
      hasUnisat,
      hasXverse,
      hasOrange,
      balance,
      paymentAddress
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
