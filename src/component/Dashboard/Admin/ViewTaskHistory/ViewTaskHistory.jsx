import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ViewTaskHistory = () => {
    const [task, settask] = useState([]);
    const [, setLoading] = useState(false);
    const [, setError] = useState(null);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchtaskhistory = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosSecure.get('/taskshistory');
                settask(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching Task history');
            } finally {
                setLoading(false);
            }
        };

        fetchtaskhistory();
    }, [axiosSecure]);
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Task History</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">ID</th>
                        <th className="border border-gray-200 px-4 py-2">Email</th>
                        <th className="border border-gray-200 px-4 py-2">Task ID</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {task.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No task history available
                            </td>
                        </tr>
                    ) : (
                        task.map(task => (
                            <tr key={task._id}>
                                <td className="border border-gray-200 px-4 py-2">{task._id}</td>
                                <td className="border border-gray-200 px-4 py-2">{task.email}</td>
                                <td className="border border-gray-200 px-4 py-2">{task.taskId}</td>
                                <td className="border border-gray-200 px-4 py-2">{task.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTaskHistory;