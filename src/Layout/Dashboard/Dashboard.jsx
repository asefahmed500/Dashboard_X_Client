import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaTasks, FaStripe, FaHistory } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useStaff from "../../Hooks/useStaff";
import useGuard from "../../Hooks/useGuard";
import { FaMessage, FaPeopleGroup, FaPerson } from "react-icons/fa6";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isStaff] = useStaff();
    const [isGuard] = useGuard();

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar state
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`sidebar bg-black text-white transition-transform duration-300 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-3xl uppercase">Dashboard X</h2>
                    <button onClick={toggleSidebar} className="text-white">
                        <FaTimes className="bg-white text-black" size={10} /> {/* Close Icon */}
                    </button>
                </div>
                <ul className="menu mt-2 p-2">
                    {/* Admin Links */}
                    {isAdmin && (
                        <li>
                            <NavLink to="/dashboard/adminhome" className="flex items-center">
                                <FaHome className="mr-2" /> Admin Home
                            </NavLink>
                            <NavLink to="/dashboard/manageuser" className="flex items-center">
                                <FaUser className="mr-2" /> Manage Users
                            </NavLink>
                            <NavLink to="/dashboard/addtask" className="flex items-center">
                                <FaTasks className="mr-2" /> Add Task
                            </NavLink>
                            <NavLink to="/dashboard/managetask" className="flex items-center">
                                <FaTasks className="mr-2" /> Manage Tasks
                            </NavLink>
                            <NavLink to="/dashboard/viewtaskhistory" className="flex items-center">
                                <FaStripe className="mr-2" /> View Task History
                            </NavLink>

                            <NavLink to="/dashboard/managepayment" className="flex items-center">
                                <FaStripe className="mr-2" /> Manage Payments
                            </NavLink>
                            <NavLink to="/dashboard/viewpayemnthistory" className="flex items-center">
                                <FaStripe className="mr-2" /> View Payemnt History
                            </NavLink>
                            <NavLink to="/dashboard/viewsalary" className="flex items-center">
                                <FaHistory className="mr-2" /> View Salary
                            </NavLink>
                            <NavLink to="/dashboard/message" className="flex items-center">
                                <FaMessage className="mr-2" /> Message
                            </NavLink>
                            <NavLink to="/dashboard/addstaff" className="flex items-center">
                                <FaPeopleGroup className="mr-2" /> Add Staff
                            </NavLink>
                            <NavLink to="/dashboard/addguard" className="flex items-center">
                                <FaPerson className="mr-2" /> Add Guard
                            </NavLink>
                        </li>
                    )}

                    {/* Staff Links */}
                    {isStaff && (
                        <li>
                            <NavLink to="/dashboard/staffhome" className="flex items-center">
                                <FaHome className="mr-2" /> Staff Home
                            </NavLink>
                            <NavLink to="/dashboard/viewtask" className="flex items-center">
                                <FaTasks className="mr-2" /> View Task
                            </NavLink>
                            <NavLink to="/dashboard/viewsalary" className="flex items-center">
                                <FaHistory className="mr-2" /> View Salary
                            </NavLink>
                            <NavLink to="/dashboard/message" className="flex items-center">
                                <FaMessage className="mr-2" /> Message
                            </NavLink>
                        </li>
                    )}

                    {/* Guard Links */}
                    {isGuard && (
                        <li>
                            <NavLink to="/dashboard/guardhome" className="flex items-center">
                                <FaHome className="mr-2" /> Guard Home
                            </NavLink>
                            <NavLink to="/dashboard/viewtask" className="flex items-center">
                                <FaTasks className="mr-2" /> View Tasks
                            </NavLink>
                            <NavLink to="/dashboard/attendance" className="flex items-center">
                                <FaTasks className="mr-2" /> Entry/Exit Record
                            </NavLink>
                            <NavLink to="/dashboard/viewsalary" className="flex items-center">
                                <FaHistory className="mr-2" /> View Salary
                            </NavLink>
                            <NavLink to="/dashboard/message" className="flex items-center">
                                <FaMessage className="mr-2" /> Message
                            </NavLink>
                        </li>
                    )}

                    {/* Default User Links */}
                    {!isAdmin && !isStaff && !isGuard && (
                        <li>
                            <NavLink to="/dashboard/userhome" className="flex items-center">
                                <FaHome className="mr-2" /> Employee Home
                            </NavLink>
                            <NavLink to="/dashboard/viewsalary" className="flex items-center">
                                <FaHistory className="mr-2" /> View Salary
                            </NavLink>
                            <NavLink to="/dashboard/viewtask" className="flex items-center">
                                <FaTasks className="mr-2" /> View Tasks
                            </NavLink>
                        </li>
                    )}

                    <div className="divider"></div>
                    {/* Shared links */}
                    <li>
                        <NavLink to="/dashboardhomedefault" className="flex items-center">
                            <FaHome className="mr-2" /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4">
                <button onClick={toggleSidebar} className="mt-3" >
                    <FaBars className="w-5 h-4 bg-black text-white" size={10} /> {/* Open Icon */}
                </button>

                <div>
                    <Outlet /> {/* Dynamic content will render here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
