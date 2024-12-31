import mongoose, { Schema, Document,model } from "mongoose";


export interface UserDocument extends Document {  
  email: string;
  username: string;
  password: string;
  image: string | null;
  phone: string | null;
  isBlocked: boolean;
  isGoogle: boolean;
  isBlock:boolean,
  role:string,
  refreshToken:string,
  isAdmin:boolean,
  refreshTokenExpiresAt:Date
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,

    },

    isGoogle: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    refreshToken: {
      type: String,
      default: null,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshTokenExpiresAt: {
      type: Date,
      default: null,
  },
   
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;