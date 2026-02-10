import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-96 md:h-96 bg-linear-to-r from-gray-900 to-gray-800 flex items-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80)',
                }}
            />

            <div className="relative z-10 container mx-auto px-4 md:px-8 py-12">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Soft Comfort Bold Looks
                    </h1>
                    <p className="text-gray-300 text-lg mb-8">
                        Discover our latest collection of fashion-forward styles that combine comfort with elegance.
                    </p>
                    <Link
                        to="/shop"
                        className="btn btn-lg btn-primary"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
