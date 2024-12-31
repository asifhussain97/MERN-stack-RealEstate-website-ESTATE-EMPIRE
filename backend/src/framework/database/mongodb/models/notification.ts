import mongoose, { Schema, Document, Model } from 'mongoose';


interface notificationDocument extends Document {
  receiverId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  property: string;
  isSeen: boolean;
  booking?:mongoose.Types.ObjectId;

}


const NotificationSchema: Schema = new Schema({
  receiverId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  senderId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  property: { type: String, required: true},
  isSeen: { type: Boolean, required: true, default: false },
  booking:{ type:mongoose.Types.ObjectId,ref:'booking',},

  
},{
    timestamps:true
});


const Notification: Model<notificationDocument> = mongoose.model<notificationDocument>('Notification', NotificationSchema);

export default Notification;