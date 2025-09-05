import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const instanceConnection = await mongoose.connect(process.env.MONGO_db_URI)
        console.log("Connected to DB : ",instanceConnection.connection.host);        
    } catch (error) {
        console.log("Something went wrong while connecting to bd :  ",error);
        process.exit(1);   
    }
}