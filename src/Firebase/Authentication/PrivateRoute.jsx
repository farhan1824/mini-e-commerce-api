import { use } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    if (loading) {
        return <span className="loading loading-spinner loading-xl mx-autos"></span>;
    }
    if (!user) {
        return <Navigate state={location.pathname} to="/" />;
    }
    else {
        return children;
    }

};

export default PrivateRoute;
