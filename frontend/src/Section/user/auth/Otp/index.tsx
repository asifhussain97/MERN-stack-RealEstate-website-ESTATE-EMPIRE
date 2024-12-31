import React from "react";
import { useLocation } from "react-router-dom";
import OtpApi from "../../../../components/auth/otp/OtpApi";
import { loginSuccess } from "../../../../utils/redux/slice/Auth/UserAuthSlice";
const Otp: React.FC = () => {
  const location = useLocation();
  const receivedData = location.state.type;

  return (
    <OtpApi
    loginSuccess={loginSuccess}
      receivedData={receivedData}
      style={{
        bg_color: "authentication_div_1",
        button: "authentication_button",
      }}
      path={"/reset"}
      pathdata={'/'}
    />
  );
};

export default Otp;