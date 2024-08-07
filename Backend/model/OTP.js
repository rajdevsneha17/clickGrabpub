const mongoose=require("mongoose")
const otpSchema=new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    password:{
        type:String,
    },
   email:{
    type:String,
   },
    otp:{
        type:Number
    },
    createdAt: { type: Date, default: Date.now, expires: 300 }
})
module.exports=mongoose.model("otpSchema",otpSchema)