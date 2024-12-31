import { Types } from "mongoose";

export interface walletInterface {
    name: string;
    description: string;
    image: string;
  }
  export interface CreatewalletInterface {
    _id?: Types.ObjectId |undefined,
    name: string ;
    description: string  ;
    image: string  ;
}