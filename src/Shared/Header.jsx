import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/Authentication/AuthContext";
import Swal from "sweetalert2";

const Header = () => {
    const { user, Logout, loading, LoginUser, dbUser } = use(AuthContext)
    // console.log(dbUser.role);
    const navigate = useNavigate()
    // console.log(user);
    const handelogin = (e) => {
        e.preventDefault();
        // console.log("this has been clicked");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        LoginUser(email, password)
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 2000,
                    showConfirmButton: false
                });

                form.reset();
                navigate('/');
            })
            .catch((error) => {
                document.getElementById("my_modal_3").close();
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message
                });
            });


    }
    const handelLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout"
        }).then((result) => {
            if (result.isConfirmed) {
                Logout()
                Swal.fire({
                    title: "Logout!",
                    text: "Your have been LoggedOut.",
                    icon: "success"
                });
            }
        })

    }
    return (
        <header className="sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">

                {/* LEFT */}
                <div className="flex-1">
                    {/* Mobile menu */}
                    {
                        user ? <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                            >
                                <li><Link to="/cart">cart</Link></li>
                                <li><Link to="/orderlist">Orders</Link></li>
                            </ul>
                        </div> : <></>
                    }


                    {/* Logo */}

                    <Link to="/" className="btn btn-ghost text-2xl font-bold">
                        Shopping Mall
                    </Link>
                </div>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    loading ? <span className="loading loading-bars loading-xl"></span> : <img
                                        alt="User avatar"
                                        src={user.photoURL}
                                    />
                                }
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {dbUser?.role === "superuser" && (
                                <li>
                                    <Link to="/superuser">Promote to Admin</Link>
                                </li>
                            )}

                            {dbUser?.role === "admin" && (
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                            )}
                            {dbUser?.role === "customer" && (
                                <ul>
                                    <li><Link to="/cart">Cart</Link></li>
                                    <li><Link to="/orderlist">Orders</Link></li>
                                </ul>
                            )}

                            <li><button onClick={handelLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <>
                        {
                            loading ? <span className="loading loading-ring loading-xl"></span> : <button
                                className="btn btn-lg btn-primary"
                                onClick={() => document.getElementById("my_modal_3").showModal()}
                            >
                                Login
                            </button>
                        }

                        <dialog id="my_modal_3" className="modal modal-middle">
                            <div className="modal-box max-w-md">
                                {/* Close button */}
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>

                                {/* Title */}
                                <h3 className="font-bold text-2xl text-center mb-6">Welcome Back 👋</h3>

                                {/* Login form */}
                                <form onSubmit={handelogin} className="space-y-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="input input-bordered w-full"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="input input-bordered w-full"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full mt-2">
                                        Login
                                    </button>
                                </form>

                                {/* Register link */}
                                <p className="text-center text-sm mt-6">
                                    Don’t have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="link link-primary font-medium cursor-pointer"
                                        onClick={() => document.getElementById("my_modal_3").close()}
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>
                        </dialog>
                    </>
                )}


            </div>

        </header >
    );
};

export default Header;