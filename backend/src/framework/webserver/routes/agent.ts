import express from "express";
import { agentController } from "../../../adapters/controllers/agent/agentController";
import { bookingRepositoryMongoDB } from "../../database/mongodb/repositories/bookingRepositoryMongoDB";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
export const  agentRouter=()=>{
    const router = express.Router();
    const controller=agentController(bookingRepositoryMongoDB)



    router.get('/getUserBooking/:agentId',jwtTokenVerification, controller.getUserBooking);
    router.get('/getUserbookingDetails/:bookigId',jwtTokenVerification, controller.getUserbookingDetails);

    return router
}