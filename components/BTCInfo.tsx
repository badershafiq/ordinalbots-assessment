import React from 'react';
import { useBTCInfo } from '../app/hooks/useBTCInfo';

const BtcDataComponent = () => {
    const { btcPrice, blockHeight, isPriceLoading, isHeightLoading, isPriceError, isHeightError } = useBTCInfo();

    return (
        <div className=" flex items-center justify-center p-4">
            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md w-full border border-white/20">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gradient mb-6 text-center">
                    Bitcoin Information
                </h1>

                {/* BTC Price */}
                <div className="mb-6">
                    <p className="text-lg font-semibold mb-2">BTC Price:</p>
                    {isPriceError ? (
                        <span className="text-red-500">
                            Error fetching price. Please try again later.
                        </span>
                    ) : isPriceLoading ? (
                        <span className="inline-block bg-gray-300 animate-pulse w-40 h-6 rounded-md"></span>
                    ) : (
                        <span className="text-2xl font-bold text-green-400">
                            ${btcPrice?.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Current Block Height */}
                <div className="mb-6">
                    <p className="text-lg font-semibold mb-2">Current Block Height:</p>
                    {isHeightError ? (
                        <span className="text-red-500">
                            Error fetching block height. Please try again later.
                        </span>
                    ) : isHeightLoading ? (
                        <span className="inline-block bg-gray-300 animate-pulse w-40 h-6 rounded-md"></span>
                    ) : (
                        <span className="text-2xl font-bold text-blue-400">
                            {blockHeight?.toLocaleString()}
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BtcDataComponent;
