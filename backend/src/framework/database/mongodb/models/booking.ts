import  mongoose, { Schema,Types,model } from "mongoose";

import { UserDocument } from "./user";
import { LocationDocument } from "./location";

export interface bookingDocument extends Document {
  agent: Types.ObjectId | UserDocument; // Can be ObjectId or fully populated UserDocument
  user: Types.ObjectId | UserDocument;
  locationData: Types.ObjectId | LocationDocument;
    name: string;
    property:Types.ObjectId;
    status:string;

    total:number;
    date:Date;
    time:string;
    phone:string;

}

const bookingSchema:Schema<bookingDocument>= new Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    agent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
     name: {
      type: String,
      required: true,
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
    phone:{
        type: String,
        required: true,  
    },

    









    
    locationData:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    total:{
        type:Number,
        required: true, 
    },
    date:{
        type:Date,
        required: true, 
    },
 
    time:{
        type:String,
        required: true, 
    },
    status:{
        type:String,
        required: true, 
    },
    



  },
  {
    timestamps: true,
  }
);
const Booking = model("booking", bookingSchema);

export default Booking;