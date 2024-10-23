
import { Navigate } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useAuth from './../../Hooks/useAuth';

const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminloading] = useAdmin();

    console.log("User:", user);
    console.log("Loading:", loading);
    console.log("IsAdmin:", isAdmin);
    console.log("IsAdminLoading:", isAdminloading);

    if (loading || isAdminloading) {
        return <progress className="progress w-56"></progress>;
    }

    if(user && isAdmin) {
        return children
    }


    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoutes;