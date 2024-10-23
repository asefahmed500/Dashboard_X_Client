import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Googlelogin from "../SocaiLogin/Googlelogin";
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const { SignUpUser, updateuserprofile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation(); // Added to fix the issue with accessing location
    const from = location.state?.from?.pathname || "/dashboardhomedefault";

    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const onSubmit = (data) => {
        setErrorMessage(''); // Clear any previous errors
        console.log(data);
        
        // Sign up the user
        SignUpUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("User sign-up successful", user);

                // Update the user profile with the name and photo URL
                updateuserprofile(data.name, data.photo)
                    .then(() => {
                        console.log("User profile has been updated");

                        // Prepare user info to send to backend
                        const userinfo = {
                            name: data.name,
                            email: data.email
                        };

                        // Send user info to the backend
                        axiosPublic.post('/users', userinfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("Sign-up successful in backend", userinfo);
                                    navigate(from, { replace: true }); // Navigate to dashboard or previous location
                                    reset(); // Reset form
                                } else {
                                    console.log("Sign-up failed in backend");
                                    setErrorMessage("Failed to store user information. Please try again.");
                                }
                            })
                            .catch(error => {
                                console.error("Error saving user information:", error);
                                setErrorMessage("Error occurred while storing user information.");
                            });
                    })
                    .catch(error => {
                        console.error("User profile update failed", error);
                        setErrorMessage("Profile update failed. Please try again.");
                    });
            })
            .catch(error => {
                console.error("Sign-up error", error);
                setErrorMessage("Sign-up failed. Please try again.");
            });
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-20">
                {/* X Sign */}
                <div className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-500 font-bold text-9xl">
                    X
                </div>

                {/* Signup Form */}
                <div className="card bg-base-100 w-full max-w-md p-6 shadow-2xl mx-auto rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        {errorMessage && (
                            <div className="text-red-500 mb-4 text-center">
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your name" className="text-gray-700" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                {...register("name")}
                                placeholder="Enter your name"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="photo" value="Your Photo" className="text-gray-700" />
                            </div>
                            <TextInput
                                id="photo"
                                type="text"
                                {...register("photo")}
                                placeholder="Enter your photo URL"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" className="text-gray-700" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" className="text-gray-700" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                {...register("password")}
                                placeholder="Enter your password"
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" className="rounded text-blue-500" />
                            <Label htmlFor="remember" className="text-gray-700">Remember me</Label>
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Sign up
                        </Button>

                        <div className="mt-2 text-center">
                            <p>Already Have An Account?</p>
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </div>
                        <div className="flex justify-evenly">
                            <Googlelogin />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
