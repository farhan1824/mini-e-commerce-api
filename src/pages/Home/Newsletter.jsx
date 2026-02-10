import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <section className="py-12 md:py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Get exclusive offers, new arrivals, and fashion tips delivered to your inbox. Join thousands of fashion lovers today!
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 px-4 py-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary btn-md md:btn-lg px-8"
                        >
                            Subscribe
                        </button>
                    </form>

                    {submitted && (
                        <p className="text-green-400 mt-4">
                            ✓ Thank you for subscribing! Check your email for a special welcome offer.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
