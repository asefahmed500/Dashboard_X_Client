import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import an icon from react-icons
import useAuth from "../../../Hooks/useAuth";
import { AiOutlineLogout } from "react-icons/ai";

const DashboardHome = () => {
    const [displayText, setDisplayText] = useState("");
    const { user, logout } = useAuth();
    const text = "Welcome to Dashboard X!";
    const navigate = useNavigate(); // useNavigate hook for navigation
    
    const handleLogout = () => {
        logout()
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval); // Cleanup interval
    }, []);

    // Navigate to dashboard
    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            {/* Top-right container for name and logout */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-lg font-semibold">{user?.displayName}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                        >
                            <AiOutlineLogout className="text-xl" />
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
            </div>

            {/* Animated Text */}
            <div className="overflow-hidden whitespace-nowrap relative mt-8">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-500 animate-scroll">
                    {displayText}
                </div>
            </div>

            {/* Button to Go to Dashboard */}
            <button
                onClick={goToDashboard}
                className="mt-8 flex items-center justify-center py-2 px-4 bg-gradient-to-r from-black to-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
                Go to Dashboard
                <FaArrowRight className="ml-2" />
            </button>
        </div>
    );
};

export default DashboardHome;
