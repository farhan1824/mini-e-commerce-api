import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const CategoryProductDetails = () => {
    const products = useLoaderData(); // This is the array of products from loader
    console.log(products);

    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Products For {products[0].category}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden group text-black shadow-sm hover:shadow-lg transition"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                {/* Discount Badge */}
                                {product.discount && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                                        -{product.discount}%
                                    </div>
                                )}

                                {/* Quick View Button */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <Link
                                        to={`/products/${product._id}`}
                                        className="btn btn-primary btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Quick View
                                    </Link>
                                </div>
                            </div>

                            {/* Product Info */}
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
                                                className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
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
                                        <span className="text-sm text-gray-500 line-through">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                </div>

                                {/* Colors */}
                                {product.colors && (
                                    <div className="flex gap-2 mb-4">
                                        {product.colors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-900 transition"
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Add to Cart Button */}
                                <button className="w-full btn btn-neutral btn-outline">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryProductDetails;