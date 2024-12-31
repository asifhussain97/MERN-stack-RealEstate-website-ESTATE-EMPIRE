import Dashboard from "../../Section/user/Dashboard";
import Otp from "../../Section/user/auth/Otp";
import Settings from "../../Section/user/Settings";
import Signup from "../../Section/user/auth/Signup/Signup";
import Login from "../../Section/user/auth/Login/Login";
import Reset from "../../Section/user/auth/Reset";
import UserAuth from "./UserAuth";
import Navbar from "../../Section/user/Partials/Navbar";
import Details from "../../Section/user/Location/Details";
import Location from "../../Section/user/Location/Location";
import Forgot from "../../Section/user/auth/forgot/Forgot";
import Booking from "../../Section/user/Booking";
import Payment from "../../Section/user/Booking/Payment";
import BookingHistory from "../../Section/user/Booking/BookingHistory";
import BookingDeatails from "../../Section/user/Booking/BookingDeatails";
import Wallet from "../../Section/user/Wallet";
import NotFound from "../../components/NotFound/NotFound";



const UserRouters = () => {
  return [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/reset",
      element: <Reset />,
    },
    {
      path: "/forgotPassword",
      element: <Forgot />,
    },
    {
      path: "*",
      element: <NotFound />,
    },

    {
      path: "/",
      element: (
    
          <Navbar />
       
      ),
      children: [
        {
          path: "",
          element: <Dashboard />, 
        },
        {
          path: "",
          element:(   <UserAuth><Dashboard /></UserAuth>),  
        },
        {
          path: "settings",
          element:(   <UserAuth><Settings /></UserAuth>),  
         
        },
        {
          path: "location",
          element:(   <Location />),  
        
        },
        {
          path: "details",
          element:(   <UserAuth><Details /></UserAuth>),  
        
        },
        {
          path: "booking",
          element:(   <UserAuth><Booking /></UserAuth>),  
        
        },
        {
          path: "payment",
          element:(   <UserAuth><Payment /></UserAuth>),  
        
        },

        {
          path: "bookingHistory",
          element:(   <UserAuth><BookingHistory /></UserAuth>),  
        
        },
        
        
        
      


        {
          path: "bookingDetails",
          element:(   <UserAuth><BookingDeatails /></UserAuth>),  
        
        },

        // {
        //   path: "wallet",
        //   element:(   <UserAuth><Wallet /></UserAuth>),  
        
        // },




      ],
    },
  ];
};

export default UserRouters;