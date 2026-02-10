import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ProductCard from "../Home/ProductCard";

const ProductDetails = () => {
    const product = useLoaderData();

    // Default size logic → prefer M, otherwise first available
    const [selectedSize, setSelectedSize] = useState(
        product?.sizes?.includes("M") ? "M" : product?.sizes?.[0]
    );

    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    // Placeholder (connect real related products later)
    const relatedProducts = [];

    return (
        <div className="min-h-auto bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 py-8">

                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
                    <Link to="/" className="hover:text-gray-900">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-900">Shop</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-semibold">{product.name}</span>
                </div>

                {/* Product Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-6 mb-12">

                    {/* Image */}
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-96 object-cover transform transition-transform duration-500 ease-out hover:scale-110"
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
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
                            <span className="text-gray-600">
                                ({product.reviews || 0} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                ${product.price}
                            </span>

                            {product.originalPrice && (
                                <>
                                    <span className="text-lg text-gray-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                    {product.discount && (
                                        <span className="text-red-500 font-semibold">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.description}
                            </p>
                        )}

                        {/* Sizes */}
                        {product.sizes && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-12 px-4 py-2 rounded border-2 text-sm font-semibold transition
                        ${selectedSize === size
                                                    ? "border-gray-900 bg-gray-900 text-white"
                                                    : "border-gray-300 text-gray-900 hover:border-gray-900"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity + Cart */}
                        <div className="mb-6 flex gap-4">
                            <div className="flex items-center border border-gray-300 rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 border-x border-gray-300">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2"
                                >
                                    +
                                </button>
                            </div>

                            <button className="flex-1 btn btn-primary btn-lg">
                                Add to Cart
                            </button>
                        </div>

                        {/* Wishlist / Share */}
                        <div className="flex gap-3 mb-6 pb-6 border-b">
                            <button className="btn btn-neutral btn-outline flex-1">
                                Add to Wishlist
                            </button>
                            <button className="btn btn-neutral btn-outline">
                                Share
                            </button>
                        </div>

                        {/* Specifications */}
                        {product.specifications && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    Specifications
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <dt className="text-gray-600 capitalize">{key}</dt>
                                            <dd className="text-gray-900 font-medium">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;