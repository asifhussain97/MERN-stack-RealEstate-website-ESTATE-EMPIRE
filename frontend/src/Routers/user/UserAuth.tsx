import { useSelector } from "react-redux";

import { RootState } from "../../utils/redux/app/store";
import { useNavigate } from "react-router-dom";
type RouteProps={
 
  children: React.ReactNode; 
}
const UserAuth:React.FC<RouteProps>  = ({children}) => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();



  if(user.token)
    return children
  else
  navigate("/login");
};

export default UserAuth;