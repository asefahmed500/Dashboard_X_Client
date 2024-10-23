import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL : "https://dashboard-x-server.onrender.com"
    })
    return axiosPublic;
};

export default useAxiosPublic;