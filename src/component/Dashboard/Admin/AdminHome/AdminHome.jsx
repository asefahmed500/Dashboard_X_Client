import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUserRole from "../../../../Hooks/useUserRole";
import { useEffect, useState } from 'react';
import { FaUser, FaMoneyCheckAlt, FaTasks, FaCheckCircle, FaComment } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AdminHome = () => {
  const { user } = useAuth();
  const [role, roleLoading] = useUserRole();
  const [userStats, setUserStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);
  const [taskStats, setTaskStats] = useState([]);
  const [salaryAcceptance, setSalaryAcceptance] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosSecure.get('/admin/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setUserStats(data.userStats);
        setPaymentStats(data.paymentStats);
        setTaskStats(data.taskStats);
        setSalaryAcceptance(data.salaryAcceptance);
        setAdminMessages(data.adminMessages);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (roleLoading) {
    return <p>Loading role...</p>;
  }

  // Data for Pie Charts
  const userChartData = {
    labels: userStats.map(stat => stat._id),
    datasets: [{
      label: 'User Count',
      data: userStats.map(stat => stat.count),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)'
      ]
    }]
  };

  const paymentChartData = {
    labels: paymentStats.map(stat => stat._id),
    datasets: [{
      label: 'Payments',
      data: paymentStats.map(stat => stat.count),
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)',
        'rgba(201, 203, 207, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ]
    }]
  };

  const taskChartData = {
    labels: taskStats.map(stat => stat._id),
    datasets: [{
      label: 'Tasks',
      data: taskStats.map(stat => stat.count),
      backgroundColor: [
        'rgba(255, 205, 86, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  };

  const salaryChartData = {
    labels: ['Accepted', 'Not Accepted'],
    datasets: [{
      label: 'Salary Acceptance',
      data: [
        salaryAcceptance.find(stat => stat._id === true)?.count || 0,
        salaryAcceptance.find(stat => stat._id === false)?.count || 0,
      ],
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
    }]
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <span className="text-lg font-semibold ">{user?.displayName}</span>
        <p>Role: {role || "No role assigned"}</p>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Stats */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaUser /> User Stats
            </h3>
            <div style={{ width: '250px', height: '250px' }} className="mx-auto">
              <Pie data={userChartData} />
            </div>
          </div>

          {/* Payment Stats */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaMoneyCheckAlt /> Payment Stats
            </h3>
            <div style={{ width: '250px', height: '250px' }} className="mx-auto">
              <Pie data={paymentChartData} />
            </div>
          </div>

          {/* Task Stats */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaTasks /> Task Stats
            </h3>
            <div style={{ width: '250px', height: '250px' }} className="mx-auto">
              <Pie data={taskChartData} />
            </div>
          </div>

          {/* Salary Acceptance */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaCheckCircle /> Salary Acceptance
            </h3>
            <div style={{ width: '250px', height: '250px' }} className="mx-auto">
              <Pie data={salaryChartData} />
            </div>
          </div>

          {/* Admin Messages */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaComment /> Admin Messages
            </h3>
            <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow-inner">
              {adminMessages.map(message => (
                <li key={message._id}>{message.content}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
