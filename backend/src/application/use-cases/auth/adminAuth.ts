import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

import { AuthService } from "../../../framework/services/authService";
import { UserRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/userRepositoryMongoDB";



export const adminLogin = async (email: string, password: string,role:string, services:ReturnType<AuthService>, userRepository: ReturnType<UserRepositoryMongoDBType>, ) =>{
    
  
  const user = await userRepository.getUserByEmail(email,role);

   console.log(user,'gjkfjgkf');
   
    if (!user ) {
        throw new AppError("User not found", HttpStatus.UNAUTHORIZED);
      }
      if (!user._id ) {
        throw new AppError("User ID not found", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (user.role !=='admin') {
        throw new AppError("User is NOT FOUND", HttpStatus.FORBIDDEN);
      }
      
      const isPasswordCorrect = await services.comparePassword(
        password,
        user.password
      );
  
      if (!isPasswordCorrect) {
        throw new AppError("Incorrect password", HttpStatus.UNAUTHORIZED);
      }
  
  
  
  
  
      const token = services.generateToken(user._id.toString(),user.role);
      const refreshToken = services.generateRefreshToken(user._id.toString(),user.role);
      await services.addRefreshTokenAndExpiry(user.email as string, refreshToken);
    return { token,refreshToken, user: user?.username,userId:user._id };


}






export const handleRefreshAccessToken=async(  refreshToken: string,
  userRepository: ReturnType<UserRepositoryMongoDBType>,
  authService: ReturnType<AuthService>)=>{
  
    if (!refreshToken) {
      throw new AppError("Invalid token!", HttpStatus.UNAUTHORIZED);
    }

    const { userId, role } = authService.verifyRefreshToken(refreshToken.toString());
    if (!userId || !role ) {
      throw new AppError("Invalid token!2", HttpStatus.UNAUTHORIZED);
    }
    
    const user = await userRepository.getUserById(userId);
    
    if (!user?.refreshToken && !user?.refreshTokenExpiresAt) {
      throw new AppError("Invalid token!3", HttpStatus.UNAUTHORIZED);
    }
    if (user) {
      const expiresAt = user.refreshTokenExpiresAt.getTime();
      if (Date.now() > expiresAt) {
        throw new AppError("Invalid token!4", HttpStatus.UNAUTHORIZED);
      }
    }
    const newAccessToken = authService.generateToken(userId,user.role);
 
    
    return {newAccessToken,user:user.username,userId};
  
  }