import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "../../utils/redux/app/store";
import { useNavigate } from "react-router-dom";
type RouteProps={
 
  children: React.ReactNode; 
}
const AdminAuth:React.FC<RouteProps> = ({children}) => {
  const admin = useSelector((state: RootState) => state.admin);

  const navigate = useNavigate();
  useEffect(() => {

  }, []);

if(admin.adminToken)
  return children
else
navigate("/adminlogin");
};

export default AdminAuth;