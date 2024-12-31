

import { bookingRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/bookingRepositoryMongoDB";
import { NotificationRepositoryMongoDbType } from "../../../../framework/database/mongodb/repositories/notificationRepositoryMongoDB";

import { walletRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/walletRepositoryMongoDB";
import { HttpStatus } from "../../../../types/httpStatus";
import AppError from "../../../../utils/appError";




export const checkStatus = async (
  date: string,
  locationData: string,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>
) => {
  try {
    if (!date || !locationData) {
      throw new AppError(
        "Please fill all the fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    const data = await bookingrepository.checkAvailableSlot(date, locationData);

    return { data };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};

export const cancelBooking = async (
  reason: string,
  bookingId: string,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>,
  walletrepository: ReturnType<walletRepositoryMongoDBType>,
  notificationrepository: ReturnType<NotificationRepositoryMongoDbType>,
) => {
  try {
    if (!reason || !bookingId) {
      throw new AppError(
        "Please fill all the fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    const booking = await bookingrepository.getBookingDetails(bookingId);

    if(!booking._id)return

    if (booking?.status == "booked") {
      let user_id: string = null as unknown as string; // Type assertion to 'string'
      if (booking?.user && typeof booking.user._id === 'string') {
        user_id = booking.user._id; // Safely access _id
      } else {
        throw new AppError("User ID is missing or invalid", HttpStatus.NOT_ACCEPTABLE);
      }
      let totalAmount = booking?.total;

      const walletData = await walletrepository.getWalletDb(user_id);

      if (walletData) {
        const createdWallet = await walletrepository.updatewalletBalancedb(
          user_id,
          totalAmount
        );
      } else {
        const createdWallet = await walletrepository.createWalletDb(
          user_id,
          totalAmount
        );
      }

      

      const updateBooking = await bookingrepository.editbookingDb(
        booking._id,
        { status: "cancelled" }
      );

      const notificationData={
        receiverId:booking.agent._id,
        senderId:booking.user._id,
        property:'cancelled',
        booking:booking._id
      }
      const notification = await notificationrepository.createNotification(notificationData);


    }
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};

