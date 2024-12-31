import React, { useEffect } from "react";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/AgentAuthSlice";
import {  useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";

import LoginApi from "../../../../components/auth/login/LoginApi";

const AgentLogin: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.agent);
  
  useEffect(() => {
    if (user.agentToken) {
      navigate("/agent");
    }
  }, [user.agentToken, navigate]);
return (
  <div>
    <LoginApi role={'agent'} loginSuccess={loginSuccess}  style={{bg_color:'agent_div_1',button:"agent_button"}} path={"/agent"} signUpPath={'/agent/signup'} forgotPath={'/agent/forgotPassword'}  />
  </div>
);
};

export default AgentLogin;