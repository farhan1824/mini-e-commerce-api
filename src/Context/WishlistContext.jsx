import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlisted, setWishlisted] = useState([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                setWishlisted(JSON.parse(savedWishlist));
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlisted));
    }, [wishlisted]);

    // Toggle wishlist item
    const toggleWishlist = (product) => {
        setWishlisted((prevItems) => {
            const isWishlisted = prevItems.some((item) => item.id === product.id);
            if (isWishlisted) {
                return prevItems.filter((item) => item.id !== product.id);
            } else {
                return [...prevItems, product];
            }
        });
    };

    // Check if product is wishlisted
    const isWishlisted = (productId) => {
        return wishlisted.some((item) => item.id === productId);
    };

    // Remove from wishlist
    const removeFromWishlist = (productId) => {
        setWishlisted((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    // Clear wishlist
    const clearWishlist = () => {
        setWishlisted([]);
    };

    const value = {
        wishlisted,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        clearWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
