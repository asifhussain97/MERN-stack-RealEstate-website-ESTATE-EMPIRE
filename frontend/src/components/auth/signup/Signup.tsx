// SignupData.tsx

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";




import { useFormik } from "formik";
import {validationSchema,initialValues} from "./validationSchema";


interface SignupDataProps {
  onSubmit: (payloads: { username: string; email: string; password: string,role:string |undefined }) => Promise<void>;
  style: string;
  role:string |undefined;
  loginPath:string |undefined;
}



const SignupData: React.FC<SignupDataProps> = ({ onSubmit, style,role,loginPath }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const PasswordVisibility = () => setShowPassword(!showPassword);
  const ConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: { ...initialValues, role },
    validationSchema,
    onSubmit: (values) => {
      console.log(values,"jkdjskdj");
      
      onSubmit(values); 
      formik.resetForm(); 
    },
  });

  return (
      <div className="authentication_div_2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create an account</h1>
        <form className="w-full max-w-sm" onSubmit={formik.handleSubmit} noValidate>
  
 
          <div className="mb-4">
            <label className="label" htmlFor="username">Username</label>
            <input
      id="username"
      type="text"
      className="input"
      placeholder="enter the username"
      {...formik.getFieldProps('username')}
    />
    {formik.touched.username && formik.errors.username ? (
      <div className="text-red-600">{formik.errors.username}</div>
    ) : null}
          </div>
          <div className="mb-4">
            <label className="label" htmlFor="email">Email</label>
            <input id="email"    className="input" type="email" placeholder="enter the email" {...formik.getFieldProps('email')} />
    {formik.touched.email && formik.errors.email ? (
      <div className="text-red-600">{formik.errors.email}</div>
    ) : null}

          </div>
          <div className="relative mb-4">
            <label className="label" htmlFor="password">Password</label>
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
              className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 ${formik.errors.password ? "top-1" : "top-7"}`}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.password && formik.errors.password ? (
      <div className="text-red-600">{formik.errors.password}</div>
    ) : null}

          </div>
          <div className="relative mb-4">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input"
              {...formik.getFieldProps('confirmPassword')}
            />
            <button
              type="button"
              onClick={ConfirmPasswordVisibility}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 ${formik.errors.confirmPassword ? "top-1" : "top-6"}`}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
      <div className="text-red-600">{formik.errors.confirmPassword}</div>
    ) : null}
          </div>
          <button type="submit" className={`${style} w-full`}>Sign Up</button>
        </form>
        <p className="mt-5">Already have an account? <a href={loginPath}>Sign In</a></p>
      </div>
   
  );
};

export default SignupData;