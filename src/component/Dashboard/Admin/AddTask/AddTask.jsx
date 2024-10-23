import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
 // Adjust the import path as needed
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { app } from '../../../../Firebase/firebase.config';



const storage = getStorage(app);

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        setLoading(true);
        console.log('Submitting Task:', data);

        const file = data.file[0]; // Get the uploaded file
        const storageRef = ref(storage, `tasks/${file.name}`);

        try {
            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, file);
            const fileUrl = await getDownloadURL(storageRef); // Get the file URL

            // Prepare task data
            const taskData = {
                title: data.title,
                description: data.description,
                fileUrl: fileUrl,
            };

            // Send task data to the server
            const response = await axiosSecure.post('/tasks', taskData);

            if (response.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Task Added!',
                    text: 'Your task has been added successfully.',
                    confirmButtonText: 'OK',
                });
                reset();
            }
        } catch (error) {
            console.error('Error adding task:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Task',
                text: 'There was an error while adding the task.',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Task Description"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Upload File</label>
                    <input
                        {...register('file', { required: 'File is required' })}
                        type="file"
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.file && <p className="text-red-500">{errors.file.message}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
