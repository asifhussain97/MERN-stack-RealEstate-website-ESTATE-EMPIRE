import { Types } from 'mongoose';
import { bookingInterface } from "../../../../entities/bookingInterface";
import { CreateLocationInterface } from "../../../../entities/locationInterface";
import { bookingRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/bookingRepositoryMongoDB";
import { locationRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/locationRepositoryMongoDB";
import { NotificationRepositoryMongoDbType } from "../../../../framework/database/mongodb/repositories/notificationRepositoryMongoDB";
import { UserRepositoryMongoDBType } from "../../../../framework/database/mongodb/repositories/userRepositoryMongoDB";

import { HttpStatus } from "../../../../types/httpStatus";
import AppError from "../../../../utils/appError";
const axios = require("axios");
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_IDlkzIz4qVseOb",
  key_secret: "b3NjZ0PYbXNoLpkmRSJNVisV",
});
export const bookProperty = async (
  booking: bookingInterface,
  locationrepository: ReturnType<locationRepositoryMongoDBType>

) => {
  const { 
    name, 
    user, 
    property, 
    locationData, 
    agent, 

    date, 
    time, 
    phone 

  } = booking;

  if (!name || !locationData || !agent || !date || !time) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }
  const location = await locationrepository.getLocationbyIdDb(locationData);

  if (!location) {
    throw new AppError("Location not found", HttpStatus.NOT_FOUND);
  }

  const data: CreateLocationInterface = {
    _id: location._id as Types.ObjectId, 
    agent: location.agent,
    address: location.address,
    name: location.name,
    description: location.description,
    image: location.image,
    capasity: location.capasity,
    price: location.price,
    state: location.state,
    verify: location.verify,
    discountPrice: location.discountPrice
      ? location.discountPrice
      : location.price,
  };
  // Calculate total amount based on time and discounts
  let totalamount = data.discountPrice
    ? time === "full Day"
      ? 2 * data.discountPrice
      : data.discountPrice
    : 0;










  let bookingData: bookingInterface = {
    user: user,
    agent,
    locationData,
    name,
    property,

    total: totalamount,
    date,
    time,

    phone,
    status: "pending",
  };

  let bookingDeatails = {
    ...bookingData,
    image: location.image[0].url,
    locationName: data.name,
  };

  return bookingDeatails;
};

export const payment = async (
  bookingData: bookingInterface
) => {
  try {
    const options = {
      amount: bookingData.total * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
    };

    const order = await new Promise((resolve, reject) => {
      instance.orders.create(options, (err: Error | null, order: any) => {
        if (err) {
          console.error("Order creation error:", err);
          reject(
            new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE)
          );
        } else {
          resolve(order);
        }
      });
    });

    return { order };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};

export const capturepayment = async (
  bookingData: bookingInterface,
  paymentId: string,
  amountData: number,
  bookingrepository: ReturnType<bookingRepositoryMongoDBType>,
  userrepository: ReturnType<UserRepositoryMongoDBType>,
  notificationrepository: ReturnType<NotificationRepositoryMongoDbType>,
) => {
  try {
    const amount = amountData;
    const currency = "INR";

    const captureUrl = `https://api.razorpay.com/v1/payments/${paymentId}/capture`;

    const response = await axios.post(
      captureUrl,
      { amount, currency },
      {
        auth: {
          username: "rzp_test_IDlkzIz4qVseOb",             
          password: "b3NjZ0PYbXNoLpkmRSJNVisV",
        },
      }
    );


    
    if (response.status == 200) {
      bookingData = { ...bookingData, status: "booked" };
      const result = await bookingrepository.createBookingDb(bookingData);


      const notificationData = {
        receiverId: bookingData.agent,
        senderId: bookingData.user,
        property: bookingData.status,
        booking: result._id,
      };


      const notification = await notificationrepository.createNotification(notificationData);


      const agentData = await userrepository.getUserById(bookingData.agent);
      const userData = await userrepository.getUserById(bookingData.user);

      const data = await bookingrepository.messageAgent(
        userData?.username,
        bookingData.phone,
        agentData?.email
      );
    }

    return { order: response.data };
  } catch (err) {
    throw new AppError("Something Went Wrong", HttpStatus.NOT_ACCEPTABLE);
  }
};