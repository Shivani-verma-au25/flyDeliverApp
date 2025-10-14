import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadnCloudinary } from "../utils/cloudinnary.js";
import { Shop } from "../models/shop.models.js";
import { Product } from "../models/product.models.js";

// create product
export const addProducts = asyncHandler(async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;

    // Validation
    if ([name, category, foodType].some(item => !item || item.trim() === '') || !price) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Upload image
    let image;
    if (req.file) {
      try {
        const uploadResImage = await uploadnCloudinary(req.file.path);
        image = uploadResImage.secure_url;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Error while uploading image!",
          error: error.message,
        });
      }
    }

    // Find shop
    const shop = await Shop.findOne({ shopOwner: req.user._id });
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found, please create one first!",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      category,
      price,
      foodType,
      productImage: image,
      shop: shop._id,
    });

    // Push product into shop items and save
    shop.items.push(product._id);
    await shop.save();

    // ✅ Re-fetch and populate the updated shop
    const updatedShop = await Shop.findById(shop._id)
      .populate("items", "name price category foodType productImage");

    return res.status(200).json({
      success: true,
      message: "Product added successfully!",
      updatedShop, // ✅ now fully populated
    });

  } catch (error) {
    console.log("Error in addProduct controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product!",
      error: error.message,
    });
  }
});



// edit product

export const editProduct = asyncHandler(async (req, res) => {
  try {
    // product id
    const { getId } = req.params;
    const { name, category, price, foodType } = req.body;
    // validation
    if (
      [name, category, price, foodType].some(
        (item) =>
          item === undefined ||
          item === null ||
          (typeof item === "string" && item.trim() === "")
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // find product
    const product = await Product.findById(getId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // check product belongs to the shop ownern or not
    const shop = await Shop.findOne({ shopOwner: req.user._id });
    if (shop._id.toString() !== product.shop.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this product!",
      });
    }
    //update image if req.file is present
    let image = product.productImage;
    if (req.file) {
      image = await uploadnCloudinary(req.file.path);
    }

    // find and update product

    const updatedProduct = await Product.findByIdAndUpdate(
      getId,
      {
        name,
        category,
        price,
        foodType,
        productImage: image,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not Updated!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      updatedProduct,
    });
  } catch (error) {
    console.log("Error in edit product controller ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit products!",
    });
  }
});



// get product by id

export const getItemById = asyncHandler(async (req, res) => {
  try {
    const getId = req.params.getId;
    
    if(!getId){
      return res.status(404).json({
        success :false,
        message :"Product id is required!"
      })
    }
  
    const product = await Product.findById(getId);
    if(!product){
      return res.status(404).json({
        success : false,
        message : "Product not found!"
      })
    }
    
    return res.status(200).json({
      success : true,
      message : "Prodcut Fetched successfully!",
      product
    })
  } catch (error) {
    console.log("Error in getItem by id controller" , error)
    return res.status(500).json({
      success : false,
      message : "Failed to get product!",
      error : error.message,
    });
    
  }


})
