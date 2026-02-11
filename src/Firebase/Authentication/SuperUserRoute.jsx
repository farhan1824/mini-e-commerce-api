import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const SuperUserRoute = ({ children }) => {
    const { user, loading, dbUser } = useContext(AuthContext);
    const location = useLocation();

    // wait until auth + db user loaded
    if (loading || !dbUser) {
        return <span className="loading loading-spinner loading-xl mx-auto"></span>;
    }

    // not logged in
    if (!user) {
        return <Navigate to="/" state={location.pathname} />;
    }

    // logged in but NOT superuser
    if (dbUser.role !== "superuser") {
        return <Navigate to="/" replace />;
    }

    // ✅ superuser allowed
    return children;
};

export default SuperUserRoute;