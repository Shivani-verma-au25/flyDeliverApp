
import mongoose, {Schema} from 'mongoose';

const shopSchema = new Schema({
    name : {
        type :String,
        required :true ,
        trim : true
    },
    shopImage : {
        type : String,
        required : true
    },
    shopOwner : {
        type : Schema.Types.ObjectId,
        req : 'User',
        required : true
    },
    shopCity : {
        type :String,
        required : true,
    },
    state : {
        type :String,
        required  : true
    },
    address : {
        type : String,
        required : true
    },
    items : [
        {
            type :Schema.Types.ObjectId,
            ref : "Product"
        }
    ]



},{ timestamps : true});


export const Shop = mongoose.model("Shop",shopSchema);