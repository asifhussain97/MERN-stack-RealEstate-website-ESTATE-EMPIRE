import {  Request, Response } from "express"
import { AuthService } from "../../../framework/services/authService"

import { adminLogin } from "../../../application/use-cases/auth/adminAuth"
import { HttpStatus } from "../../../types/httpStatus"
import { UserRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/userRepositoryMongoDB"
import expressAsyncHandler from "express-async-handler"
import { handleRefreshAccessToken } from "../../../application/use-cases/auth/adminAuth"

export default function adminAuthController(

    authServiceImpl: AuthService,
  
    userDbRepositoryImpl: UserRepositoryMongoDBType
){
    
    const services = authServiceImpl();
    const dbRepositoryUser = userDbRepositoryImpl();
    const handleAdminLogin = async (req: Request, res: Response,) => {
        const {email, password,role} = req.body

          const { token,refreshToken, user,userId } = await adminLogin(
            email,
            password,
            role,
            services,
            dbRepositoryUser
        )

    
        res.status(HttpStatus.OK).json({status: 'success', message: 'Admin has been logged in succesfull', token,refreshToken,
            admin:user,
            adminId:userId})
    }


  
    const refreshAccessToken=expressAsyncHandler(async(req:Request,res:Response)=>{
  
        const {refreshToken}=req.body;
        const refreshTokenData = refreshToken ?? null;
        const {newAccessToken,user,userId}=await handleRefreshAccessToken(refreshTokenData,dbRepositoryUser,services)

        console.log(newAccessToken,user,userId);
        
        res.status(200).json({
            admin:user,token:newAccessToken,adminId:userId,
          status: "success",
          message: "token updated sucessfully",
        });
    })


    return {
        handleAdminLogin,
        refreshAccessToken
    }

}