const GiveService=require("../model/GiveService")
exports.giveService=async(req,res)=>{
   try{
    const{name,phoneNumber,service,address,fromTime,toTime}=req.body
  const user= await GiveService.create({
    name,phoneNumber,service,address,fromTime,toTime})

   res.json(user)
   }catch(err){
    console.error("Error fetching Data",err)
    res.status(500).json({ error: "Internal server error" });
   }
   
}