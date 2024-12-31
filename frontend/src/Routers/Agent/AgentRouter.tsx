import AgentAuth from "./AgentAuth";
import AgentLogin from "../../Section/Agent/auth/login/AgentLogin";
import AgentSignup from "../../Section/Agent/auth/Signup/Signup";
import AgentForgot from "../../Section/Agent/auth/forgot/Forgot";
import AgentReset from "../../Section/Agent/auth/Reset/AgentReset";
import AgentOtp from "../../Section/Agent/auth/Otp/AgentOtp";
import Layout from "../../Section/Agent/Layout";
import Dashboard from "../../Section/Agent/Dashboard/Dashboard";
import Location from "../../Section/Agent/Location/Location";
import AddLocation from "../../Section/Agent/Location/AddLocation";


import EditLocation from "../../Section/Agent/Location/EditLocation";
import ViewLocation from "../../Section/Agent/Location/ViewLocation";
import AgentSettings from "../../Section/Agent/Settings";
import UserbookingHistory from "../../Section/Agent/UserbookingHistory";
import UserBookingDetails from "../../Section/Agent/UserbookingHistory/UserBookingDetails";

import Offer from "../../Section/Agent/Offer";
import NotFound from "../../components/NotFound/NotFound";

import Wallet from "../../Section/Agent/Wallet";



const AgentRouter = () => {
  return [
    {
      path: "/agent/login",
      element: (
        <>
          <AgentLogin />
        </>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/agent/signup",
      element: <AgentSignup />,
    },
    {
      path: "/agent/forgotPassword",
      element: <AgentForgot />,
    },
    {
      path: "/agent/reset",
      element: <AgentReset />,
    },
    {
      path: "/agent/otp",
      element: <AgentOtp />,
    },
    {
      path: "/agent",
      element: (
        <AgentAuth>
          <Layout />
        </AgentAuth>
      ),
      children: [
        {
          path: "/agent",
          element: <Dashboard />,
        },
        {
          path: "location",
          element: <Location />,
        },
        {
          path: "addlocation",
          element: <AddLocation />,
        },
        {
          path: "editlocation",
          element: <EditLocation />,
        },
        {
          path: "viewlocation",
          element: <ViewLocation />,
        },




        {
          path: "settings",
          element: <AgentSettings />,
        },
        



        {
          path: "UserbookingHistory",
          element: <UserbookingHistory />,
        },
        {
          path: "UserBookingDetails",
          element: <UserBookingDetails />,
        },
       



        {
          path: "offer",
          element: <Offer />,
        },

      

        {
          path: "wallet",
          element:( <Wallet/>),  
        
        },
        









   
      ],
    },
  ];
};

export default AgentRouter;