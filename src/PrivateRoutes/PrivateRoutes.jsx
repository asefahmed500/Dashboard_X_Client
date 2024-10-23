import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoutes = ({children}) => {
    const {user , loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-56"></progress>

    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}}></Navigate>
};

export default PrivateRoutes;