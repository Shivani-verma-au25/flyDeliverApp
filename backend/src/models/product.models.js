import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Main Courses",
        "Desserts",
        "Pizzas",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: [0],
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
    },
    rating :{
      average :{ 
        type : Number,
        default : 0
      },
      count : {
        type:Number,
        default : 0
      }
    },

  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
