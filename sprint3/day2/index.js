const express = require("express");
const app = express();
require("dotenv").config();
const {connection} = require("./config/db");
const { userRouter } = require("./routes/user.routes");

app.use(express.json());
app.use("/users",userRouter);



app.get("/",(req,res) => {
    res.send({"msg":"This is a Home Route."})
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