import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_DB_URL;
        if (!mongoURI) {
            throw new Error('MONGO_DB_URL environment variable is not defined.');
        }

        await mongoose.connect(mongoURI);
        console.log('Database connected successfully');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export default connectDB;