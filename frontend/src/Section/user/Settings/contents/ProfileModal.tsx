import React from "react";
import { ProfileFormProps } from "../../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/redux/app/store";
import { toast } from "react-toastify";
import { editProfile } from "../../../../service/api/user/apiMethod";
import { useFormik } from "formik";
import * as Yup from 'yup';

const phoneRegExp = /^[0-9]{10}$/;
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

const ProfileModal: React.FC<ProfileFormProps> = ({
  setShowModal,
  userData,
  setApi,
  api,
}) => {
  const user = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      username: userData?.username || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values, "Submitted values");
      editProfile(user.userId, values)
        .then((response: object) => {
          console.log(response, "Response from editProfile");
          setApi(!api);
        })
        .catch((error) => {
          toast.error(error?.message);
        });

      setShowModal(false);
      formik.resetForm(); 
    },
  });

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-lg my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Profile</h3>
              <button
                className="p-1 ml-auto float-right text-3xl"
                onClick={() => setShowModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl">x</span>
              </button>
            </div>
            <div className="p-6 mx-auto">
              <form
                className="w-full"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="flex w-full">
                  <div className="">
                    <div className="mb-4">
                      <label className="label" htmlFor="username">Username</label>
                      <input
                        id="username"
                        type="text"
                        className="input"
                        placeholder="Enter the username"
                        {...formik.getFieldProps('username')}
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-600">{formik.errors.username}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="input"
                        placeholder="Enter the email"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-600">{formik.errors.email}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="label" htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="text"
                        className="input"
                        placeholder="Enter your phone"
                        {...formik.getFieldProps('phone')}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-600">{formik.errors.phone}</div>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-end mt-12 p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-regal-blue authentication_button text-white font-bold uppercase px-6 py-2 text-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;