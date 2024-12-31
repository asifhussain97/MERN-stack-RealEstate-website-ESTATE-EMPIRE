import React from "react";
import ForgotApi from "../../../../components/auth/forgot/ForgotApi";
const AgentForgot: React.FC = () => {
  return (
    <ForgotApi
      role={"agent"}
      style={{ bg_color: "agent_div_1", button: "agent_button" }}
      path={"/agent/otp"}
    />
  );
};

export default AgentForgot;