'use client';
import React, { useState } from 'react';
import { LEATHER, ProviderType, UNISAT, XVERSE, MAGIC_EDEN, ORANGE, XverseLogo, UnisatLogo, MagicEdenLogo, LeatherLogo } from '@omnisat/lasereyes';
import { useWallet } from '@/context/WalletContext';


const WalletConnectorModal = () => {
    const { connectWallet, disconnectWallet, walletAddress, hasLeather, hasMagicEden, hasOrange, hasUnisat, hasXverse } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const wallets: { name: string; icon?: React.FC; connector: ProviderType, isInstalled: boolean }[] = [
        { name: 'Leather Wallet', icon: LeatherLogo, connector: LEATHER, isInstalled: hasLeather },
        { name: 'Unisat Wallet', icon: UnisatLogo, connector: UNISAT, isInstalled: hasUnisat },
        { name: 'Xverse Wallet', icon: XverseLogo, connector: XVERSE, isInstalled: hasXverse },
        { name: 'MagicEden Wallet', icon: MagicEdenLogo, connector: MAGIC_EDEN, isInstalled: hasMagicEden },
        { name: 'Orange Wallet', connector: ORANGE, isInstalled: hasOrange },
    ];

    const handleConnect = async (walletConnector: ProviderType) => {
        try {
            await connectWallet(walletConnector);
            setIsModalOpen(false);
        } catch (error) {
            console.log('Failed to connect wallet:', error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnectWallet();
        } catch (error) {
            console.log('Failed to disconnect wallet:', error);
        }
    };

    return (
        <div>
            {!walletAddress ? (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-2 border-white border-2 rounded-full text-white hover:bg-neutral-800"
                >
                    Connect
                </button>
            ) : (
                <button
                    onClick={handleDisconnect}
                    className="px-8 py-2 border-white border-2 rounded-full text-white hover:bg-neutral-800"
                >
                    Disconnect
                </button>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-neutral-900 bg-opacity-90 backdrop-filter backdrop-blur-md rounded-lg p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-white text-lg font-semibold mb-4">Select Wallet</h2>
                        <div className="flex flex-col gap-4">
                            {wallets.map((wallet) => (
                                <button
                                    key={wallet.name}
                                    className={`flex items-center gap-3 p-3 border rounded-lg ${wallet.isInstalled
                                        ? 'border-gray-700 hover:bg-gray-800 focus:ring-2 focus:ring-blue-500'
                                        : 'border-gray-500 cursor-not-allowed opacity-50'
                                        }`}
                                    onClick={() => wallet.isInstalled && handleConnect(wallet.connector)}
                                    disabled={!wallet.isInstalled}
                                >
                                    {wallet.icon ? <wallet.icon /> : null}
                                    <span className="text-white text-sm font-medium">{wallet.name}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 text-red-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletConnectorModal;
