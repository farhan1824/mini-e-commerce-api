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

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout user
    const Logout = () => {
        setLoading(true);
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
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
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};