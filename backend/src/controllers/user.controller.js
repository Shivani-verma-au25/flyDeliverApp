import { asyncHandler } from "../utils/asyncHandler.js";

export const getCurrentUser = asyncHandler( async (req, res) => {
    try {
        const user = req.user; // Assuming req.user is set by the isAuth middleware
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        return res.status(200).json({
            success : true,
            message :"Current user fetched successfully!",
            user
        })
    } catch (error) {
        console.log("Error in getcurrentuser controller" ,error);;
        return res.status(500).json({
            success : false,
            message : "Failed to get current user !"
        })
        
    }
}) 