import React from "react";


import { toast } from "react-toastify";
import { useDispatch, } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import LoginPage from "./Login";
import { propsValue, signupInputs } from "../../../utils/types";
import { postLogin } from "../../../service/api/auth/apiMethod";



const LoginApi: React.FC<propsValue> = ({role,style,loginSuccess,path,forgotPath,signUpPath}) => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  


  const onSubmit = async (payloads:signupInputs) => {
    try {
      const response = await postLogin(payloads);
      if (response.status === "success") {
        toast.success(response.message);
        dispatch(loginSuccess({ user: response }));
        navigate(path);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full flex   md:flex-row">
      <div className={` flex-auto hidden md:flex  md:w-2/5 h-screen  flex-col items-center justify-center text-white w-full ${style.bg_color}`}>
        <div className="w-1/2 p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
        <p className="text-white mb-4">To keep connected with us please login with your personal info</p>
        </div>
      </div>

      <LoginPage onSubmit={onSubmit} style={style.button} role={role} path={forgotPath} signUpPath={signUpPath} />
    </div>
  );
};

export default LoginApi;