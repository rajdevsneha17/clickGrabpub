const mongoose = require('mongoose');

const GiveService = new mongoose.Schema({
   name:{
    type:String
   },
   service:{
    type:String
   },
   phoneNumber:{
    type:Number
   },
   address:{
    type:String
   },
//    imagefile:{
//     type:String
//    },
  
  fromTime: {
    type: String,
 
  },
  toTime: {
    type: String,
 
  },
  currentDate: {
    type: Date,
    default: Date.now // Set default value to current date/time when document is created
  }
});

module.exports = mongoose.model('GiveService', GiveService);
