const express = require("express");

const app = express();

const {connection} = require("./db");
const { userRouter } = require("./routes/user.routes");

app.use(express.json());
app.use("/users",userRouter)


app.listen(4500, async()=>{
    // connect mongoose here;
    try{
        await connection;
        console.log("runnning at 4500");
        console.log("Connected to the DB.")
    }catch(e){
        console.log(e);
    }
})