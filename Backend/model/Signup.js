const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:Number
    }
});

module.exports = mongoose.model('signupSchema', signupSchema);
