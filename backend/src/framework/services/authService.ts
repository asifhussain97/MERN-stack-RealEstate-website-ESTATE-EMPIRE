import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
import { Request } from "express";
import User from "../database/mongodb/models/user";

export const authService = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (userId: string, role: string) => {
    const payload = { userId, role };
    const token = jwt.sign(payload, configKeys.JWT_SECRET, {
      expiresIn: "59m",
    });

    return token;
  };

  const generateRefreshToken = (userId: string, role: string) => {
    const payload = { userId, role };
    const refreshToken = jwt.sign(payload, configKeys.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return refreshToken;
  };

  const generateOTP = async () => {
    const characters = "0123456789";
    let otp = "";

    for (let i = 0; i <4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }

    return otp;
  };

  const verifyOTP = async (otp: string, sessionotp: string | undefined) => {
    if (otp === sessionotp) {
      return true;
    } else {
      return false;
    }
  };
  const cleanUpSession = (req: Request) => {
    const sessionData = req.session!;
    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;
  };

  const verifyToken = (token: string) => {
    const payload: { userId: string; role: string } = jwt.verify(
      token,
      configKeys.JWT_SECRET
    ) as { userId: string; role: string };

    return payload;
  };

  const verifyRefreshToken = (token: string) => {
    const payload: { userId: string; role: string } = jwt.verify(
      token,
      configKeys.JWT_REFRESH_SECRET
    ) as { userId: string; role: string };

    return payload;
  };

  const addRefreshTokenAndExpiry = async (
    email: string,
    refreshToken: string
  ) => {
    try {
      const refreshTokenExpiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      const user = await User.findOneAndUpdate(
        { email },
        { refreshToken, refreshTokenExpiresAt },
        { new: true }
      );
      // console.log('user is ', user)
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error adding refresh token and expiry!");
    }
  };

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    generateRefreshToken,
    verifyToken,
    generateOTP,
    verifyOTP,
    cleanUpSession,
    verifyRefreshToken,
    addRefreshTokenAndExpiry,
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;