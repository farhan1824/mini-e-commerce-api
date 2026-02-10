import React, { use, useState } from 'react';
import ProductCard from '../Home/ProductCard';

import { AuthContext } from '../../Firebase/Authentication/AuthContext';
import useFetchData from '../Hooks/UseFetchData';
const Shop = () => {
    const { loading } = use(AuthContext);
    const { data: products, error } = useFetchData("products");
    // Show only the visible products
    const [visibleCount, setVisibleCount] = useState(6);
    const visibleProducts = products.slice(0, visibleCount);

    // Load more products when button is clicked
    const handleViewAll = () => {
        setVisibleCount((prev) => prev + 6);
    };
    if (loading) {
        return (
            <section className="py-12 md:py-16 bg-gray-50 text-center">
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
                <span className="loading loading-ball loading-xl"></span>
            </section>
        );
    }

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error, // don't wrap in {} here
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return null; // Stop rendering if there's an error
    }

    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* View All Button */}
                {visibleCount < products.length && (
                    <div className="text-center mt-12">
                        <button
                            className="btn btn-neutral btn-outline"
                            onClick={handleViewAll}
                        >
                            View More Products
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shop;