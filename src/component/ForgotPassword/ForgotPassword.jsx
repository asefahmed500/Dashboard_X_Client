import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import useToast from "../../Hooks/useToast";


const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { showToast } = useToast();
    const auth = getAuth();

    const onSubmit = (data) => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                showToast("Password reset email sent!");
            })
            .catch((error) => {
                showToast("Error sending password reset email", { type: "error" });
                console.error("Error:", error);
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 max-w-sm shadow-2xl p-6">
                <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered"
                        />
                        {errors.email && (
                            <p className="text-red-500">Email is required</p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Send Reset Email</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
