import { Shop } from "../models/shop.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadnCloudinary } from "../utils/cloudinnary.js";

// create a shop

export const createShopAndEditShop = asyncHandler(async (req, res) => {
  try {
    const { name, shopCity, address, state } = req.body;

    if (
      [name, shopCity, address, state].some(
        (field) => typeof field !== "string" || field.trim() === ""
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields are required!",
      });
    }

    let shopPic;
    try {
      if (req.file) {
        const uploadRes = await uploadnCloudinary(req.file.path);
        shopPic = uploadRes.secure_url; // ✅ Only save URL
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error while uploading image!",
        error: error.message,
      });
    }

    // check if shop already exists
    const existedShop = await Shop.findOne({ shopOwner: req.user._id });

    let shop;
    if (!existedShop) {
      // create new
      shop = await Shop.create({
        name,
        shopCity,
        address,
        state,
        shopImage: shopPic, // required when creating
        shopOwner: req.user._id,
      });
    } else {
      // update existing
      shop = await Shop.findByIdAndUpdate(
        existedShop._id,
        {
          name,
          shopCity,
          address,
          state,
          // only update if new image uploaded, else keep old one
          ...(shopPic && { shopImage: shopPic }),
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: existedShop
        ? "Shop updated successfully"
        : "Shop created successfully",
      shop,
    });
  } catch (error) {
    console.log("error while edit and update controller", error);

    return res.status(500).json({
      success: false,
      message: "Failed to edit and update",
      error: error.message,
    });
  }
});

// get shop controller

export const getShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ shopOwner: req.user._id })

  if (!shop) {
    return res.status(404).json({
      success: false,
      message: "No shop found!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Here is your shop!",
    shop,
  });
});
