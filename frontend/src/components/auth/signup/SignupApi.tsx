// Signup.tsx

import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import SignupData from "./Signup"; 
import { propsValue, signupInputs } from "../../../utils/types";
import { postRegister } from "../../../service/api/auth/apiMethod";

const SignupApi: React.FC<propsValue> = ({role,style,path,loginPath}) => {
  const navigate: NavigateFunction = useNavigate();


  const onSubmit = async (payloads:signupInputs) => {
    try {
     
      
      const response = await postRegister(payloads);

      if (response.status === "success") {
        toast.success(response.message);
        navigate(path, { state: { email: payloads.email } });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage);
    }
  };

  return(
    <div className="w-full h-full flex md:flex-row">
    <div className={`flex-auto hidden md:flex  md:w-2/5 h-screen  flex-col items-center justify-center text-white w-full ${style.bg_color}`}>
      <div className="w-full xl:w-1/2 p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
        <p className=" text-white mb-4">Signin up and discover a great amount of new oppertunities</p>
      </div>
    </div>
    <SignupData onSubmit={onSubmit} style={style.button} role={role} loginPath={loginPath} />
  
  </div>
  )
};

export default SignupApi;