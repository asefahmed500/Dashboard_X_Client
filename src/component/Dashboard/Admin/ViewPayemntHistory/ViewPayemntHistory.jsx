import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure'; // Assuming you have this hook for Axios requests

const ViewPaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosSecure.get('/payment-history');
                setPayments(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching payment history');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [axiosSecure]);

    return (
        <div>
            <h2>Payment History</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {payments.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>{payment.name}</td>
                                <td>${payment.amount}</td>
                                <td>{payment.currency}</td>
                                <td>{payment.status}</td>
                                <td>{new Date(payment.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payment history available.</p>
            )}
        </div>
    );
};

export default ViewPaymentHistory;
