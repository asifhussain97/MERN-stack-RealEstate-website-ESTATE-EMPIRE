import React from "react";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ForgotPage from "./Forgot";
import { propsValue, signupInputs } from "../../../utils/types";
import { forgotPassword } from "../../../service/api/auth/apiMethod";

const ForgotApi: React.FC<propsValue> = ({ role, style, path }) => {
  const navigate: NavigateFunction = useNavigate();

  const onSubmit = async (payloads: signupInputs) => {
    try {
      console.log(payloads);

      const response = await forgotPassword(payloads);
      console.log(response, "kkkk");

      if (response.status === "success") {
        toast.success(response.message);
        navigate(path, {
          state: { email: payloads.email, type: response.type },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error((error as Error)?.message || "An unexpected error occurred");
    }
  };
console.log(style.bg_color,"user",role,path);

  return (
    <div className="w-full flex   md:flex-row">
      <div
        className={`flex-auto hidden md:flex  md:w-2/5 h-screen  flex-col items-center justify-center text-white w-full ${style.bg_color}`}
      >
        <div className="w-1/2 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
          <p className=" text-white mb-4">
            Signin up and discover a great amount of new oppertunities
          </p>
        </div>
      </div>
      <ForgotPage onSubmit={onSubmit} style={style.button} role={role} />
    </div>
  );
};

export default ForgotApi;