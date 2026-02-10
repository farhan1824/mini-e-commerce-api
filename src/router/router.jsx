import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Shop from '../pages/Shop/Shop';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Wishlist from '../pages/Wishlist/Wishlist';
import Signin from '../pages/LoginSignin/Signin';
import Home from '../Pages/Home/Home';
import CategoryProductDetails from '../pages/ProductDetails/CategoryProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'shop',
                Component: Shop,
            },
            {
                path: 'products',
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const category = url.searchParams.get("category");

                    const queryParam = category ? `?category=${encodeURIComponent(category)}` : '';
                    const res = await fetch(`http://localhost:3000/products${queryParam}`);
                    if (!res.ok) throw new Error("Failed to fetch products");
                    return res.json();
                },
                Component: CategoryProductDetails,
            },
            {
                path: 'products/:id',
                loader: async ({ params }) => {
                    const response = await fetch(`http://localhost:3000/products/${params.id}`);
                    if (!response.ok) {
                        throw new Response("Failed to fetch products", { status: response.status });
                    }
                    return response.json();
                },
                Component: ProductDetails,
            }
            ,
            {
                path: 'cart',
                // loader: () => fetch(`http://localhost:3000/cart`),
                Component: Cart,
            },
            {
                path: 'register',
                Component: Signin,
            },
            {
                path: 'wishlist',
                Component: Wishlist,
            },
        ],
    },
]);
