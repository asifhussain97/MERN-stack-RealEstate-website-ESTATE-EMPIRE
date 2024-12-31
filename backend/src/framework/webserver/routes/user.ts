import express from 'express';
import { userRepositoryMongoDB } from '../../database/mongodb/repositories/userRepositoryMongoDB';
import userController from '../../../adapters/controllers/userController';
import { locationRepositoryMongoDB } from '../../database/mongodb/repositories/locationRepositoryMongoDB';
import jwtTokenVerification from '../middleware/jwtTokenVerification';
import { walletRepositoryMongoDB } from '../../database/mongodb/repositories/walletRepositoryMongoDB';


const userRouter = () =>{

    const router = express.Router();


    const controller = userController(
        userRepositoryMongoDB,
        locationRepositoryMongoDB,
        walletRepositoryMongoDB
    )

    router
    .route("/profile/:userId")
    .get(jwtTokenVerification, controller.handleGetUserProfile)  
    .patch(jwtTokenVerification, controller.handleUpdateUserProfile);
   
   

    router.patch('/profileimage/:userId',jwtTokenVerification, controller.handleUpdateProfileImage);
    router.get('/getWallet/:userId',jwtTokenVerification, controller.getWallet);
    router.get('/searchData',jwtTokenVerification, controller.allUsers);
    router.get('/agent',jwtTokenVerification, controller.getAgent);

    return router
}

export default userRouter