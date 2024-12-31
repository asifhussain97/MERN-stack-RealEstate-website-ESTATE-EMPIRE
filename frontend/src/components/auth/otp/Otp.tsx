import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { ApiResponse, OtpInputs  } from "../../../utils/types";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import * as Yup from 'yup';
import { resendOtp } from "../../../service/api/auth/apiMethod";


const validationSchema = Yup.object({
  otp1: Yup.string().required("Required"),
  otp2: Yup.string().required("Required"),
  otp3: Yup.string().required("Required"),
  otp4: Yup.string().required("Required"),
});

interface OtpPageProps {
  onSubmit: (values: OtpInputs) => void;
  style:string,

}

const OtpPage: React.FC<OtpPageProps> = ({ onSubmit,style }) => {
  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const formik = useFormik<OtpInputs>({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema,
    onSubmit,
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (e.key === "Backspace" && value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
      formik.setFieldValue(`otp${index + 1}`, "");
    }
  };
  const initialTimer = parseInt(localStorage.getItem("otpTimer") || "60");
  const [timer, setTimer] = useState<number>(initialTimer);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem("otpTimer", newTimer.toString());
          return newTimer;
        });
      } else {
        clearInterval(countdownInterval);
        setResend(true);
        toast.error("Time expired please resend otp");
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timer]);

  const startResendTimer = () => {
    console.log(email);

    resendOtp({ email: email })
      .then((response: ApiResponse) => {
        console.log(response, "kkkk");
      })
      .catch((error) => {
        toast.error(error?.message);
      });

    setResend(false);
    setTimer(60);
    localStorage.setItem("otpTimer", "60");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
        <div className="authentication_div_2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Verify Otp
          </h1>
          <form className="w-full max-w-sm" onSubmit={formik.handleSubmit} noValidate>
            <div className="mb-6">
              <label className="label" htmlFor="otp">
                Otp
              </label>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {inputRefs.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    className="input"
                    maxLength={1}
                    ref={ref}
                    {...formik.getFieldProps(`otp${index + 1}` as keyof OtpInputs)}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleInputChange(e, index);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-red-500">
                {timer > 0
                  ? `Time remaining: ${formatTime(timer)}`
                  : "OTP has expired. Please request a new one."}
              </p>
            </div>
            <button type="submit" className={`${style} w-full`} disabled={timer <= 0}>
              Submit
            </button>
            {resend && (
              <button type="button" onClick={startResendTimer} className="authentication_button2">
                Resend OTP
              </button>
            )}
          </form>
        </div>
  );
};

export default OtpPage;