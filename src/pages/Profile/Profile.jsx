import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import profileanimation from "../../assets/Cube shape animation.json";
const categories = [
    "Tops",
    "Shirts",
    "Jackets & Blazers",
    "Dresses & Coats",
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("form");
    const [product, setProduct] = useState({
        name: "",
        price: "",
        originalPrice: "",
        discount: "",
        image: "",
        rating: "",
        reviews: "",
        category: "",
        stocks: "",
    });
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch products",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = selectedId ? "PUT" : "POST";
            const url = selectedId
                ? `http://localhost:3000/products/${selectedId}`
                : "http://localhost:3000/products";

            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            Swal.fire({
                icon: "success",
                title: selectedId ? "Product updated!" : "Product added!",
                timer: 1500,
                showConfirmButton: false,
            });

            setProduct({
                name: "",
                price: "",
                originalPrice: "",
                discount: "",
                image: "",
                rating: "",
                reviews: "",
                category: "",
                stocks: "",
            });
            setSelectedId(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save product",
            });
        }
    };

    const handleEdit = (p) => {
        setSelectedId(p._id);
        setProduct({
            name: p.name,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.discount,
            image: p.image,
            rating: p.rating,
            reviews: p.reviews,
            category: p.category,
            stocks: p.stocks,
        });
        setActiveTab("form");
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3000/products/${id}`, {
                    method: "DELETE",
                });
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                fetchProducts();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete product", "error");
            }
        }
    };

    const handleStockUpdate = async (product) => {
        const { value: qty } = await Swal.fire({
            title: "Update Stock",
            input: "number",
            inputLabel: "Enter new stock:",
            inputValue: product.stocks ?? 0,
            inputPlaceholder: "Enter stock",
            showCancelButton: true,
            confirmButtonText: "Update",
        });

        if (qty !== undefined && qty !== null && qty !== "") {
            try {
                await fetch(`http://localhost:3000/products/${product._id}/stocks`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stocks: Number(qty) }),
                });

                Swal.fire("Success!", "Stock updated successfully", "success");
                fetchProducts();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to update stock", "error");
            }
        }
    };

    if (loading) {
        return (
            <section className="py-16 md:py-20 bg-gray-50 text-center min-h-screen flex items-center justify-center">
                <div className="flex flex-col gap-4">
                    <span className="loading loading-ball loading-xs"></span>
                    <span className="loading loading-ball loading-sm"></span>
                    <span className="loading loading-ball loading-md"></span>
                    <span className="loading loading-ball loading-lg"></span>
                    <span className="loading loading-ball loading-xl"></span>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Header Section */}
            <section className="relative py-12 md:py-16 bg-linear-to-r from-gray-900 to-gray-800">
                <div className="container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Manage your products and inventory
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-12 md:py-16 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Tabs Navigation */}
                    <div className="flex gap-2 mb-8 border-b border-gray-300">
                        <button
                            onClick={() => setActiveTab("form")}
                            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === "form"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Add / Update Product
                        </button>
                        <button
                            onClick={() => setActiveTab("list")}
                            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === "list"
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Product List
                        </button>
                    </div>

                    {/* Add / Update Form */}
                    {activeTab === "form" && (
                        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6 gap-10">
                            {/* Form Section */}
                            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full md:w-2/5">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                    {selectedId ? "Update Product" : "Add New Product"}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Product Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter product name"
                                            value={product.name}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                            required
                                        />
                                    </div>

                                    {/* Price & Original Price */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Current Price
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                placeholder="Enter price"
                                                value={product.price}
                                                onChange={handleChange}
                                                className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Original Price
                                            </label>
                                            <input
                                                type="number"
                                                name="originalPrice"
                                                placeholder="Enter original price"
                                                value={product.originalPrice}
                                                onChange={handleChange}
                                                className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                            />
                                        </div>
                                    </div>

                                    {/* Discount */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Discount (%)
                                        </label>
                                        <input
                                            type="number"
                                            name="discount"
                                            placeholder="Enter discount percentage"
                                            value={product.discount}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            name="image"
                                            placeholder="Enter image URL"
                                            value={product.image}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                        />
                                        {product.image && (
                                            <div className="mt-3 rounded-lg overflow-hidden h-48 shadow-md transition-transform duration-300 hover:scale-105">
                                                <img
                                                    src={product.image}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={product.category}
                                            onChange={handleChange}
                                            className="select select-bordered w-full text-white rounded-lg"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat, idx) => (
                                                <option key={idx} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Stocks */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Stocks
                                        </label>
                                        <input
                                            type="number"
                                            name="stocks"
                                            placeholder="Enter stocks"
                                            value={product.stocks}
                                            onChange={handleChange}
                                            className="input input-bordered w-full text-white placeholder-gray-400 rounded-lg"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full text-white font-semibold py-3 text-lg rounded-lg transition-transform duration-200 hover:scale-105"
                                    >
                                        {selectedId ? "Update Product" : "Add Product"}
                                    </button>
                                </form>
                            </div>

                            {/* Lottie Animation Section */}
                            <div className="hidden md:flex justify-center items-center w-full md:w-2/5">
                                <Lottie
                                    animationData={profileanimation}
                                    loop
                                    className="max-w-md rounded-2xl shadow-xl"
                                />
                            </div>
                        </div>
                    )}

                    {/* Product List */}
                    {activeTab === "list" && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    All Products ({products.length})
                                </h2>
                            </div>
                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg">No products found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((p) => (

                                        <div key={p._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                            {/* Product Image */}
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                <img
                                                    src={p.image}
                                                    alt={p.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                {p.discount && (
                                                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        -{p.discount}%
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                                                    {p.name}
                                                </h3>
                                                <div className="space-y-2 mb-4 text-sm text-gray-600">
                                                    <p>
                                                        <span className="font-semibold">Category:</span> {p.category}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">Price:</span> ${p.price}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">Stock:</span> {p.stocks} units
                                                    </p>
                                                    {p.rating && (
                                                        <p>
                                                            <span className="font-semibold">Rating:</span> {p.rating} ⭐
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(p)}
                                                        className="btn btn-sm btn-secondary flex-1"
                                                    >
                                                        Edit
                                                    </button>
                                                    {/* <button
                                                        onClick={() => handleStockUpdate(p._id)}
                                                        className="btn btn-sm btn-warning flex-1"
                                                    >
                                                        Stock
                                                    </button> */}
                                                    <button
                                                        onClick={() => handleStockUpdate(p)}
                                                        className="btn btn-sm btn-warning flex-1"
                                                    >
                                                        Stock
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p._id)}
                                                        className="btn btn-sm btn-error flex-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default AdminDashboard;