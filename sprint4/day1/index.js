const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
require("dotenv").config();
const app = express();

app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async() => {
    try{
        await connection;
        console.log("Connection to DB.")
        console.log(`Server is running at ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
})