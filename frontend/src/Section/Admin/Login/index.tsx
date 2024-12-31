import React, {  useEffect, useState } from 'react';
import { Animi } from '../../../animation/Animi';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ApiResponse } from '../../../utils/types';
import { postLogin } from '../../../service/api/admin/apiMethod';
import { loginSuccess } from '../../../utils/redux/slice/Auth/AdminAuthSlice';
import { RootState } from '../../../utils/redux/app/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const initialValues = {
  email: '',
  password: '',
};
 const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
const AdminLogin:React.FC = () => {

  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const role='admin'
  const formik = useFormik({
    initialValues: { ...initialValues, role },
    validationSchema,
    onSubmit: (values) => {
      console.log(values,"jhjjj");
      
      postLogin(values)
      .then((response: ApiResponse) => {
        if (response.status === "success") {
          console.log(response,"response");
          
          toast.success(response.message);
          dispatch(loginSuccess({ user: response }));
          navigate("/admin");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      }); 
      formik.resetForm(); 
    },
  });


  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    if(!admin.adminToken){
      navigate('/adminlogin')
    }else{
      navigate('/admin')
    }
    }, [admin.adminToken, navigate]);
  return (
    <Animi>
      <div className="absolute z-50 inset-0 flex items-center justify-center ">
        <div className="flex p-10 items-center justify-center bg-gray-100 px-4 ">
          <div className="w-full max-w-md  space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black tracking-tight">Admin Login</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter your email and password below to access your account.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 ">
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
     

          <button type="submit" className={`authentication_button w-full`}>
            log in
          </button>
        </form>
            </div>
      
          </div>
        </div>
      </div>
    </Animi>
  )
}

export default AdminLogin;