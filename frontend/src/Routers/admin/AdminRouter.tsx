
import AdminAuth from "./AdminAth";
import AdminLogin from "../../Section/Admin/Login";
import AdminDashboard from "../../Section/Admin/Dashboard";
import Layout from "../../Section/Admin/Layout";
import UserManagement from "../../Section/Admin/UserManagement";
import PropertyType from "../../Section/Admin/PropertyType";

import Agent from "../../Section/Admin/Agent";

import ViewLocation from "../../Section/Admin/Agent/ViewLocation";

import NotFound from "../../components/NotFound/NotFound";




const AdminRouter = () => {


  return [
    {
      path: "/adminlogin",
      element: (
       
          <AdminLogin />
 
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/admin",
      element: (
        <AdminAuth>
          <Layout />
        </AdminAuth>
      ),
      children:[
        {
          path: "/admin",
          element: (
          
              <AdminDashboard />
          
          ),
        },
        {
          path: "usermanagment",
          element: (
         
              <UserManagement />
           
          ),
        },
        {
          path: "Propertytype",
          element: (
       
              <PropertyType />
          
          ),
        },








        {
          path: "Agent",
          element: (
          
              <Agent />
           
          ),
        },
        








        {
          path: "viewLocation",
          element: (
          
              <ViewLocation />
           
          ),
        },






        

      ]
    },
  ];
};

export default AdminRouter;