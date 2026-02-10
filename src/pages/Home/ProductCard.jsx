import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Authentication/AuthContext";

const ProductCard = ({ product }) => {
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { loading } = useContext(AuthContext);

    const inWishlist = isWishlisted(product._id);

    const [isInCart, setIsInCart] = useState(false);

    // Fetch cart to check if this product is already added
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch("http://localhost:3000/cart/ids"); // returns array of productIds
                const cartIds = await res.json();
                setIsInCart(cartIds.includes(product._id));
            } catch (err) {
                console.error("Failed to fetch cart IDs", err);
            }
        };

        fetchCart();
    }, [product._id]);

    const handleAddToCart = async (productId) => {
        try {
            const res = await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }),
            });

            const data = await res.json();

            if (data.message === "Added to cart") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Added to cart",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setIsInCart(true); // mark as added
            }
        } catch (error) {
            console.error("Add to cart failed", error);
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

                {/* Wishlist */}
                <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 left-4 z-20 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
                >
                    <svg
                        className={`w-5 h-5 ${inWishlist ? "fill-red-500" : "text-gray-600"}`}
                        fill={inWishlist ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

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
                    className="w-full btn btn-neutral btn-outline"
                    disabled={isInCart}
                    onClick={() => handleAddToCart(product._id)}
                >
                    {isInCart ? "Added to Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;