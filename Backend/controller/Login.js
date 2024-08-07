const LoginSchema = require("../model/User");
const signupSchema=require("../model/Signup")

exports.login = async (req, res) => {
    try {
        const { fname, password, email } = req.body;

        // Check if user already exists
        const exist = await signupSchema.findOne({ email });
        if (exist) {
            const respo = await LoginSchema.create({
                fname,
                email,
                password
            });
            return res.status(200).json({
                success: true,
                data: respo,
                message: 'Login successfully'
            });
            
        } else {
            // If user does not exist, create new user
            res.json("notexist")
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ result: "Internal server error" });
    }
};