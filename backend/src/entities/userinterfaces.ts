import { Types } from "mongoose"
export interface UserInterface {
  
    isAdmin:boolean;
    email: string;
    username: string;
    password: string;
    phone?: string | null;
    isBlocked?: boolean;
    isGoogle?:boolean;
    role:string

}

export interface CreateUserInterface {
    _id: string,
    email: string;
    username: string;
    password: string;
    phone?: string | null;
    isBlocked?: boolean;
    isGoogle?:boolean;
    role?:string;
    isAdmin:boolean;
}