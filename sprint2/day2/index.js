const express = require("express");
const app = express();
const fs = require("fs");

app.get("/",(req,res) => {
    res.send({"msg":"this is a home page"});
})

// Create an API endpoint for a weather API, as per the city passed in the query.
// Provide the details of temperature in that city.
app.get("/search",(req,res) =>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    const {city} = req.query;
    if(data[city]){
        res.send({"msg":`The tempearure of the ${city} is ${data[city]}.`})
    }else{
        res.send({"msg":`Please enter search query.`})
    }
})

app.get("/students/:studentID",(req,res) => {
    const {studentID} = req.params;
    console.log(studentID);
    res.send({"msg":`The details of student with ${studentID}`});
})

// Patch req
app.patch("/update/student/:id",(req,res) => {
    const {id} = req.params;
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    const payload = req.body;
    const req_data = data.filter((ele) => {
        return ele.id == id;
    })
    console.log(req_data);
    res.send("WIP");
})

app.listen(8080,()=>{
    console.log("runnning");
})