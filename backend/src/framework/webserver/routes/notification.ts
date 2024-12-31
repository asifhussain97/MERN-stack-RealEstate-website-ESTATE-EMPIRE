import express from "express";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
import { notificationController } from "../../../adapters/controllers/notification/notificationControl";

import { notficationRepositoryMongoDb } from "../../database/mongodb/repositories/notificationRepositoryMongoDB";
export const notificationRouter = () => {
  const router = express.Router();
  const controller = notificationController(notficationRepositoryMongoDb);
    router.get('/getNotifications/:userId',controller.getNotifications)
  return router;
};