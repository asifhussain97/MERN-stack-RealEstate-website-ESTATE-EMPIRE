import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import jwtTokenVerification from "../middleware/jwtTokenVerification";
import adminAuthRoute from "./adminAuth";
import adminRoute from "./admin";
import { propertyRouter } from "./property";
import { locationRouter } from "./location";
import { bookingRouter } from "./booking";
import { agentRouter } from "./agent";
import { offerRouter } from "./offer";


import { notificationRouter } from "./notification";


const routes = (app: Application) => {
    app.use("/auth", authRouter());
    app.use("/user", userRouter());
    app.use("/adminAuth", adminAuthRoute());
    app.use("/admin",jwtTokenVerification, adminRoute())
    app.use("/property", propertyRouter())
    app.use("/location", locationRouter())
    app.use("/booking", bookingRouter())
    app.use("/agent", agentRouter())
    app.use("/offer", offerRouter())


    app.use("/notification", notificationRouter())


  };
  
  export default routes;
  