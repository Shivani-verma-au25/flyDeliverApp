import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs';

// configure cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});


// upload imaage to cloudinary
export const uploadnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const repsonse = await cloudinary.uploader.upload(filePath , {
            resource_type : 'auto'
        })
        // console.log("uploaded file" , repsonse);
        fs.unlinkSync(filePath);
        // return repsonse.secure_url;
        return repsonse;
        
    } catch (error) {
        fs.unlinkSync(filePath);
        console.log("Error while uplaoding file to cloudinary ", error);
        return null;
    }
}

