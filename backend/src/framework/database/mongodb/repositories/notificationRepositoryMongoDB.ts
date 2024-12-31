import mongoose from "mongoose";
import Notification from "../models/notification";
import User from "../models/user";
import { CreateUserInterface } from "../../../../entities/userinterfaces";
const { ObjectId } = mongoose.Types


export const notficationRepositoryMongoDb = () => {

    const createNotification = async (notificationData:any) => {
        try {
            console.log(notificationData,'notificationData');
            
            const notification = new Notification(
                notificationData
            );

        return  await notification.save();

   
        } catch (error) {
            console.log(error);
        }
    }

   



    const getNotifications = async (receiverId:string) => {
        try {

            const populateField = await determinePopulateField(receiverId);
            const notifications = await Notification.find({ receiverId}).sort({ createdAt: -1 }).populate('senderId').populate(populateField)
            // await Notification.updateMany({receiverId}, { isSeen: true });
            return notifications
        } catch (error) {
            console.log(error)
        }
    }



const determinePopulateField = async (receiverId: string): Promise<string> => {

    const userData: CreateUserInterface = await User.findById(receiverId) as CreateUserInterface
 
    if ( userData.role='vender') {  
      return 'bookingVender';
    } else {
      return 'booking';
    }
  };



    return {
        getNotifications,

        createNotification,
    }
}

export type NotificationRepositoryMongoDbType = typeof notficationRepositoryMongoDb