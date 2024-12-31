import React, { useEffect, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ApiResponse, signupInputs } from "../../../utils/types";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { loginSuccess } from "../../../utils/redux/slice/Auth/UserAuthSlice";
import { loginSuccess as agentloginSuccess } from "../../../utils/redux/slice/Auth/AgentAuthSlice";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {  GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { RootState } from "../../../utils/redux/app/store";
import { googleAuthenticate } from "../../../service/api/auth/apiMethod";



interface TokenResponse {
  access_token: string;
}
interface LoginDataProps {
  onSubmit: (payloads:signupInputs) => Promise<void>;
  style: string;
  role:string |undefined;
path:string |undefined;
signUpPath:string |undefined;

}

 const initialValues = {
  email: '',
  password: '',
};



 const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage: React.FC<LoginDataProps> = ({onSubmit,style,role,path,signUpPath}) => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {
  if(user.token){
    navigate('/')
  }
  }, [user.token, navigate]);

  const formik = useFormik({
    initialValues: { ...initialValues, role },
    validationSchema,
    onSubmit: (values) => {
      console.log(values,"jhjjj");
      
      onSubmit(values); 
      formik.resetForm(); 
    },
  });




  const handleGoogleSuccess = async (tokenResponse: TokenResponse) => {
    try {
      const { access_token } = tokenResponse;
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        }
      );
      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userObject = await userInfoResponse.json();
const payload={
    username:userObject.name,
     email:userObject.email,
     role
}

      googleAuthenticate(payload)
      .then((response: ApiResponse) => {
        if (response.status === "success") {
          toast.success(response.message);
  
        
         
          
      
          console.log(role,"fjdkfhkdj",response.role)


          if(role=='user' && response.role=='user'){
            console.log(role);
            dispatch(loginSuccess({ user: response }));
            navigate("/");
          }
          else if(role=='agent'&& response.role=='agent'){
            dispatch(agentloginSuccess({ user: response }));
            navigate("/agent");

          }

        //   else if(role=='vender'&& response.role=='vender'){
        //     dispatch(venderloginSuccess({ user: response }));
        //     navigate("/vender");

        //   }
        else{
            toast.error('user not found');
          }
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });

      
   
    } catch (error) {
 
      toast.error("Failed to handle Google login");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error("Google login failed. Please try again.");
    },
  });
  return (
    
      <div className="authentication_div_2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Login
        </h1>

        <form
          className="w-full max-w-sm"
          onSubmit={formik.handleSubmit} 
          noValidate
        >
     
          <div className="mb-4">
            <label className="label" htmlFor="email">
              email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your mail"
              className="input"
              {...formik.getFieldProps('email')} 
            />
                {formik.touched.email && formik.errors.email ? (
      <div className="text-red-600">{formik.errors.email}</div>
    ) : null}
          </div>
          <div className=" relative mb-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}

              placeholder="Enter your password"
              className="input"
              {...formik.getFieldProps('password')}
            />
            <button
              type="button"
              onClick={PasswordVisibility}
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.password && formik.errors.password ? (
      <div className="text-red-600">{formik.errors.password}</div>
    ) : null}

          </div>
          <div className="mb-4 ">
            <p className="text-end text-regal-blue">
              <a href={`${path}`}>forgot password</a>
            </p>
          </div>

          <button type="submit" className={`${style} w-full`}>
            log in
          </button>
        </form>

        <p className="mt-5">
          Not registered yet?  <a href={signUpPath}>Create an account</a>
        </p>
        <GoogleOAuthProvider
          clientId="793856567539-g571dvb9lv0qv1lh34hhv40ceerqha6d.apps.googleusercontent.com"
        >
          <button
            type="button"
            onClick={() => googleLogin()}
            className="mt-5 flex items-center justify-center w-full max-w-sm text-center bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FcGoogle className="mr-2" /> Sign in with Google
          </button>
        </GoogleOAuthProvider>
      </div>

  );
};

export default LoginPage;