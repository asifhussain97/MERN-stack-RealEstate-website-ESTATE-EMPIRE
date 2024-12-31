import React from "react";
import { useLocation } from "react-router-dom";
import OtpApi from "../../../../components/auth/otp/OtpApi";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/AgentAuthSlice";

const AgentOtp: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state.type;

  return (
    <OtpApi
    loginSuccess={loginSuccess}
      receivedData={receivedData}
      style={{ bg_color: "agent_div_1", button: "agent_button" }}
      path={"/agent/reset"}
      pathdata={'/agent'}
    />
  );
};

export default AgentOtp;