import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import ResetPasswordApi from "../../../../components/auth/reset/ResetPasswordApi";
const AgentReset: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.agent);
  useEffect(() => {
    if (user.agentToken) {
      navigate("/agent");
    }
  }, [user.agentToken, navigate]);
  return (
    <ResetPasswordApi
      role={"agent"}
      style={{ bg_color: "agent_div_1", button: "agent_button" }}
      path={"/agent/login"}
    />
  );
};

export default AgentReset;