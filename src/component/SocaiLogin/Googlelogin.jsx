import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Googlelogin = () => {
    const { googlesignin } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handlegooglesignin = () => {
        googlesignin()
            .then(result => {
                console.log(result.user);

                const userinfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }

                axiosPublic.post("/users", userinfo)
                    .then(res => {
                        console.log(res.data);
                        navigate("/dashboardhomedefault");
                    })
                    .catch(error => {
                        if (error.response?.status === 409) {
                            console.error("User already exists. Redirecting...");
                            navigate("/dashboardhomedefault"); // You can navigate to the dashboard if the user exists
                        } else {
                            console.error("error", error);
                        }
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="my-3">
            <div className="divider">OR</div>
            <button
                onClick={handlegooglesignin}
                className="w-full py-4 px-4 flex items-center justify-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
            >
                <FaGoogle className="mr-2" />
                Google
            </button>
        </div>
    );
};

export default Googlelogin;
