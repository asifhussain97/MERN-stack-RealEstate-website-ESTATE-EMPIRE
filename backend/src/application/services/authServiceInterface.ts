import { Request } from "express";
import { AuthServiceReturn } from "../../framework/services/authService";

export const authServiceInterface = (service: AuthServiceReturn) => {
  const encryptPasswordValue= (password: string) =>
    service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const verifyPasswordValue = (token: string) => service.verifyToken(token);

  const generateTokenValue = (userId: string, role: string) => service.generateToken(userId, role);

  const verifyTokenValue = (payload: string) => service.verifyToken(payload);
  const generateOTPValue = () => service.generateOTP();
  const verifyOTPValue = (otp:string,sessionotp:string|undefined) => service.verifyOTP(otp,sessionotp)
 const cleanUpSessionValue=(req:Request)=>service.cleanUpSession(req)

  return {
    encryptPasswordValue,
    comparePassword,
    verifyPasswordValue,
    generateTokenValue,
    verifyTokenValue,
    generateOTPValue,
    verifyOTPValue,
    cleanUpSessionValue
   
  };
};




export type AuthServiceInterface = typeof authServiceInterface;