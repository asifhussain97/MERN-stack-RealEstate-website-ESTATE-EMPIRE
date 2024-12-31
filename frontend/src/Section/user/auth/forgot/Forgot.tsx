import React from "react";
import ForgotApi from "../../../../components/auth/forgot/ForgotApi";
const Forgot: React.FC = () => {
  return (
    <ForgotApi
      role={"user"}
      style={{
        bg_color: "authentication_div_1",
        button: "authentication_button",
      }}
      path={"/otp"}
    />
  );
};

export default Forgot;