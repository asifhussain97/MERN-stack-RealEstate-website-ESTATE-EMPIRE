import { ApiResponse,  signupInputs } from "../../../utils/types";
import { apiCall } from "./apiCall";
import { authUrls } from "../endpoint";

export const postRegister = (userData: signupInputs): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};

export const postOTP = (otp: { otp: string }): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", authUrls.verifyOtp, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};

export const resendOtp = (email: { email: string }): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.resendOtp, email)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};

export const postLogin = (userData: signupInputs): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.login, userData)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};
export const googleAuthenticate = (
  userData: signupInputs
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.googleAuth, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};


export const forgotPassword = (email:signupInputs): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      
      apiCall("post", authUrls.forgotPassword, email)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};

export const verifytOTP = (otp: { otp: string }): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", authUrls.forgotVerifyOtp, otp)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};



export const reset= (userData: signupInputs): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.resetPassword, userData)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};



export const refreshAccessToken = (refreshToken:string|null|undefined
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${authUrls.refreshToken}`;
 

      apiCall("post", url, {refreshToken})
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};