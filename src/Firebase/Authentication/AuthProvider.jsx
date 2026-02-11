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
    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => {
                setLoading(false);
            });
    };

    // Logout user
    const Logout = () => {
        setLoading(true);
        setCartIds([])
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

            // fetch cart only when user exists
            if (currentUser) {
                try {
                    const dbres = await fetch(`http://localhost:3000/users/${currentUser.email}`);
                    const dbdata = await dbres.json();
                    // Store MongoDB _id
                    setDbUser(dbdata);
                    const res = await fetch("http://localhost:3000/cart");
                    const data = await res.json();

                    // store only product IDs
                    const ids = data.map(item => item.product._id);
                    setCartIds(ids);
                } catch (err) {
                    setDbUser(null);
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
        Logout,
        DisplayUser,
        setLoading,
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