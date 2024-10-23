import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const ManagePayments = () => {
    const [users, setUsers] = useState([]);
    const [manualSalaries, setManualSalaries] = useState({}); // State for manual salaries
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`
                    }
                });
                setUsers(response.data); // Ensure response.data includes email
                console.log('Fetched users:', response.data); // Log fetched users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    const handleGiveSalary = (user) => {
        const manualSalary = manualSalaries[user._id] || 0; // Get the salary from the state
        console.log('Giving salary to user:', { ...user, manualSalary }); // Log user details
        navigate('/dashboard/payment-checkout', {
            state: {
                userId: user._id,
                name: user.name,
                role: user.role || 'Employee',
                salary: manualSalary, // Use the manually entered salary
                email: user.email, // Include email in the state
            }
        });
    };

    const handleSalaryChange = (userId, value) => {
        const salaryValue = Math.max(0, value); // Ensure salary cannot be negative
        setManualSalaries(prevState => ({
            ...prevState,
            [userId]: salaryValue // Update the salary for the specific user
        }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Give Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role || 'Employee'}</td>
                            <td>
                                <input
                                    type="number"
                                    value={manualSalaries[user._id] || ''} // Controlled input for each user
                                    onChange={(e) => handleSalaryChange(user._id, e.target.value)}
                                    placeholder="Enter salary"
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <button
                                    className='btn btn-ghost border-t-neutral-700 bg-red-600'
                                    onClick={() => handleGiveSalary(user)}
                                    disabled={manualSalaries[user._id] <= 0} // Disable button if salary is not valid
                                >
                                    Give Salary
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePayments;
