import { Shop } from "../models/shop.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadnCloudinary } from "../utils/cloudinnary.js";

// create a shop
export const createShopAndEditShop = asyncHandler(async (req, res) => {
  try {
    const { name, shopCity, state, address } = req.body;
    // validation
    if ([name, shopCity, state, address].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required!",
      });
    }

    // file image
    let image;
    if (req.file) {
      image = await uploadnCloudinary(req.file.path);
    }

    // check if shop already exists for the owner
    const existedShop = await Shop.findOne({ shopOwner: req.user._id });
    if (!existedShop) {
      // create shop
      const shop = await Shop.create({
        name,
        shopImage: image,
        shopCity,
        state,
        address,
        shopOwner: req.user._id,
      });

      // find created shop

      const createdShop = await Shop.findById(shop._id).populate(
        "shopOwner ","name"
      );
      // check shop is created or not
      if (!createdShop) {
        return res.status(402).json({
          success: false,
          message: "Failed to create Shop !",
        });
      }

      // send response

      return res.status(201).json({
        success: true,
        message: `${req.user.fullname} has created the Shop Successfully!`,
        createdShop,
      });
    }else {
        const shop = await Shop.findByIdAndUpdate( existedShop._id ,{
        name,
        shopImage: image,
        shopCity,
        state,
        address,
        shopOwner: req.user._id,
      } ,{ new : true});

      return res.status(200).json({
        success : true ,
        message :"Shop updated successfully!",
        shop
      })

    }

  } catch (error) {
    console.log("Error in creating shop controller ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create shop!",
    });
  }
});
