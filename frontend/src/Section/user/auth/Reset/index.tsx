import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../../../utils/redux/app/store";
import ResetPasswordApi from "../../../../components/auth/reset/ResetPasswordApi";
const Reset: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user.token, navigate]);
  return (
    <ResetPasswordApi
      role={"user"}
      style={{
        bg_color: "authentication_div_1",
        button: "authentication_button",
      }}
      path={"/login"}
    />
  );
};

export default Reset;