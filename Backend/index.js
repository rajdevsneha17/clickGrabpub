const express=require("express")
const app=express()
const PORT=process.env.PORT||7005
const cors=require("cors")
const corsOptions = {
    origin: 'https://clickgrab-f.vercel.app',
    credentials:false,
    optionsSuccessStatus: 200, // For legacy browser support,
    
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  // Handle preflight requests for all routes
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://clickgrab-f.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
  });
app.use(
	cors())
app.use(express.json())

const routes=require("./routes/mainroutes")
app.use("/",routes)

app.listen(PORT,()=>{
console.log(`successfully running at ${PORT}`)
})

const dbconnect=require("./config/databse")
dbconnect();

app.get("/",(req,res)=>{
    res.send("running")
})