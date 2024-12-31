import React from "react";
import { ApiResponse,OtpInputs, propsValue } from "../../../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import OtpPage from "./Otp";
import { postOTP, verifytOTP } from "../../../service/api/auth/apiMethod";



const OtpApi: React.FC<propsValue> = ({receivedData,loginSuccess,style,path,pathdata}) => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();


  const onSubmit = async (data: OtpInputs) => {
    const otp = data.otp1 + data.otp2 + data.otp3 + data.otp4;
    console.log(otp);

    try {
      if (receivedData === "forgot") {
        const response: ApiResponse = await verifytOTP({ otp: otp });

        if (response.status === "success") {
          toast.success(response.message);
          navigate(path, { replace: true }); // Replace the OTP page in the history stack
        } else {
          toast.error(response.message);
        }
      } else {
        const response: ApiResponse = await postOTP({ otp: otp });

        if (response.status === "success") {
          toast.success(response.message);
          dispatch(loginSuccess({ user: response }));
          if (pathdata){
            navigate(pathdata, { replace: true }); // Replace the OTP page in the history stack
          }
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full flex md:flex-row">
      <div className={`flex-auto hidden md:flex  md:w-2/5 h-screen  flex-col items-center justify-center text-white w-full  ${style.bg_color}`}>
        <div className="w-1/2 p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">New Here!</h1>
          <p className="text-white mb-4">
            Signin up and discover a great amount of new opportunities
          </p>
     
        </div>
      </div>
      <OtpPage onSubmit={onSubmit} style={`${style.button}`} />
    </div>
  );
};



export default OtpApi;