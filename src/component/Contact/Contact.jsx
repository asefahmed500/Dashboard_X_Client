import { useState } from 'react';
import useToast from '../../Hooks/useToast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the backend using axiosPublic
            const response = await axiosPublic.post('/contact', formData);
            if (response.status === 200) {
                showToast('Your message has been sent!');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                showToast('Something went wrong, please try again.', 'error');
            }
        } catch (error) {
            console.error('Error sending contact message:', error);
            showToast('Error sending message. Please try again.', 'error');
        }
    };

    return (
        <div>

            <Helmet>
                <title>X | Contact</title>
              
            </Helmet>
            <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message here"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
