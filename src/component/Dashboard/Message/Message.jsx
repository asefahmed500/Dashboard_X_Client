import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { getToken, messaging, onMessage } from '../../../Firebase/firebase.config';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Import SweetAlert
const vapidKey = import.meta.env.VITE_VAPID_KEY;

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]); // List of users
    const [recipient, setRecipient] = useState(''); // Selected recipient
    const { register, handleSubmit, reset, setValue } = useForm(); // useForm with setValue
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Authenticated user

    // Function to send a new message
    const onSubmit = async (data) => {
        const newMessage = {
            sender: user.email,
            recipient,
            content: data.content,
            timestamp: new Date(),
        };

        try {
            await axiosPublic.post('/messages', newMessage);
            reset(); // Clear the form
            setRecipient(recipient); // Keep the current recipient selected

            // Optimistic UI update: Show the new message immediately for both sender and recipient
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/users');
                setUsers(response.data); // Fetch the list of users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    // Fetch messages between the logged-in user and the selected recipient
    useEffect(() => {
        const fetchMessages = async () => {
            if (!recipient) return; // Only fetch messages if a recipient is selected
            try {
                const response = await axiosPublic.get(`/messages?user1=${user.email}&user2=${recipient}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [user.email, recipient, axiosPublic]);

    // Firebase Messaging: Listening for new incoming messages
    useEffect(() => {
        getToken(messaging, { vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    console.log('Token received: ', currentToken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            })
            .catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Message received: ', payload);
            const messageSender = payload.notification.title || 'Unknown';
            const messageContent = payload.notification.body || 'No content';

            // Show SweetAlert popup
            Swal.fire({
                title: `New message from ${messageSender}`,
                text: messageContent,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Reply',
                cancelButtonText: 'Ignore',
            }).then((result) => {
                if (result.isConfirmed) {
                    setRecipient(messageSender); // Automatically set the recipient to reply
                    setValue('content', `Replying to: ${messageContent}`); // Optionally prefill the message input
                }
            });

            // Add the new message to the message list
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: messageSender,
                    recipient: user.email,
                    content: messageContent,
                    timestamp: new Date(),
                },
            ]);
        });

        return () => {
            unsubscribe();
        };
    }, [user.email, setValue]);

    // Poll for new messages every 5 seconds (fallback for real-time updates)
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (recipient) {
                const fetchMessages = async () => {
                    try {
                        const response = await axiosPublic.get(`/messages?user1=${user.email}&user2=${recipient}`);
                        setMessages(response.data); // Update messages with the latest data
                    } catch (error) {
                        console.error('Error fetching messages:', error);
                    }
                };
                fetchMessages();
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [user.email, recipient, axiosPublic]);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>

            {/* Select a recipient */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    required
                >
                    <option value="" disabled>
                        Select a recipient
                    </option>
                    {users.map((usr) => (
                        <option key={usr.email} value={usr.email}>
                            {usr.email}
                        </option>
                    ))}
                </select>

                {/* Message input */}
                <textarea
                    {...register('content')}
                    placeholder="Type your message"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Send
                </button>
            </form>

            {/* Chat window showing messages between the user and the selected recipient */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Chat with {recipient || 'Select a recipient'}</h2>
                <div className="border-t border-gray-300 pt-2">
                    {messages.length === 0 ? (
                        <p className="text-gray-500">No messages yet</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className="mb-2 p-2 border-b border-gray-200">
                                <strong className={msg.sender === user.email ? 'text-blue-600' : 'text-green-600'}>
                                    {msg.sender === user.email ? 'You' : msg.sender}
                                </strong>
                                : <span>{msg.content}</span>
                                <div className="text-gray-500 text-sm">{new Date(msg.timestamp).toLocaleString()}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
