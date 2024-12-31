
import { Types } from "mongoose";
import { CreateUserInterface } from "./userinterfaces";
import { CreateLocationInterface } from "./locationInterface";

export interface bookingInterface  {
    user:string;
    agent:string;
    locationData:string ;
    name: string;
    property:string;
    phone:string;

    total:number;
    date:string;
    time:string;

    status:string;
  }
  
  export interface createbookingInterface {
    _id?: Types.ObjectId |undefined,
    agent:Types.ObjectId;
    locationData:Types.ObjectId;
    name: string;
    property:string;
    status:string;


    total:number;
    date:string;
    time:string;

  }










  export interface getbookingInterface {
    _id?: Types.ObjectId |undefined,
    agent:CreateUserInterface;
    locationData:CreateLocationInterface;
    user:CreateUserInterface,
    name: string;
    property:string;
    status:string;


    total:number;
    date:string;
    time:string;

  }

    