import express from "express";
import adminAuthController from "../../../adapters/controllers/admin/adminAuthController";

import { userRepositoryMongoDB } from '../../database/mongodb/repositories/userRepositoryMongoDB';
import { authService } from '../../services/authService';

export default function adminAuthRoute() {
  const router = express.Router();

  const controller = adminAuthController(    
    authService,
  
    userRepositoryMongoDB,);

  router.post('/', controller.handleAdminLogin)
  router.post('/refreshAccessToken', controller.refreshAccessToken)

  return router;
}