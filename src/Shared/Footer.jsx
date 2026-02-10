import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">milano</h3>
                        <p className="text-sm mb-4">
                            Discover premium fashion with soft comfort and bold looks. Shop our latest collections with free shipping on all orders.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.856 1.102 5 5 0 00-8.655-3.08 5 5 0 0016.232 4.57M2.013 10.362c0 1.657.738 3.24 2.023 4.307a4.998 4.998 0 007.988-1.023c.382 1.105 1.265 2.058 2.35 2.652-.863.503-1.878.776-2.943.776-3.314 0-6-2.686-6-6z" /></svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20v-7.21H5.5V9.25h2.79V7.25c0-2.89 1.08-4.53 4.26-4.53 1.48 0 2.7.11 2.7.11v3.48h-1.85c-1.43 0-1.74.9-1.74 2.05V9.25h3.44l-.44 3.54h-3v7.21h-3.4z" /></svg>
                            </a>
                            <a href="#" className="hover:text-white transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/shop" className="hover:text-white transition">New Arrivals</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Bestsellers</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Collections</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Sale</Link></li>
                            <li><Link to="/shop" className="hover:text-white transition">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm mb-4">
                            Subscribe to receive updates on new releases and exclusive offers.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded border border-gray-700 focus:outline-none focus:border-gray-500"
                            />
                            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <p className="text-sm">
                            © 2024 Milano. All rights reserved.
                        </p>
                        <div className="flex gap-4 justify-start md:justify-end">
                            <img src="https://via.placeholder.com/40x25" alt="Visa" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="Mastercard" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="PayPal" className="h-6" />
                            <img src="https://via.placeholder.com/40x25" alt="Apple Pay" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
