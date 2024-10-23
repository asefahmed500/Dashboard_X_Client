import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useGuard = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    console.log('User:', user, 'Loading:', loading);

    const { data: isGuard, isPending: isGuardLoading } = useQuery({
        queryKey: [user?.email, 'isGuard'],
        enabled: !loading && !!user?.email, // Runs when user is not loading and email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/guard/${user.email}`);
            console.log('Response:', res.data); // Log the response
            return res.data?.guard;
        },
        onError: (error) => {
            console.error('Error fetching guard role:', error); // Log any errors
        }
    });

    return [isGuard, isGuardLoading];
};

export default useGuard;
