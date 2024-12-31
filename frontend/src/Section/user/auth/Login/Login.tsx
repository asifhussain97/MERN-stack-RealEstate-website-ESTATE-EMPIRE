import React, { useEffect } from "react";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/UserAuthSlice";
import {  useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import LoginApi from "../../../../components/auth/login/LoginApi";

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user.token, navigate]);
return (
  <div>
    <LoginApi role={'user'} loginSuccess={loginSuccess} style={{bg_color:'authentication_div_1',button:"authentication_button"}} path={"/"} forgotPath={'/forgotPassword'} signUpPath="/signup"  />
  </div>
);
};

export default Login;