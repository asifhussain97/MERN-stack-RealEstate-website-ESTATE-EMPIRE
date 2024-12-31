import React from "react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import ResetPassword from "./ResetPassword";
import { toast } from "react-toastify";
import { propsValue, signupInputs } from "../../../utils/types";
import { reset } from "../../../service/api/auth/apiMethod";

const ResetPasswordApi: React.FC<propsValue> = ({role,style,path}) => {
  const navigate: NavigateFunction = useNavigate();

  const onSubmit = async (payloads: signupInputs) => {
    try {
      const response = await reset(payloads);

      if (response.status === "success") {
        toast.success(response.message);
        navigate(path);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error((error as Error)?.message);
    }
  };

  return (
    <div className="w-full flex   md:flex-row">
      <div className={` flex-auto hidden md:flex  md:w-2/5 h-screen  flex-col items-center justify-center text-white w-full ${style.bg_color}`}>
        <div className="w-1/2 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
          <p className=" text-white mb-4">
            Signin up and discover a great amount of new oppertunities
          </p>
   
        </div>
      </div>
      <ResetPassword onSubmit={onSubmit} style={style.button} role={role}/>
    </div>
  );
};
export default ResetPasswordApi;