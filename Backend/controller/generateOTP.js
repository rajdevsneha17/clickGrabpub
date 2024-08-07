const otpGenerator=require("otp-generator")
exports.generateOTP=async()=>{
    const otp=otpGenerator.generate(6, 
        { upperCaseAlphabets: false, 
        specialChars: false,
        lowerCaseAlphabets:false }
    
    );
    return otp;
}
