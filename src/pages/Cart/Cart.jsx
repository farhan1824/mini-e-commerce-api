import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    // Fetch cart from API
    const fetchCart = async () => {
        try {
            setCartLoading(true);
            const res = await fetch("http://localhost:3000/cart");
            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Update quantity
    const updateQuantity = async (id, action) => {
        try {
            await fetch(`http://localhost:3000/cart/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            fetchCart(); // refresh cart after update
        } catch (err) {
            console.error("Failed to update quantity", err);
        }
    };

    // Delete item
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" });
            setCartItems((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.error("Failed to remove cart item", err);
        }
    };

    // Calculations
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (cartLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg">
                <span className="loading loading-spinner loading-xs"></span>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="loading loading-spinner loading-md"></span>
                <span className="loading loading-spinner loading-lg"></span>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <div className="container mx-auto px-4 md:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-lg p-8 text-center">
                                <p className="text-gray-600 mb-4">Your cart is empty</p>
                                <Link to="/shop" className="btn btn-primary">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-lg p-6 flex gap-4"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-24 h-24 object-cover rounded"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-gray-600 mt-2">
                                                ${item.product.price}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => updateQuantity(item._id, "dec")}
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="btn btn-sm"
                                                onClick={() => updateQuantity(item._id, "inc")}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-outline btn-error"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 sticky top-20">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6 border-b">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold mb-6">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/order"
                                className="w-full btn btn-primary btn-lg mb-3"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link to="/shop" className="w-full btn btn-outline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;