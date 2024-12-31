import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signupInputs } from "../../../utils/types";
interface ForgotDataProps {
  onSubmit: (payloads: signupInputs) => Promise<void>;
  style: string;
  role: string | undefined;
}

const initialValues = {
  email: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const ForgotPage: React.FC<ForgotDataProps> = ({ onSubmit, style, role }) => {
  const formik = useFormik({
    initialValues: { ...initialValues, role },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });
  return (
    <div className="authentication_div_2">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Enter Your Email
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
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600">{formik.errors.email}</div>
          ) : null}
        </div>

        <button type="submit" className={`${style} w-full`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPage;