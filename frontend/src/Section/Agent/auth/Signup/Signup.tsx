import React from "react";
import SignupApi from "../../../../components/auth/signup/SignupApi";

const AgentSignup: React.FC = () => {
  return (
    <SignupApi
      role={"agent"}
      style={{ bg_color: "agent_div_1", button: "agent_button" }}
      path={"/agent/otp"}
      loginPath={'/agent/login'}
    />
  );
};

export default AgentSignup;