import express from "express";
import { propertyController } from "../../../adapters/controllers/property/propertyController";
import { propertyRepositoryMongoDB } from "../../database/mongodb/repositories/propertyRepositoryMongoDB";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
export const propertyRouter = () => {
  const router = express.Router();
  const controller = propertyController(propertyRepositoryMongoDB);

  router.post("/addpropertytype", jwtTokenVerification, controller.addProperty);
  router.post("/propertyblock", jwtTokenVerification, controller.handleBlockProperty);
  router.get("/getproperty", controller.getProperty);
  router.get("/editproperty", jwtTokenVerification, controller.editProperty);
  return router;
};