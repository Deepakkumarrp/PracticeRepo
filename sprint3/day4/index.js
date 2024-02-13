const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { auth } = require("./middleware/auth.middleware");
const { access } = require("./middleware/access.middleware");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/users",userRouter);

app.get("/",(req,res) => {
    res.send({"mssg":"working"})
})
// restricted routes


// accessed by buyer/seller
app.get("/products",auth,access("buyer","seller"),(req,res) => {
    res.send({"mssg":"products data"})
})

// customer/seller
app.get("/salesdata",auth,access("customer","seller"),(req,res) => {
    res.send({"mssg":"sales data"})
})

// seller
app.patch("/products/:id",auth,access(),(req,res) => {
    res.send({"mssg":"Update the product"})
})

// seller
app.delete("/products/:id",auth,access(),(req,res) => {
    res.send({"mssg":"Deleted "})
})

app.listen(8080,async(res,req) => {
    try{
        await connection;
        console.log("Connected to Db.")
        console.log(`Server is running at ${process.env.PORT}`)
    }catch(err){
        console.log(err);
    }
})