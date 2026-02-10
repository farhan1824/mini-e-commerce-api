import React from 'react'
import useFetchData from '../Hooks/UseFetchData';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export const Order = () => {
    const { data: cartItems, loading, error } = useFetchData("cart");
    // console.log(cartItems);
    const navigate = useNavigate();
    const handleOrders = async () => {
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    category: item.product.category,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image,
                })),
                totalPrice,
                status: "pending",
                createdAt: new Date(),
            };

            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            // const data = await res.json();
            // console.log(data);
            if (res.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order placed successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/")
                // clear cart after order
                await fetch("http://localhost:3000/cart", { method: "DELETE" });
            }
        } catch (error) {
            console.error("Order failed", error);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-xs"></span>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="loading loading-spinner loading-md"></span>
                <span className="loading loading-spinner loading-lg"></span>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (error) {
        return <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error.message}.</span>
        </div>;
    }

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 text-black p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-6 items-center border-b pb-6"
                        >
                            {/* Product Image */}
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-32 h-32 object-cover rounded"
                            />

                            {/* Product Info */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    {item.product.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Category: {item.product.category}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="text-sm text-gray-600 mt-1">
                                    Price: ${item.product.price}
                                </p>
                            </div>

                            {/* Item Total */}
                            <div className="text-lg font-semibold">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="mt-8 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button onClick={handleOrders} className="btn btn-primary w-full mt-6">
                    Place Order
                </button>
            </div>
        </div>
    );
}
