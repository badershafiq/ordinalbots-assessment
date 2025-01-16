'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WalletConnectorModal from "./WalletConnect";
import { useWallet } from "@/context/WalletContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { walletAddress, disconnectWallet } = useWallet();

    const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
        <nav className="bg-neutral-900 border-b border-gray-700 px-4">
            <div className="flex items-center justify-between px-4 py-2 md:py-4">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo-light.svg"
                            alt="Ordinal Logo"
                            width={160}
                            height={40}
                            className="cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/balance" className="text-white hover:text-gray-300">
                        Balance
                    </Link>
                    <Link href="/orders" className="text-white hover:text-gray-300">
                        Orders
                    </Link>
                    <div className="flex items-center gap-4">
                        {walletAddress ? (
                            <div className="flex items-center gap-2  bg-neutral-800 text-white px-8 py-2 border-white border-2 rounded-full text-sm">
                                <span>{formatAddress(walletAddress)}</span>
                                <button
                                    onClick={disconnectWallet}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : (
                            <WalletConnectorModal />
                        )}
                    </div>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <>
                    <div className="md:hidden bg-gray-900 text-white">
                        <Link
                            href="/balance"
                            className="block px-4 py-2 hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Balance
                        </Link>
                        <Link
                            href="/orders"
                            className="block px-4 py-2 hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Orders
                        </Link>
                    </div>

                    <div>
                        <div className="px-4 py-2">
                            {walletAddress ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between px-8 py-2 bg-neutral-800 rounded-lg">
                                        <span className="text-sm">{formatAddress(walletAddress)}</span>
                                        <button
                                            onClick={disconnectWallet}
                                            className="text-red-400 hover:text-red-500 text-sm"
                                        >
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <WalletConnectorModal />
                            )}
                        </div>
                    </div>
                </>
            )
            }
        </nav >
    );
};

export default Navbar;

