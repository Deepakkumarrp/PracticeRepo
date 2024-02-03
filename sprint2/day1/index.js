const express = require("express");
const app = express();
const fs = require("fs");

// app.use((req,res,next) => {
//     console.log("Hello from middleWare");
//     if(req.url === '/'){
//         next();
//     }else{
//         res.send("You're not allowed")
//     }
// })

app.use((req,res,next) => {
    const time = new Date().getTime();
    const URL = req.url;
    const newData = {
        URL ,
        time
    }
    fs.appendFileSync('./dataRecord.txt',JSON.stringify(newData))
    next();
})

app.get("/",(req,res) => {
    console.log("Home page");
    res.send({"msg":"This is a Home Page"})
})
app.get("/about",(req,res) => {
    console.log("About page");
    res.send({"msg":"This isAbout Page"})
})
app.get("/contact",(req,res) => {
    console.log("contact page");
    res.send({"msg":"This is a contact Page"})
})
app.get("/blog",(req,res) => {
    fs.readF
    console.log("Blog page");
    res.send({"msg":"This is a Blog Page"})
})


app.listen(4500,() => {
    console.log("running at 4500");
})