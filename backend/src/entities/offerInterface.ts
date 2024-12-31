import { Types } from "mongoose";

export interface offerInterface {
    name: string;
    discountValue: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    discountedAgent:string;
    
  }
  export interface CreateOfferInterface {
    _id?: Types.ObjectId |undefined,
    name: string;
    discountValue: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    discountedAgent: Types.ObjectId;
}