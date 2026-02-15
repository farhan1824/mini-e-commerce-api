import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth } from "../Firebase.init";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartIds, setCartIds] = useState([]);
    const [dbUser, setDbUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user with Firebase
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => {
                setLoading(false);
            });
    };

    // Login user with JWT (for backend authentication)
    const loginWithJWT = (jwtToken, userData) => {
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setDbUser(userData);
        setLoading(false);
    };

    // Logout user
    const Logout = () => {
        setLoading(true);
        setCartIds([]);
        setToken(null);
        setDbUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return signOut(auth);
    };

    // Update display name & photo
    const DisplayUser = (currentUser, name, photoUrl) => {
        if (!currentUser) return Promise.reject("No user found");

        setLoading(true);
        return updateProfile(currentUser, {
            displayName: name,
            photoURL: photoUrl
        });
    };

    // Auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            // Check for stored JWT token
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken && storedUser) {
                setToken(storedToken);
                setDbUser(JSON.parse(storedUser));
            }

            // fetch cart only when user exists
            if (currentUser || storedToken) {
                try {
                    const dbres = await fetch(`http://localhost:3000/users/${currentUser?.email || JSON.parse(storedUser)?.email}`);
                    const dbdata = await dbres.json();
                    // Store MongoDB _id
                    setDbUser(dbdata);

                    const res = await fetch("http://localhost:3000/cart");
                    const data = await res.json();

                    // store only product IDs
                    const ids = data.map(item => item.product._id);
                    setCartIds(ids);
                } catch (err) {
                    console.error("Failed to fetch cart", err);
                }
            } else {
                setDbUser(null);
                setCartIds([]);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        LoginUser,
        loginWithJWT,
        Logout,
        DisplayUser,
        setLoading,
        token,
        setToken,
        cartIds,
        setCartIds,
        dbUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};