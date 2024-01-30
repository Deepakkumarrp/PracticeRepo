const express = require("express");
const app = express();

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
    console.log("Blog page");
    res.send({"msg":"This is a Blog Page"})
})
app.listen(4500,() => {
    console.log("running at 4500");
})