import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Handle making user an Admin
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error making user an Admin",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle making user a Staff
    const handleMakeStaff = (user) => {
        axiosSecure.patch(`/users/staff/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Staff`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error making user a Staff",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle making user a Guard
    const handleMakeGuard = (user) => {
        axiosSecure.patch(`/users/guard/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Guard`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error making user a Guard",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    // Handle user deletion
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire("Error!", "There was a problem deleting the user.", "error");
                    });
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Staff</th>
                            <th>Make Guard</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role || 'Employee'}</td>
                                    <td>
                                        {
                                            (!user.role || user.role !== 'admin') && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn bg-gray-400">
                                                    Make Admin
                                                </button>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            (!user.role || user.role !== 'staff') && (
                                                <button
                                                    onClick={() => handleMakeStaff(user)}
                                                    className="btn bg-gray-400">
                                                    Make Staff
                                                </button>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            (!user.role || user.role !== 'guard') && (
                                                <button
                                                    onClick={() => handleMakeGuard(user)}
                                                    className="btn bg-gray-400">
                                                    Make Guard
                                                </button>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-xs ml-2">
                                            <FaTrashAlt className="text-red-600 text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
