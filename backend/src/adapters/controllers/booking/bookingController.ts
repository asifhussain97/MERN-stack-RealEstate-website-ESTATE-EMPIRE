import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  bookingInterface,

} from "../../../entities/bookingInterface";
import { HttpStatus } from "../../../types/httpStatus";

import { locationRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";

import { bookingRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/bookingRepositoryMongoDB";
import { UserRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/userRepositoryMongoDB";
import { walletRepositoryMongoDBType } from "../../../framework/database/mongodb/repositories/walletRepositoryMongoDB";

import { bookProperty, capturepayment, payment } from "../../../application/use-cases/booking/property/create";
import { getBookingDetail, getBookingHistory } from "../../../application/use-cases/booking/property/get";
import { cancelBooking, checkStatus } from "../../../application/use-cases/booking/property/edit";


import { NotificationRepositoryMongoDbType } from "../../../framework/database/mongodb/repositories/notificationRepositoryMongoDB";

export const bookingController = (

  locationRepoimpl: locationRepositoryMongoDBType,
  bookingRepoimpl: bookingRepositoryMongoDBType,
  userRepoimpl: UserRepositoryMongoDBType,
  walletRepoimpl: walletRepositoryMongoDBType,
  notificationRepoimpl:NotificationRepositoryMongoDbType,

) => {
  const locationrepository = locationRepoimpl();

  const bookingrepository = bookingRepoimpl();
  const usergrepository = userRepoimpl();
  const walletrepository = walletRepoimpl();
  const notificationrepository = notificationRepoimpl();

  let bookingData: bookingInterface | null = null;

  const bookLocation = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const booking: bookingInterface = req.body;
      const data = await bookProperty(
        booking,
        locationrepository,

      );
      bookingData = data;

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Property booked successfully",
        data,
      });
    }
  );

  const paymentBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      if (!bookingData) {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: "failure",
          message: "No booking data available",
        });
        return;
      }

      const { order } = await payment(bookingData
      );

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Property booked successfully",
        data: order,
        amount: bookingData.total,
      });
    }
  );

  const paymentcapture = expressAsyncHandler(
    async (req: Request, res: Response) => {
      if (!bookingData) {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: "failure",
          message: "No booking data available",
        });
        return;
      }
      const { paymentId } = req.params;
      const { amount } = req.body;

      const { order } = await capturepayment(
        bookingData,
        paymentId,
        amount,
        bookingrepository,
        usergrepository,
        notificationrepository
      );

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Property booked successfully",
        data: order,

      });
    }
  );

  const bookingHistory = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { userId } = req.params;

      const { booking } = await getBookingHistory(userId, bookingrepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "get Booking history",
        data: booking,
      });
    }
  );

  const bookingDetails = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { bookigId } = req.params;

      const { booking } = await getBookingDetail(bookigId, bookingrepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "get Booking Details",
        data: booking,
      });
    }
  );

  const checkAvailability = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { date, locationData } = req.body;

      const { data } = await checkStatus(date, locationData, bookingrepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "available slot",
        data,
      });
    }
  );

  const bookingCancel = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { reason, id } = req.body;

      await cancelBooking(reason, id, bookingrepository, walletrepository, notificationrepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "cancel booking",
      });
    }
  );

  const getAgentBooking = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { agentId  } = req.params;

      const { booking } = await getBookingHistory(agentId, bookingrepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "all booking history",
        data: booking,
      });
    }
  );


  return {
    bookLocation,
    paymentBooking,
    paymentcapture,
    bookingHistory,
    bookingDetails,
    checkAvailability,
    bookingCancel,
    getAgentBooking,
 
  };
};