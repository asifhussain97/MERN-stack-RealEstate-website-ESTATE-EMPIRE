

import { bookingRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/bookingRepositoryMongoDB";

import { HttpStatus } from "../../../../types/httpStatus";
import AppError from "../../../../utils/appError";



export const getBookingHistory = async (
  userId: string,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>
) => {
  try {
    if (!userId) {
      throw new AppError(
        "Please fill all the fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    const data = { user: userId };
    const booking = await bookingrepository.getBookingHistory(data);

    return { booking };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};
export const getBookingDetail = async (
  bookigId: string,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>
) => {
  try {
    if (!bookigId) {
      throw new AppError(
        "Please fill all the fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    const booking = await bookingrepository.getBookingDetails(bookigId);

    return { booking };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};

export const getUserBookingHistory = async (
  agentId: string,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>
) => {
  try {
    if (!agentId) {
      throw new AppError(
        "Please fill all the fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    const data = { agent: agentId };
    const booking = await bookingrepository.getBookingHistory(data);

    return { booking };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};