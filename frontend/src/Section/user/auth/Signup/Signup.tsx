// Signup.tsx

import React from "react";
import SignupApi from "../../../../components/auth/signup/SignupApi";


const Signup: React.FC = () => {

  return<SignupApi role={'user'}  style={{bg_color:'authentication_div_1',button:"authentication_button"}} path={"/otp"}    loginPath={'/login'}  />
};

export default Signup;