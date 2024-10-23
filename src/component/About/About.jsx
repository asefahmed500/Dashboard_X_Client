/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const About = () => {
    return (
        <div>
            <Helmet>
                <title>X | About</title>
              
            </Helmet>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full text-center">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">Why Choose Dashboard X?</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Dashboard X is your all-in-one solution to streamline business operations. We offer an efficient,
                        user-friendly platform designed to manage tasks, payments, and communication for businesses of any
                        size. Let us handle the details, so you can focus on growing your company.
                    </p>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">What We Offer</h3>
                    <ul className="list-none text-left text-gray-700 space-y-3 mb-6">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✔</span>
                            <span>Comprehensive User Management – easily add, edit, and manage employees and roles</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✔</span>
                            <span>Real-Time Task Tracking – assign and monitor tasks effortlessly</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✔</span>
                            <span>Seamless Payment Integration – manage payroll and payments with Stripe</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✔</span>
                            <span>Advanced Security Features – role-based access control to protect sensitive information</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✔</span>
                            <span>Built-In Messaging – streamline communication between staff, guards, and admins</span>
                        </li>
                    </ul>
                    <p className="text-lg text-gray-700 mb-6">
                        Whether you're an admin overseeing operations, staff managing tasks, or guards keeping track of
                        attendance, Dashboard X makes the process seamless and easy. Let us be your partner in success.
                    </p>
                    <Link to="/">
                        <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200">
                            Get Started Today!
                        </button>

                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
