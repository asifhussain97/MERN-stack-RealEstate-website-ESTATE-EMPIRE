import express from "express";
import adminController from "../../../adapters/controllers/admin/adminController";
import { userRepositoryMongoDB } from "../../database/mongodb/repositories/userRepositoryMongoDB";



export default function adminRoute() {
  const router = express.Router();

  const controller = adminController(
    userRepositoryMongoDB,


  );



  router.route("/users").get(controller.handleGetAllUsers);
  router.route("/agent").get(controller.handleGetAllAgent);

  
  router.post("/userblock", controller.handleBlockUsers);

  return router;
}