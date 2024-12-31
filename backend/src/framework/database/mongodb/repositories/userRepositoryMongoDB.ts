import User from "../models/user";
import { CreateUserInterface } from "../../../../entities/userinterfaces";
import { UserEntityType } from "../../../../entities/user";
import bcrypt from "bcrypt";
import { sendPassword } from "../../../../utils/mailler";
import mongoose from "mongoose";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string, role: string) => {
    const user: CreateUserInterface | null = await User.findOne({
      email,
      role,
    });

    return user;
  };

  const addUser = async (user: UserEntityType) => {
    const newUser: any = new User({
      username: user.username,
      role: user.role,
      email: user.email,

      password: user.password,
    });
    newUser.save();

    return newUser;
  };

  const getAllUsers = async (value: object) => await User.find(value);

  const addGoogleUser = async (user: UserEntityType) => {
    if (!user.email) {
      throw new Error("Email is required");
    }
    if (!user.role) {
      throw new Error("role is required");
    }

    const existingUser: any = await getUserByEmail(user.email, user.role);

    if (existingUser) {
      if (existingUser.isGoogle) {
        let user = {
          _id: existingUser._id,
          email: existingUser.email,
          username: existingUser.username,
          role: existingUser.role,
        };

        return user;
      } else {
        throw new Error("user already exists with this email.");
      }
    }
    const randomPassword = Math.random().toString(36).slice(-8);

    await sendPassword(user.email, randomPassword);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const newUser: any = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      isGoogle: true,
    });
    newUser.save();

    return newUser;
  };

  const getUserById = async (id: string) => await User.findById(id);
  const getAgent = async (role: string) => await User.find({ role });
  const getAllPerson = async (role: string,userId:string) => {
    return await User.find({ role: { $ne: role } ,_id:{$ne:userId}});
  };
  

  const updateUserByProperty = async (id: string, updates: any) => {
    const user: CreateUserInterface | null = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    console.log(updates, "jhfjdk", user);
    return user;
  };

  const changeProfileImg = async (id: string, url: string) =>
     await User.findByIdAndUpdate(
      id,
      { $set: { image: url } },
      { upsert: true, new: true }
    );
    interface UserQuery {
      $or?: {
        username?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
      }[];
      role?: { $ne?: string; $eq?: string };
      _id?: { $ne: mongoose.Types.ObjectId };
    }
    
    const searchValue = async (data: string | undefined, role: string, id: string) => {
      const query: UserQuery = {};
    
      if (data) {
        query.$or = [
          { username: { $regex: data, $options: "i" } },
          { email: { $regex: data, $options: "i" } },
        ];
      }
    
      if (role === 'admin') {
        query.role = { $ne: 'admin' };
      } else {
        query.role = { $eq: role };
      }
    
      if (id) {
        query._id = { $ne: new mongoose.Types.ObjectId(id) };
      }
    
      try {
        const users = await User.find(query).exec(); 
        console.log(users);
        return users;
      } catch (error) {
        console.error("Error in searching users", error);
        throw new Error("Unable to search users");
      }
    };
    

  return {
    getUserByEmail,
    addUser,
    addGoogleUser,
    getUserById,
    updateUserByProperty,
    changeProfileImg,
    getAllUsers,
    searchValue,
    getAgent,
    getAllPerson
  };
};

export type UserRepositoryMongoDBType = typeof userRepositoryMongoDB;