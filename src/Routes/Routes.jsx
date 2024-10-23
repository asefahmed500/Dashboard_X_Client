import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root/Root";
import Home from "../Layout/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Login from "../component/Login/Login";
import SignUp from "../component/SignUp/SignUp";
import DashboardHome from "../component/Dashboard/DashboardHome/DashboardHome";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AdminHome from "../component/Dashboard/Admin/AdminHome/AdminHome";
import ManageUser from "../component/Dashboard/Admin/ManageUser/ManageUser";
import AddTask from "../component/Dashboard/Admin/AddTask/AddTask";
import ManageTask from "../component/Dashboard/Admin/ManageTask/ManageTask";
import UpdateTask from "../component/Dashboard/Admin/UpdateTask/UpdateTask";
import ViewTask from "../component/Dashboard/ViewTask/ViewTask";
import ManagePayments from "../component/Dashboard/Admin/ManagePayments/ManagePayments";
import PaymentWrapper from "../component/Dashboard/Admin/PaymentWrapper/PaymentWrapper";
import ViewPaymentHistory from "../component/Dashboard/Admin/ViewPayemntHistory/ViewPayemntHistory";
import ViewSalary from "../component/Dashboard/ViewSalary/ViewSalary";
import Message from "../component/Dashboard/Message/Message";
import About from "../component/About/About";
import Services from "../component/Services/Services";
import Contact from "../component/Contact/Contact";
import ForgotPassword from "../component/ForgotPassword/ForgotPassword";
import AdminRoutes from "../component/AdminRoutes/AdminRoutes";
import GuardHome from "../component/GuardHome/GuardHome";
import StaffHome from "../component/Dashboard/StaffHome/StaffHome";
import UserHome from "../component/Dashboard/UserHome/UserHome";
import ViewTaskHistory from "../component/Dashboard/Admin/ViewTaskHistory/ViewTaskHistory";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgetpassword",
        element: <ForgotPassword></ForgotPassword>

      },
      {
        path: "about",
        element: <About></About>

      },
      {
        path: "services",
        element: <Services></Services>

      },
      {
        path: "contact",
        element: <Contact></Contact>

      },
      {
        path: "dashboardhomedefault", // Make it independent of dashboard
        element: <PrivateRoutes><DashboardHome /></PrivateRoutes>,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
    children: [
      // Admin Routes
      {
        path: "adminhome",
        element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>

      },
      {
        path: "manageuser",
        element: <AdminRoutes><ManageUser></ManageUser></AdminRoutes>
      },
      {
        path: "addtask",
        element: <AdminRoutes><AddTask></AddTask></AdminRoutes>
      },
      {
        path: "managetask",
        element: <AdminRoutes><ManageTask></ManageTask></AdminRoutes>
      },
      {
        path  :"viewtaskhistory",
        element : <ViewTaskHistory></ViewTaskHistory>

      },
      {
        path: "updatetask/:id",
        element: <AdminRoutes><UpdateTask /></AdminRoutes>,
        loader: async ({ params }) => {
          const { id } = params;
          console.log('Fetching task with ID:', id);

          const token = localStorage.getItem('access-token'); // Or wherever you store your token
          const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
              'Content-Type': 'application/json',
            },
          });

          console.log('Fetch response:', response);

          if (!response.ok) {
            const errorMessage = await response.text(); // Read the error message
            console.error('Fetch error:', errorMessage);
            throw new Error('Network response was not ok: ' + errorMessage);
          }

          const data = await response.json();
          return data;
        }
      },
      {
        path: "viewtask",
        element: <ViewTask></ViewTask>

      },
      {
        path: "viewsalary",
        element: <ViewSalary></ViewSalary>

      },
      {
        path: "managepayment",
        element: <AdminRoutes><ManagePayments></ManagePayments></AdminRoutes>
      },
      {
        path: "payment-checkout",
        element: <PaymentWrapper />
      },
      {
        path: "viewpayemnthistory",
        element: <AdminRoutes><ViewPaymentHistory></ViewPaymentHistory></AdminRoutes>
      },
      {
        path: "message",
        element: <Message></Message>
      },
      {
        path: "guardhome",
        element : <GuardHome></GuardHome>


      },
      {
        path : "staffhome",
        element : <StaffHome></StaffHome>
      },
      {
        path : "userhome",
        element : <UserHome></UserHome>
      }






    ],
  },
]);
