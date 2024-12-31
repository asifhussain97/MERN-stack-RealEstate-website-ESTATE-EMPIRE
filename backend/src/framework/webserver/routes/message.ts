import express from "express";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
import { messageController } from "../../../adapters/controllers/message/messageController";
import { messageRepositoryMongoDB } from "../../database/mongodb/repositories/messageRepositoryMongodb";
import { chatRepositoryMongoDB } from "../../database/mongodb/repositories/chatRepositoryMongoDB";
export const messageRouter = () => {
  const router = express.Router();
  const controller = messageController(messageRepositoryMongoDB,chatRepositoryMongoDB);

  router
    .route("/")
    .post(jwtTokenVerification, controller.sendMessage)
    .get(controller.allMesaages);

    router.patch('/deleteEveryOne',jwtTokenVerification, controller.deleteForEveryOneMessage);
    router.patch('/deleteForMe',jwtTokenVerification, controller.deleteForMeMessage);


  return router;
};