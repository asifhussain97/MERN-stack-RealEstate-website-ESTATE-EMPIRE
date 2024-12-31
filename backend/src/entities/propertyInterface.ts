import { Types } from "mongoose";

export interface PropertyInterface {
    name: string ;
    description: string  ;
    image: string  ;
  }
  export interface CreatePropertyInterface {
    _id?: Types.ObjectId |undefined,
    name: string ;
    description: string  ;
    image: string  ;
}