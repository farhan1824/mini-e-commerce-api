import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
