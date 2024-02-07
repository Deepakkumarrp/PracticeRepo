const express = require("express");
const app = express();
require("dotenv").config();
const {connection} = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors")
const jwt = require("jsonwebtoken")


app.use(cors());
app.use(express.json());
app.use("/users",userRouter);



app.get("/",(req,res) => {
    res.send({"msg":"This is a Home Route."})
})

app.get("/movies",(req,res) => {
    const {token} = req.query;
    jwt.verify(token, 'shhhhh',(err,decoded) =>{
        if(decoded){
            console.log(decoded);
            res.send({"mssg":"Movies data.."})
            
        }else{
            res.send({"mssg":"You're not authorized."})

        }
    });
    // if(token == "abc123"){
    //     res.send({"mssg":"Movies data.."})
    // }else{
    //     res.send({"mssg":"You're not authorized."})
    // }
})

app.get("/series",(req,res) => {
    res.send({"mssg":"Series data.."})
})

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to db.");
        console.log(`Running at ${process.env.port}.`);
    }catch(e){
        console.log(e);
    }
})