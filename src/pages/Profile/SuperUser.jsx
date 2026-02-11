import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/Authentication/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SuperUser = () => {
    // const { loading, setLoading } = use(AuthContext)
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/users");
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [setLoading]);

    // Promote handler
    const handlePromote = async (userId) => {
        try {
            const res = await fetch(`http://localhost:3000/users/promote/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: "admin" }),
            });

            if (!res.ok) {
                throw new Error("Failed to promote user");
            }

            // Update UI instantly
            setUsers(prev =>
                prev.map(user =>
                    user._id === userId ? { ...user, role: "admin" } : user
                )
            );

            Swal.fire({
                icon: "success",
                title: "User promoted to Admin",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/")
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Promotion failed",
                text: error.message,
            });
        }
    };

    // Filter users
    const filteredUsers = users
        .filter(user => user.role !== "superuser")
        .filter(user =>
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
        );

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">SuperUser Dashboard</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="input input-bordered w-full max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={user.photoUrl || "https://i.ibb.co/2kR5zq0/user.png"}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="font-medium">{user.name}</span>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="badge badge-outline">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {user.role !== "admin" && (
                                            <button
                                                onClick={() => handlePromote(user._id)}
                                                className="btn btn-xs btn-primary"
                                            >
                                                Promote to Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperUser;