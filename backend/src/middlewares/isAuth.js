import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const isAuth = asyncHandler( async (req ,res ,next) => {
    try {
        const token = req.cookies.flyToken || req.header("Authorization")?.replace('Bearer ' ,"");
        console.log("tkoen" ,token);
        
        if(!token){
            return res.status(401).json({
                success : false,
                message : "You are not authorized to access this resource. Please login ! "
            })
        }

        // if token is there then verify the token
        const decoded = await jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        if(!decoded ){
            return res.status(401).json({
                success : true,
                message : "Token is invalid or expired. Please login again!"
            })
        }
        // if token is valid then get the user from the token
        const user = await User.findById(decoded._id).select('-password')
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }

        // return the user to the next middleware
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in isAuth middleware", error);
        return res.status(500).json({
            success : false,
            message : "Auth failed"
        })   
    }
})