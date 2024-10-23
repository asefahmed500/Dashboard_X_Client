import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import { app } from "../../../../Firebase/firebase.config";

const storage = getStorage(app);

const UpdateTask = () => {
    const { _id, title, description, fileUrl } = useLoaderData();
    console.log('Task ID:', _id);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    console.log('Loader Data:', useLoaderData());
    console.log('Task ID:', _id);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('File URL:', fileUrl);


    // Pre-fill form with current task data
    useEffect(() => {
        reset({ title, description, file: null });
    }, [title, description, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        console.log('Updating Task:', data);
        console.log('Task ID before update:', _id); // Now this should log the correct ID

        let fileUrlToUpdate = fileUrl;

        // Handle file upload if a new file is selected
        if (data.file && data.file[0]) {
            const file = data.file[0];
            const storageRef = ref(storage, `tasks/${file.name}`);

            try {
                await uploadBytes(storageRef, file);
                fileUrlToUpdate = await getDownloadURL(storageRef);
            } catch (uploadError) {
                console.error('Error uploading file:', uploadError);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Upload File',
                    text: 'There was an error while uploading the new file.',
                    confirmButtonText: 'OK',
                });
                setLoading(false);
                return;
            }
        }

        // Prepare task data
        const taskData = {
            title: data.title,
            description: data.description,
            fileUrl: fileUrlToUpdate,
        };

        // Send updated task data to the server
        try {
            const response = await axiosSecure.patch(`/tasks/${_id}`, taskData); // Use _id here

            if (response.data.modifiedCount) {
                Swal.fire({
                    icon: 'success',
                    title: 'Task Updated!',
                    text: 'Your task has been updated successfully.',
                    confirmButtonText: 'OK',
                });
                navigate('/dashboard/addtask');
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes Detected',
                    text: 'Your task is already up to date.',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update Task',
                text: 'There was an error while updating the task.',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Update Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Task Title"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Task Description"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                {/* File Upload Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Upload File</label>
                    <input
                        {...register('file')}
                        type="file"
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Task'}
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
