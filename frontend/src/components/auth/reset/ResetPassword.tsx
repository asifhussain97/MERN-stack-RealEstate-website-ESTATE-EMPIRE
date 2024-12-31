import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signupInputs } from '../../../utils/types';
interface resetProps {
    onSubmit:(values: signupInputs) => void;
    style:string;
    role:string|undefined
  }

  const initialValues = {
      password: '',
      confirmPassword: ''

  };

   const validationSchema = Yup.object().shape({

    password: Yup.string()
      .test(
        "is-strong-password",
        "Password must be strong",
        (value) => {
          if (!value) return false; 
          const strongPasswordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return strongPasswordPattern.test(value);
        }
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });
  
  
  

const ResetPassword:React.FC<resetProps> = ({ onSubmit,style,role }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
    const PasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const ConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const formik = useFormik({
      initialValues: { ...initialValues, role },
      validationSchema,
      onSubmit: (values) => {
        onSubmit(values);
      },
    });


  return (
    <div className="authentication_div_2">
   
    <h1 className="text-3xl font-bold text-gray-900 mb-4">
      Update Password
    </h1>

    <form
      className="w-full max-w-sm"
      onSubmit={formik.handleSubmit}
      noValidate
    >

     
 
      <div className=" relative mb-4">
        <label className="label" htmlFor="password">
         New Password
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
            <p className="text-red-600">{formik.errors.password}</p>
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
            <p className="text-red-600">{formik.errors.confirmPassword}</p>
          ) : null}
      </div>
 

      <button type="submit" className={`${style} w-full`}>
        submit
      </button>
    </form>

  

  

  </div>
  );
}

export default ResetPassword;