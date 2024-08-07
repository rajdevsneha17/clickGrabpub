// const dataa=require("../model/Signup")
// let nodemailer = require('nodemailer');
// // const otp=require("../model/OTP")
// const bcrypt=require("bcryptjs");
// const { generateOTP } = require("./generateOTP");
// const OTP=require("../model/OTP")
// const transporter = nodemailer.createTransport({
  
//   service: 'gmail',
//   port:465,
//   secure:true,
//   logger:true,
//   secureConnection:false,

//   auth: {

//     user: 'rajdevanju9@gmail.com',
//     pass: 'xeit hlfv jkxa uuae'
//   },
//   tls:{
//     rejectUnauthorized:true
//   }
// });
// exports.sendMail = async (req, res) => {
//   const{fname,lname,password,email}=req.body
//   const otp=generateOTP();
//   console.log("otp is",otp)
//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: email,
//    subject:'OTP from Click&Grab',
//    text:"your otp is",otp
//   };
//     const check=await dataa.findOne({email:email})
//     if(check){
//    return res.status(200).json("exist")
//     }
//     try{
//       const {otp}=req.body
//     //   const encryptedpassword=await bcrypt.hash(password,10)
//     const check = OTP.findOne({email:email})
//     if(check.otp===otp){
//         const response=await dataa.create({otp,fname,lname,email,password})
//         res.json("created")
//     }
         
    
    
  
   


// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })
// //info.response means the response from the mail server
// return res.status(200).json({
//             success:true,
//             data:response,
//             message:'entry created successfully'
//         })
//     }
 
// catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };






const dataa = require("../model/Signup");
let nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { generateOTP } = require("./generateOTP");
const otpSchema = require("../model/OTP");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  logger: true,
  secureConnection: false,
  auth: {
    user: 'rajdevanju9@gmail.com',
    pass: 'xeit hlfv jkxa uuae'
  },
  tls: {
    rejectUnauthorized: true
  }
});

exports.sendMail = async (req, res) => {
  const { fname, lname, password, email } = req.body;
  const otp = await generateOTP();
  console.log("OTP is", otp);
  
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'OTP from Click&Grab',
    text: `Your OTP is ${otp}`
  };

  const check = await dataa.findOne({ email: email });
  if (check) {
    return res.status(200).json("exist");
  }

  try {
    // Save the generated OTP to the OTP collection with a timestamp
    await otpSchema.create({ email: email, otp: otp });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// exports.verifyOTP = async (req, res) => {
//     console.log("verifyotp called");
//     console.log("Request body:", req.body);
//     const { email, otp, fname, lname, password } = req.body;
  
//     try {
//     //   const otpEntry = await otpSchema.findOne({ email: email });
  
//     //   if (!otpEntry) {
//     //     return res.status(400).json({ success: false, message: 'OTP not found for this email' });
//     //   }
  
//       const currentTime = new Date();
//       const otpCreationTime = new Date(otpEntry.createdAt);
//       const timeDifference = (currentTime - otpCreationTime) / 1000; // difference in seconds
  
//       if (timeDifference > 300) { // 300 seconds = 5 minutes
//         return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
//       }
  
//       if (otpEntry.otp !== otp) {
//         return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
//       }
  
//       const encryptedPassword = await bcrypt.hash(password, 10);
//       const response = await dataa.create({ fname, lname, email, password: encryptedPassword });
  
//       // Optionally delete the OTP entry after successful verification
//     //   await OTP.deleteOne({ email: email });
  
//       return res.status(200).json({
//         success: true,
//         data: response,
//         message: 'Entry created successfully'
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   };
 // Ensure correct path to the model


exports.verifyOTP = async (req, res) => {
  console.log("verifyotp called");
  console.log("Request body:", req.body);
  
  const { email, otp, fname, lname, password } = req.body;
  
  try {
    const otpEntry = await otpSchema.findOne({ email: email });

    if (!otpEntry) {
      return res.status(400).json({ success: false, message: 'OTP not found for this email' });
    }

    const currentTime = new Date();
    const otpCreationTime = new Date(otpEntry.createdAt);
    const timeDifference = (currentTime - otpCreationTime) / 1000; // difference in seconds

    if (timeDifference > 300) { // 300 seconds = 5 minutes
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    if (otpEntry.otp.toString().trim() !== otp.toString().trim()) {
        return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
      }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const response = await dataa.create({ fname, lname, email, password: encryptedPassword });

    // Optionally delete the OTP entry after successful verification
    await otpSchema.deleteOne({ email: email });

    return res.status(200).json({
      success: true,
      data: response,
      message: 'Entry created successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
