import mongoose,{Schema} from 'mongoose'
import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema  = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String ,
    },
    mobile: {
        type: String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', "owner" ,"deliveryPerson"]
    },    
    resetOtp :{
        type :String,
    },
    isOtpVerified :{
        type : Boolean,
        default : false
    },
    otpExpires : {
        type : Date,
        
    }

} , {timestamps : true})

// pre save hook for hashing password
userSchema.pre('save', async function (next) {
    //if password is not modified then skip hashing
    if (!this.isModified('password')) return next();
    // hash the password
    this.password = await bycript.hash(this.password, 10)
    next();
})


//method to compare password
userSchema.methods.comparePassword = async function (password){
    // if password is not provided
    if(!password) {
        console.log("Password is required for comparison");
        return;
    }
    // if use has password compare it
    return await bycript.compare(password , this.password);
}


//method to generate jwt token
userSchema.methods.generateJwtToken = async function (){
    return jwt.sign(
        {
        _id : this._id,
        role : this.role,
        email : this.email
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn : process.env.EXPRIES_IN} )
}


export const User = mongoose.model("User",userSchema);



