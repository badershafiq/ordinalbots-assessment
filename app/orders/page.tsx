'use client';

import React, { useState } from 'react';
import { useOrderInfo } from '@/app/hooks/useOrderInfo';

const OrderPage = () => {
    const orders = [
        '39c9bdcf-6459-4509-b7a6-7138ac826378',
        '7d138fda-001c-4421-b1df-cbb5b8571d20',
        '8bb1d29e-171a-4a63-9b38-c5ee3e7fe2e1',
        '800fa3c4-7004-43e8-823e-928a2e5c30a0',
    ];

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { orderInfo, isOrderLoading, isOrderError } = useOrderInfo(selectedOrderId || '');

    const handleOrderClick = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    return (
        <div className="min-h-screen text-white flex flex-col items-center py-10">
            <h2 className="text-2xl font-bold mb-8 text-gradient text-green-400"> Check Your Order Status</h2>

            {/* Order Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 pt-5">
                {orders.map((orderId) => (
                    <div
                        key={orderId}
                        className="bg-neutral-800 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
                        onClick={() => handleOrderClick(orderId)}
                    >
                        <h3 className="text-lg font-bold truncate text-blue-400">
                            Order ID: {orderId}
                        </h3>
                        <p className="text-sm text-gray-400">Click to view details</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedOrderId && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50"
                    onClick={handleCloseModal}
                >
                    {/* Modal Content */}
                    <div
                        className="relative bg-white bg-opacity-10 backdrop-blur-lg text-white p-6 sm:p-8 rounded-lg w-[90%] max-w-[600px] shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-green-400">Order Details</h3>

                        {/* Skeleton Loading */}
                        {isOrderLoading && (
                            <div className="space-y-4">
                                <span className="inline-block bg-gray-300 animate-pulse w-32 sm:w-12 md:w-18 h-6 rounded-md"></span>
                                <span className="inline-block bg-gray-300 animate-pulse w-48 sm:w-16 md:w-32 h-6 rounded-md"></span>
                                <span className="inline-block bg-gray-300 animate-pulse w-full h-6 rounded-md"></span>
                                <span className="inline-block bg-gray-300 animate-pulse w-48 sm:w-32 md:w-48 h-6 rounded-md"></span>
                            </div>
                        )}

                        {/* Error */}
                        {isOrderError && (
                            <p className="text-center text-red-500">Error fetching order details</p>
                        )}

                        {/* Order Details */}
                        {orderInfo && !isOrderLoading && !isOrderError && (
                            <div className="space-y-6">
                                {/* Order Details */}
                                <div>
                                    <p><strong>Order ID:</strong> {orderInfo.id}</p>
                                    <p><strong>Status:</strong> {orderInfo.status}</p>
                                    <p><strong>Amount Charged:</strong> {orderInfo.amount} BTC</p>
                                    <p><strong>Service Fee:</strong> {orderInfo.serviceFee} BTC</p>
                                    <p><strong>Created At:</strong> {new Date(orderInfo.createdAt).toLocaleString()}</p>
                                    <p><strong>State:</strong> {orderInfo.state}</p>
                                    <p><strong>Order Type:</strong> {orderInfo.orderType}</p>
                                </div>


                                {/* Charge Details */}
                                {orderInfo.charge && (
                                    <div className='truncate'>
                                        <h4 className="text-lg font-semibold mb-2">Charge Details</h4>
                                        <p className='truncate'><strong>Address:</strong> {orderInfo.charge.address}</p>
                                        <p><strong>Description:</strong> {orderInfo.charge.description}</p>
                                        <p><strong>Currency:</strong> {orderInfo.charge.currency}</p>
                                        <p><strong>Fiat Value:</strong> {orderInfo.charge.fiat_value}</p>
                                        <p>
                                            <strong>Hosted Checkout URL:</strong>{' '}
                                            <a
                                                href={orderInfo.charge.hosted_checkout_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                View Checkout
                                            </a>
                                        </p>
                                    </div>
                                )}

                                {/* Refund Details */}
                                {orderInfo.refund && (
                                    <div className='truncate'>
                                        <h4 className="text-lg font-semibold mb-2">Refund Details</h4>
                                        <p><strong>Address:</strong> {orderInfo.refund.address}</p>
                                        <p><strong>Amount:</strong> {orderInfo.refund.amount} BTC</p>
                                        <p><strong>Transaction ID:</strong> {orderInfo.refund.txid}</p>
                                    </div>
                                )}

                                {/* Files Section */}
                                {orderInfo.files && orderInfo.files.length > 0 && (
                                    <div>
                                        <h4 className="text-lg font-semibold mb-2">Files</h4>
                                        <ul className="space-y-4">
                                            {orderInfo.files.map((file) => (
                                                <li key={file.url} className="flex justify-between items-center">
                                                    <div>
                                                        <p><strong>Name:</strong> {file.name}</p>
                                                        <p><strong>Type:</strong> {file.type}</p>
                                                        <p><strong>Size:</strong> {file.size} bytes</p>
                                                        <p><strong>Status:</strong> {file.status || 'N/A'}</p>
                                                    </div>
                                                    <a
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        Download
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}


                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
