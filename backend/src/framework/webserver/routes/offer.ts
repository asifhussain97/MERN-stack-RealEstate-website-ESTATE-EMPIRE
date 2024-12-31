import express from "express";
import { offerController } from "../../../adapters/controllers/offer/offerController";
import { offerRepositoryMongoDB } from "../../database/mongodb/repositories/offerRepositoryMongoDB";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
import { locationRepositoryMongoDB } from "../../database/mongodb/repositories/locationRepositoryMongoDB";
export const  offerRouter=()=>{
    const router = express.Router();
    const controller=offerController(offerRepositoryMongoDB,locationRepositoryMongoDB)
    router.post('/addOffer', controller.addOffer);
    router.get('/getOffer/:id', controller.getOffer);
    router.put('/editOffer/:offerId',jwtTokenVerification, controller.offerEdit);
    router.patch('/blockOffer',jwtTokenVerification, controller.offerBlock);

    return router
}