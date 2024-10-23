import { useEffect, useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth'; // Import useAuth to get the user email

const ViewTask = () => {
    const [sentTasks, setSentTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic(); // Axios public for posting task status
    const { user } = useAuth(); // Get the authenticated user's info (including email)
    const [pendingTaskCount, setPendingTaskCount] = useState(0);

    useEffect(() => {
        const fetchSentTasks = async () => {
            try {
                const response = await axiosSecure.get('/sent-tasks');
                const tasks = response.data;

                // Filter out tasks that have been marked as 'done'
                const activeTasks = tasks.filter(task => task.status !== 'done');
                setSentTasks(activeTasks);
                setPendingTaskCount(activeTasks.length); // Update the count of pending tasks
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching sent tasks:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch Sent Tasks',
                    text: 'There was an error while fetching sent tasks.',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchSentTasks();
    }, [axiosSecure]);

    const handleTaskStatusChange = async (taskId, status) => {
        // Show confirmation popup
        Swal.fire({
            title: `Are you sure you want to mark this task as "${status}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send the status update to the backend using the user's email
                    await axiosPublic.post('/tasks/status', { taskId, status, email: user.email });
                    
                    // Remove the task from the frontend immediately
                    setSentTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

                    // Update pending task count
                    setPendingTaskCount(prevCount => prevCount - 1);

                    Swal.fire({
                        icon: 'success',
                        title: `Task marked as ${status}`,
                        confirmButtonText: 'OK',
                    });
                } catch (error) {
                    console.error('Error updating task status:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Update Task Status',
                        text: 'There was an error while updating the task status.',
                        confirmButtonText: 'OK',
                    });
                }
            }
        });
    };

    const handleDownload = (fileUrl) => {
        const link = document.createElement('a');
        link.href = fileUrl; // URL to download the file
        link.setAttribute('download', 'task-file'); // Optional: Set a file name for download
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-4">View Tasks</h1>
            <h2 className="text-lg mb-4">Pending Tasks: {pendingTaskCount}</h2> {/* Display pending task count */}
            {isLoading ? (
                <div>Loading sent tasks...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sentTasks.length === 0 ? (
                        <div>No sent tasks available</div>
                    ) : (
                        sentTasks.map((sentTask) => (
                            <div key={sentTask._id} className="bg-white shadow-md rounded-md p-4">
                                <h2 className="text-xl font-bold mb-2">{sentTask.task.title}</h2>
                                <p className="text-gray-700 mb-4">{sentTask.task.description}</p>
                                <a 
                                    href={sentTask.task.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 underline mb-2 block"
                                >
                                    View File
                                </a>
                                <button
                                    onClick={() => handleDownload(sentTask.task.fileUrl)} // Call handleDownload
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                                >
                                    <FaFileDownload className="mr-2" /> Download File
                                </button>
                                <div className="flex mt-4">
                                    <button
                                        onClick={() => handleTaskStatusChange(sentTask._id, 'done')} // Pass only taskId and status
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Done
                                    </button>
                                    <button
                                        onClick={() => handleTaskStatusChange(sentTask._id, 'not done')} // Pass only taskId and status
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Not Done Yet
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewTask;
