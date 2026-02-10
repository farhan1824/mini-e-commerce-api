import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import ProductCard from '../Home/ProductCard';

const Wishlist = () => {
    const { wishlisted, clearWishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 md:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-gray-600">
                            You have {wishlisted.length} item{wishlisted.length !== 1 ? 's' : ''} in your wishlist
                        </p>
                    </div>
                    {wishlisted.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="btn btn-outline btn-sm"
                        >
                            Clear Wishlist
                        </button>
                    )}
                </div>

                {/* Wishlist Items */}
                {wishlisted.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center">
                        <svg
                            className="w-24 h-24 mx-auto text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <p className="text-gray-600 mb-4 text-lg">Your wishlist is empty</p>
                        <p className="text-gray-500 mb-6">
                            Add items to your wishlist and they will appear here!
                        </p>
                        <Link to="/shop" className="btn btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlisted.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
