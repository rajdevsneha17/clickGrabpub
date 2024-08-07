const express=require("express")
const router=express.Router()

const {login}=require("../controller/Login")    
const{giveService}=require("../controller/GiveService")
const{sendMail,verifyOTP}=require("../controller/sendOTP")
router.post("/giveservice",giveService)
const{takeService}=require("../controller/TakeService")
const { bookService } = require("../controller/BookService")
const{Signup}=require("../controller/Signup")
router.get("/takeservice",takeService)
router.post("/bookservice",bookService)
router.post("/login",login)
router.post('/signup',Signup)
router.post("/sendotp",sendMail)
router.post("/verifyotp",verifyOTP)

module.exports=router