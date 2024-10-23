import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Googlelogin from "../SocaiLogin/Googlelogin";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { LoginUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {

        console.log(data);
        LoginUser(data.email, data.password) // You might want to pass "data.password" here instead of "data.user"
            .then(result => {
                const user = result.user;
                navigate("/dashboardhomedefault")
                console.log("user login", user);
            });
    };

    return (
        <div>
            <div className="flex justify-center items-center mt-20">
                {/* X Sign */}
                <div className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-500 font-bold text-9xl ">
                    X
                </div>

                {/* Signup Form */}
                <div className="card bg-base-100 w-full max-w-md p-6 shadow-2xl mx-auto rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

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
                                id="password1"
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
                            Log in
                        </Button>
                        <label className="label">
                            <Link to="/forgetpassword" className="label-text-alt link link-hover text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </label>

                        <div className=" text-center">
                            <p>New User ?</p>
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Sign Up
                            </Link>
                        </div>
                        <div className="flext  justify-evenly">
                            <Googlelogin></Googlelogin>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
