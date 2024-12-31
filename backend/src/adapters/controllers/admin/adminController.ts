import {  Request, Response } from "express"
import asyncHandler from "express-async-handler";
import { UserRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/userRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import { blockuser,getAllUsers } from "../../../application/use-cases/user/userDetails";
export default function adminController(
    userDbRepositoryImpl: UserRepositoryMongoDBType,
  ) {
    const userRespository = userDbRepositoryImpl();
    const handleGetAllUsers = asyncHandler(
      async (req: Request, res: Response) => {
        console.log("got to admin user fetching api");
         let value={role:'user'}
        const data = await getAllUsers(userRespository,value);
  
        res.status(HttpStatus.OK).json({
          status: "success",
          message: "All users details has been fetched",
           data,
        });
      }
    );
    const handleBlockUsers = asyncHandler(
      async (req: Request, res: Response) => {
 
        const userId: any = req.body.userId;
        const {data,message} = await blockuser( userId,userRespository);
  
        res.status(HttpStatus.OK).json({
          status: "success",
          message,
        data,
        });
      }
    );
    const handleGetAllAgent = asyncHandler(
      async (req: Request, res: Response) => {
         let value={role:'agent'}
        const data = await getAllUsers(userRespository,value);
  
        res.status(HttpStatus.OK).json({
          status: "success",
          message: "All users details has been fetched",
           data,
        });
      }
    )
    const handleGetAllVender = asyncHandler(
      async (req: Request, res: Response) => {
         let value={role:'vender'}
        const data = await getAllUsers(userRespository,value);
        res.status(HttpStatus.OK).json({
          status: "success",
          message: "All users details has been fetched",
           data,
        });
      }
    );
    return {
      handleGetAllVender,
        handleGetAllUsers,
        handleBlockUsers,
        handleGetAllAgent
      };
  }