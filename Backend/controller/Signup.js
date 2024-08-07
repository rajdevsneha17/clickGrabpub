const signupSchema = require("../model/Signup");
const otpSchema=require("../model/OTP")
const LoginSchema=require("../model/User")
const { generateOTP } = require("./generateOTP");
exports.Signup = async (req, res) => {

    const otp=generateOTP()
    try {
        const { fname,lname, password, email } = req.body;

        // Check if user already exists
        const exist = await signupSchema.findOne({ email:email });
        if (exist) {
          
            res.json("exist")
        } else {
           // If user does not exist, create new user
            const respo = await otpSchema.create({
                fname,
                lname,
                email,
                password,
                otp:otp
            });
            return res.status(200).json({
                success: true,
                data: respo,
                message: 'OTP submitted successfully'
            });
           
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).send({ result: "Internal server error" });
    }
};
