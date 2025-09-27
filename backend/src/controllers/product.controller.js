import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadnCloudinary} from '../utils/cloudinnary.js'
import {Shop} from '../models/shop.models.js'
import { Product } from "../models/product.models.js";

// create product
export const addProducts = asyncHandler ( async (req , res) => {
    try {
        const {name , category , price ,foodType} = req.body;
         
        //validation
        if([name,category ,price ,foodType].some((item) => !item || item.trim() === '')){
            return res.status(403).json({
                success : false,
                message : "All fields are required!"
            })
        }
        
        //image from multer
        let image ;
        if (!req.file) {
            image = await uploadnCloudinary(req.file.path);
        }

        // find shop
        const shop = await Shop.findOne({owner : req.user._id});
        if(!shop) {
            return res.status(404).json({
                success : false,
                message : "Shop not found ,Please create the shop first!"
            })
        }

        // create product
        const product = await Product.create({
            name,
            category,
            price,
            foodType,
            productImage : image,
            shop : shop._id
        })



        // check product is created or not
        // const createdProduct = await Product.findById(product._id).populate("shop","name shopOwner");
        const createdProduct = await Product.findById(product._id);
        if(!createdProduct){
            return res.status(404).json({
                success : false,
                message : "Product is not created !"
            })
        }

        // send response 
        return res.status(200).json({
            success : true,
            message : "Product addded successfully!",
            createdProduct
        })

    } catch (error) {
        console.log("Error in add prduct acontroller",error);
        return res.status(200).json({
            success : false,
            message : "Failed to add product!"
        })
           
    }
})

// edit product 

export const editProduct = asyncHandler ( async (req, res) =>{
    try {
        // product id
        const {productId} = req.params;
        const {name , category ,price ,foodType} = req.body;
        // validation
        if([name,category ,price ,foodType].some((item) => item === undefined || item === null || (typeof item === "string" && item.trim() === ""))){
            return res.status(403).json({
                success :false,
                message : "All fields are required!"
            })
        }

        // find product
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product not found!"
            })
        }
    
        // check product belongs to the shop ownern or not
        const shop = await Shop.findOne(({shopOwner : req.user._id}));
        if(shop._id.toString() !== product.shop.toString()){
            return res.status(403).json({
                success : false,
                message :"You are not authorized to edit this product!"
            })
        }
        //update image if req.file is present
        let image = product.productImage;
        if(req.file){
            image = await uploadnCloudinary(req.file.path);
        }

        // find and update product

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            category,
            price,
            foodType,
            productImage : image
        }, {new : true});

        if (!updatedProduct) {
            return res.status(404).json({
                success : false,
                message : "Product not Updated!"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Product updated successfully!",
            updatedProduct
        })


    } catch (error) {
        console.log("Error in edit product controller ",error);
        return res.status(500).json({
            success :false,
            message : "Failed to edit products!"
        })
        
    }
})


