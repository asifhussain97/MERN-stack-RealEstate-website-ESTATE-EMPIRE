import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL as string, 
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

};

export default configKeys;