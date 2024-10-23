import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
   

})


const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Response interceptor to handle 401 and 403 errors
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    });




    return axiosSecure;
};

export default useAxiosSecure;