import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Services = () => {
    return (
        <div>
             <Helmet>
                <title>X | Services</title>
              
            </Helmet>
            <div className="flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Services</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                    {/* Free Plan */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Free Plan</h3>
                        <p className="text-gray-700 mb-6">
                            Get started with our Free plan, perfect for small teams and startups.
                        </p>
                        <ul className="list-none space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Basic task management</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>User management</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Email notifications</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Basic salary viewing</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2">✘</span>
                                <span className="line-through">Advanced reporting</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-gray-400 mr-2">✘</span>
                                <span className="line-through">Priority customer support</span>
                            </li>
                        </ul>
                        <Link to="/signup">
                            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                                Sign Up for Free
                            </button>

                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white shadow-lg rounded-lg p-6 border-4 border-yellow-400">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Premium Plan</h3>
                        <p className="text-gray-700 mb-6">
                            Unlock all features with our Premium plan, ideal for growing businesses.
                        </p>
                        <ul className="list-none space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>All Free plan features</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Advanced task tracking</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Real-time reporting and analytics</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Priority customer support</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Premium salary and payment features</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                <span>Dedicated account manager</span>
                            </li>
                        </ul>
                        <button className="mt-6 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">
                            Upgrade to Premium
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
