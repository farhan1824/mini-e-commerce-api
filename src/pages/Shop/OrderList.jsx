import React from "react";
import { useLoaderData } from "react-router";

const OrderList = () => {
    const orderdatas = useLoaderData();

    return (
        <div className="p-6 space-y-8">
            {
                orderdatas.length === 0 ? <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gray-50 p-6 rounded-lg shadow-md">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                        alt="No Orders"
                        className="w-32 h-32 mb-6 opacity-70"
                    />
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        You have no orders yet
                    </h2>
                    <p className="text-gray-500 mb-4">
                        Looks like you haven't placed any orders. Start shopping now!
                    </p>
                    <a
                        href="/shop"
                        className="btn btn-primary btn-md"
                    >
                        Go to Shop
                    </a>
                </div> :
                    orderdatas.map((order) => (
                        <div
                            key={order._id}
                            className="border rounded-lg shadow-md p-5 bg-base-100"
                        >
                            {/* Order Info */}
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">
                                    Order ID: {order._id}
                                </h2>
                                <p>Status: <span className="badge badge-warning">{order.status}</span></p>
                                <p>Total Price: <span className="font-bold">${order.totalPrice}</span></p>
                                <p className="text-sm text-gray-500">
                                    Ordered At: {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Items List */}
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border rounded p-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>

                                        <div className="font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default OrderList;