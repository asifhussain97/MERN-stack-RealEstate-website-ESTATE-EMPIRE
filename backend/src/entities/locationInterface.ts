import { Types } from "mongoose";

export interface LocationInterface {
  id?: string|undefined,
    agent:Types.ObjectId;
    address:string;
    name: string;
    description: string;
    image?:object;
    capasity:number;
    price:number;
    state:string;
    type:string;
    verify?:boolean,
    discountPrice?:number,
    discount?:number,
    discountStart?:Date,
    discountEnd?:Date
  }
  export interface CreateLocationInterface {
    _id?: Types.ObjectId |undefined,
    agent:Types.ObjectId;
    address:string;
    name: string;
    description: string;
    image?:object;
    capasity:number;
    price:number;
    state:string;
    verify?:Boolean,
    discountPrice?:number,
    discount?:number,
    discountStart?:Date,
    discountEnd?:Date
}