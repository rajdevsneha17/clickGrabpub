const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
const LoginSchema=new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    fname:{
        type:String
    },
})
module.exports=mongoose.model("LoginSchema",LoginSchema)