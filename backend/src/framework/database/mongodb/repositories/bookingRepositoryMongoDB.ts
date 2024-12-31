import { Types } from "mongoose";
import {
  bookingInterface,

  createbookingInterface,

} from "../../../../entities/bookingInterface";
import { sendService } from "../../../../utils/mailler";
import Booking from "../models/booking";

import { PropertyDocument } from "../models/property";
import { LocationDocument } from "../models/location";
import { UserDocument } from "../models/user";

import Notification from "../models/notification";

export const bookingRepositoryMongoDB = () => {
  const createBookingDb = async (booking: bookingInterface) => {
    
    let newBooking = new Booking(booking);

    await newBooking.save();
    return newBooking;
  };
  const getBookingHistory = async (data: object) =>
    await Booking.find(data)
      .populate<{ agent: UserDocument }>("agent")
      .populate<{ user: UserDocument }>("user")
      .populate<{ locationData: LocationDocument }>("locationData");


      const getBookingDetails = async (id: string) => {
        try {
         

          const data = await Booking.findById(id)
            .populate<{ agent: UserDocument }>("agent")
            .populate<{ user: UserDocument }>("user")
            .populate<{ locationData: LocationDocument }>("locationData")
            .populate<{ property:PropertyDocument }>("property")
            



      
          if (!data) {
            throw new Error("Booking not found");
          }
      
      
          return data;
        } catch (error) {
          console.error("Error populating data: ", error);
          throw error;
        }
      };
  const messageAgent = async (
    name: string | undefined,
    phone: string,
    agent: string | undefined
  ) => {
    await sendService(name, phone, agent);
  };

  const checkAvailableSlot = async (
    dateString: string,
    locationData: string
  ) => {
    try {
      const date = new Date(dateString);

      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const dataValue = {
        date: {
          $gte: start,
          $lte: end,
        },
        locationData,
      };
      const data = await Booking.find(dataValue, { _id: 0, time: 1 });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const editbookingDb = async (id: any, updates: any) => {
    const property: createbookingInterface | null =
      await Booking.findByIdAndUpdate(id, updates, { new: true });
    return property;
  };





































const getAgentBookingHistory = async (data: object) =>
    await Booking.find(data)
      .populate<{ agent: UserDocument }>("agent")
      .populate<{ user: UserDocument }>("user");




  const getAgentBookingDetails = async (id: string) => {
    try {


      const data = await Booking.findById(id)
        .populate<{ agent: UserDocument }>("agent")
        .populate<{ user: UserDocument }>("user")
        .populate<{ locationData: LocationDocument }>("locationData");



      if (!data) {
        throw new Error("Booking not found");
      }


      return data;
    } catch (error) {
      console.error("Error populating data: ", error);
      throw error;
    }
  };


  return {
    messageAgent,
    createBookingDb,
    getBookingDetails,
    getBookingHistory,
    checkAvailableSlot,
    editbookingDb,
    getAgentBookingHistory,
    getAgentBookingDetails
  };
};



export type bookingRepositoryMongoDBType = typeof bookingRepositoryMongoDB;