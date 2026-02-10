import React, { use } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Firebase/Authentication/AuthContext';
import useFetchData from '../Hooks/UseFetchData';
import Swal from 'sweetalert2';

const CategoryList = () => {
    const { loading } = use(AuthContext);
    const { data: products, error } = useFetchData("products");

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
            text: error,
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return null;
    }

    // Get unique categories with one product image per category
    const categoriesWithImages = Array.from(
        new Map(products.map(p => [p.category, p])).values()
    ).map(product => ({
        name: product.category,
        image: product.image
    }));

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Shop by Category
                    </h2>
                    <p className="text-gray-600">
                        Explore our curated collections
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {categoriesWithImages.map((category) => (
                        <Link
                            key={category.name}
                            to={`/products?category=${encodeURIComponent(category.name)}`}
                            className="group relative overflow-hidden rounded-lg h-48 md:h-64"
                        >
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                <h3 className="text-white text-lg md:text-xl font-semibold text-center">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryList;