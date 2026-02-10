import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Authentication/AuthContext";

const ProductCard = ({ product }) => {

    const { cartIds, setCartIds } = useContext(AuthContext);

    const isInCart = cartIds.includes(product._id);

    const handleAddToCart = async () => {
        try {
            await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id }),
            });

            setCartIds(prev => [...prev, product._id]);

            Swal.fire({
                icon: "success",
                title: "Added to cart",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Add to cart failed", err);
        }
    };
    return (
        <div className="bg-white rounded-lg overflow-hidden group text-black">
            {/* Image */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Discount */}
                {product.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                        -{product.discount}%
                    </div>
                )}

                {/* Quick View */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Link
                        to={`/products/${product._id}`}
                        className="btn btn-primary btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className="w-full"
                >
                    {isInCart ? <p className="btn btn-neutral w-full mt-2">Added to Cart</p> : <p className="btn btn-outline w-full mt-2">Add to Cart</p>}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;