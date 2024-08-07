const mongoose=require("mongoose")
const BookService=new mongoose.Schema({
    name:{
        type:String,
    },
    phone:{
        type:Number
    },
     address:
        {
        type:String
        },
        serviceProviderphoneNumber:{
            type:Number
        }
    
})
module.exports = mongoose.model('BookService', BookService);
