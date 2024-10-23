import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const GuardHome = () => {
  const { user } = useAuth();
  const [role, roleLoading] = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axiosSecure.get('/guard/stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(data.tasks);
      setTaskStats(data.taskStats);
      setPaymentStatus(data.paymentStatus);
      setMessages(data.messages);
    };
    fetchStats();
  }, [axiosSecure]);

  if (roleLoading) {
    return <p className="text-center mt-4">Loading role .....</p>;
  }

  // Pie Chart Data for Task Completion Status
  const taskCompletionData = {
    labels: ['Completed', 'Pending', 'Not Started'],
    datasets: [
      {
        data: [
          taskStats.find(stat => stat.status === 'Completed')?.count || 0,
          taskStats.find(stat => stat.status === 'Pending')?.count || 0,
          taskStats.find(stat => stat.status === 'Not Started')?.count || 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(255, 99, 132, 0.6)', // Red
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      {/* User Information */}
      <div className="text-center mb-4">
        <span className="text-xl font-semibold">{user?.displayName}</span>
        <p>Role: {role || "No role assigned"}</p>
      </div>

      {/* Guard Dashboard */}
      <div className="bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Guard Dashboard</h2>

        {/* Assigned Tasks */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Assigned Tasks</h3>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow-inner">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <li key={task._id} className="mb-2">
                  {task.title}
                </li>
              ))
            ) : (
              <p>No tasks assigned yet.</p>
            )}
          </ul>
        </div>

        {/* Task Completion Status (Pie Chart) */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Task Completion Status</h3>
          <div className="max-w-md mx-auto">
            <Pie data={taskCompletionData} />
          </div>
        </div>

        {/* Salary Acceptance Status */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Salary Acceptance Status
          </h3>
          <p className="bg-gray-50 p-4 rounded-md shadow-inner">
            {paymentStatus ? paymentStatus : "No payment status available."}
          </p>
        </div>

        {/* Messages */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Messages</h3>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow-inner">
            {messages.length > 0 ? (
              messages.map(message => (
                <li key={message._id} className="mb-2">
                  {message.content}
                </li>
              ))
            ) : (
              <p>No messages available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuardHome;
