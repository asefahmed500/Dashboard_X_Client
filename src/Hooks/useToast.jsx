import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const showToast = (message, options = {}) => {
        toast(message, {
            position: "top-center",  // Changed to match your ToastContainer
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            ...options, // allow customization for specific toasts
        });
    };
    return { showToast };
};

export default useToast;
