import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; // Custom hook for secure Axios requests
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2'; // For SweetAlert popups
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ViewSalary = () => {
    const [payments, setPayments] = useState([]);   // State to hold fetched payment data
    const [loading, setLoading] = useState(false);  // State to handle loading state
    const [error, setError] = useState(null);       // State to handle errors
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()           // Custom Axios instance with JWT token
    const { user } = useAuth();       // Get the logged-in user's info (including email) from context

    // Fetch payment info automatically for the logged-in user
    useEffect(() => {
        if (user?.email) {
            const fetchPaymentInfo = async () => {
                setLoading(true);   // Start loading state
                setError(null);     // Reset any previous errors

                try {
                    const response = await axiosSecure.get(`/payment-info/${user.email}`);
                    setPayments(response.data); // Set received payment data to state
                } catch (err) {
                    setError(err.response?.data?.message || 'Error fetching payment information'); // Handle errors
                } finally {
                    setLoading(false);  // Stop loading state after request completion
                }
            };

            fetchPaymentInfo();  // Automatically fetch payment info for the logged-in user
        }
    }, [user, axiosSecure]);  // Run effect when the user or axiosSecure instance changes

    // Handle accept button click
    const handleAccept = async (paymentId) => {
        Swal.fire({
            title: 'Are you sure you want to accept this payment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send the accept status to the backend
                    await axiosPublic.post('/payments/accept', { paymentId, email: user.email });

                    // Optionally, update the frontend (e.g., remove the accepted payment)
                    setPayments(prevPayments => prevPayments.filter(payment => payment._id !== paymentId));

                    Swal.fire('Accepted!', 'You have accepted the payment.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Failed to accept the payment.', 'error');
                    console.error('Error accepting payment:', error);
                }
            }
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Your Salary</h1>

            {loading && <p className="text-center text-indigo-600">Loading...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}

            {!loading && payments.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Information:</h2>
                    <ul className="space-y-4">
                        {payments.map((payment) => (
                            <li key={payment._id} className="bg-white p-4 rounded-lg shadow-sm">
                                <p><strong>Amount:</strong> ${payment.amount}</p>
                                <p><strong>Status:</strong> {payment.status}</p>
                                <p><strong>Currency:</strong> {payment.currency}</p>
                                <p><strong>Paid On:</strong> {new Date(payment.created_at).toLocaleDateString()}</p>
                                <button
                                    onClick={() => handleAccept(payment._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                                >
                                    Accept
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewSalary;
