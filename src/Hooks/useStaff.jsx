import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useStaff = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isStaff, isPending: isStaffloading } = useQuery({
        queryKey: [user?.email, 'isStaff'],
        enabled: !loading && !!user?.email, // Runs when user is not loading and email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/staff/${user.email}`);
            return res.data?.staff;
        }
    });

    return [isStaff, isStaffloading];
};

export default useStaff;