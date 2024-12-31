import { NotificationRepositoryMongoDbType } from "../../../framework/database/mongodb/repositories/notificationRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";


export const handleGetNotifications=async(
    userId:string,
    notificationDbRepository:ReturnType<NotificationRepositoryMongoDbType>
)=>{
    try {
        const notifications=await notificationDbRepository.getNotifications(userId)
        return notifications
    } catch (error) {
        console.log('error in fetching notifications',error)
        throw new AppError('Error in fetching notification',HttpStatus.INTERNAL_SERVER_ERROR)
    }
}