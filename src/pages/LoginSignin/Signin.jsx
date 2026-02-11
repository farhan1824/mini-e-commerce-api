import React, { use } from "react";
import Lottie from "lottie-react";
import registrationAnimation from "../../assets/form registration.json";
import { AuthContext } from "../../Firebase/Authentication/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Signin = () => {
    const { createUser, DisplayUser } = use(AuthContext)
    const nav = useNavigate();
    const handelRegistration = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;

        try {
            const result = await createUser(email, password);

            await DisplayUser(result.user, name, photoUrl);

            const registrationData = { email, name, photoUrl };
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registrationData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to add user");
            }

            Swal.fire({
                title: "Registered Successfully 🎉",
                text: "Your account has been created",
                icon: "success",
                confirmButtonText: "Continue",
            }).then(() => nav("/"));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">

                {/* Lottie animation */}
                <div className="w-full h-full md:w-1/2 hidden md:flex justify-center">
                    <Lottie
                        animationData={registrationAnimation}
                        loop
                        className="max-w-sm"
                    />
                </div>

                {/* Registration form */}
                <div className="w-full md:w-1/2">
                    <form onSubmit={handelRegistration}>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6 shadow-lg">
                            <legend className="fieldset-legend text-lg">Register</legend>

                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full"
                                placeholder="Full name"
                                required
                            />

                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                placeholder="Email address"
                                required
                            />
                            <label className="label">Photo Url</label>
                            <input
                                type="text"
                                name="photoUrl"
                                className="input input-bordered w-full"
                                placeholder="Place your photo Info"
                                required
                            />

                            <label className="label">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="input input-bordered w-full"
                                placeholder="City, Country"
                                required
                            />

                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input input-bordered w-full"
                                placeholder="Create a password"
                                required
                            />

                            <button type="submit" className="btn btn-primary mt-6 w-full">
                                Register
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Signin;