import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaDownload, FaTelegram, FaEdit, } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageTask = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks');
            return res.data;
        }
    });

    const handleDeleteTask = (task) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/tasks/${task._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch().then(() => {
                                    Swal.fire("Deleted!", "Task has been deleted.", "success");
                                });
                            } else {
                                Swal.fire("Error!", "Task could not be deleted.", "error");
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            Swal.fire("Error!", "There was a problem deleting the task.", "error");
                        });
                }
            });
    };
    const handleUpdateTask = (task) => {
        // Navigate to the UpdateTask component with the task ID
        navigate(`/dashboard/updatetask/${task._id}`);
    };
    const handleSendTask = async (task) => {
        const recipientEmail = prompt("Enter the recipient's email address:");
        if (!recipientEmail) return;
    
        try {
          const response = await axiosSecure.post('/send-task', {
            recipientEmail,
            taskId: task._id,
          });
    
          Swal.fire({
            icon: 'success',
            title: 'Task Sent!',
            text: response.data.message,
            confirmButtonText: 'OK',
          });
        } catch (error) {
          console.error('Error sending task:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Send Task',
            text: 'There was an error while sending the task.',
            confirmButtonText: 'OK',
          });
        }
      };




    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>File</th>
                            <th>Send</th>
                            <th>Download</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.fileUrl}</td>
                                <td>
                                    <button
                                        onClick={() => handleSendTask(task)}
                                        className="btn btn-ghost btn-sx ml-2"
                                    >
                                        <FaTelegram className="text-blue-500" />
                                    </button>
                                </td>


                                <td>
                                    {/* Updated anchor tag for downloading */}
                                    <a
                                        href={task.fileUrl} // This should be the Firebase Storage URL
                                    target="_blank" // Open in a new tab
                                        rel="noopener noreferrer" // Security measure
                                        className="btn btn-ghost btn-sx ml-2"
                                        download // This forces the download
                                    >
                                        <FaDownload className="text-blue-500" />
                                    </a>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateTask(task)}
                                        className="btn btn-ghost btn-sx ml-2"
                                    >
                                        <FaEdit className="text-blue-500" />
                                    </button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDeleteTask(task)}
                                        className="btn btn-ghost btn-sx ml-2"
                                    >
                                        <FaTrashAlt className="text-blue-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTask;
