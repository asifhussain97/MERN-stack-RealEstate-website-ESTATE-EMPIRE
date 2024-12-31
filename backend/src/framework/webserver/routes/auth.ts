import express from 'express';
import authController from '../../../adapters/controllers/authcontroller';

import { userRepositoryMongoDB } from '../../database/mongodb/repositories/userRepositoryMongoDB';
import { authService } from '../../services/authService';


const authRouter = () => {
  const router = express.Router();

  const controller = authController(

    authService,
  
    userRepositoryMongoDB,
  );

  router.post('/signup', controller.registerUser);
  router.post('/verify-otp', controller.verifyOtp)
  router.post('/login', controller.userLogin)
  router.post('/googleAuth', controller.googleAuth)
  router.post('/resend-otp', controller.otpResend)
  router.post('/forgotPassword', controller.forgotPassword)
  router.post('/resetPassword', controller.resetPassword)

  router.post('/verifyotp', controller.verifyOtpforgot)
  router.post('/refreshAccessToken/', controller.refreshAccessToken)
  return router;
};

export default authRouter;
