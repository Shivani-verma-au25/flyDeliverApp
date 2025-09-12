import mongoose, { Schema } from "mongoose";

const productSchema = new Schema ({
    name : {
        type: Strng ,
        required : true,
        trim : true
    },
    productImage : {
        type : String,
        required :true
    },
    shop : {
        type :Schema.Types.ObjectId,
        ref : Shop,
        required : true
    },
    category : {
        type :String,
        enum : ['Snakes',"Main Courses","Desserts","Pizzas","Bugers","Sandwichens","South Indian","North Indian","Chinese","Fast Food","Others"],
        required :true
    },
    price : {
        type : Number,
        min : [0],
        required :true
    },
    foodType : {
        type :String,
        enum : ["Veg" , "Non-Veg"],
        required: true
    },


} , {timestamps :true})


export const Product = mongoose.model('Product',productSchema);
