const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json())  //middleware

app.get("/data",(req,res) => {
    fs.readFile("./db.json","utf-8",(err,data) => {
        err ? res.send({"error":err}) : res.send(data);
    })
})

// API to get all the students
app.get("/students",(req,res) => {
    // 1. read the complete db
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // 2. filter out students
    const {students} = data;
    // 3. send the students as response
    res.send({"students" :students})
})

// Api to add the student data
app.post("/add/students",(req,res) => {
    const newData = req.body;
    // 1. read the complete data
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // 2. filter out students array 
    const {students} = data;
    students.push(newData);
    // 3. push/add the new data
    fs.writeFile("./db.json",JSON.stringify(data),(err) => {
        err ? res.send({"error":err}) : res.send({"message":"The new student has been added"});
    }) 
    // 4. append the data in the file
})


app.get("/teachers",(req,res) => {
    // 1. read the complete db
    let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // 2. filter out students
    const {teachers} = data;
    // 3. send the students as response
    res.send({"teachers" :teachers})
})


app.post("/add/teachers",(req,res) => {
    const newData = req.body;
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    // 2. filter out students array 
    const {teachers} = data;
    teachers.push(newData);
    // 3. push/add the new data
    fs.writeFile("./db.json",JSON.stringify(data),(err) => {
        err ? res.send({"error":err}) : res.send({"message":"The new teacher has been added"});
    }) 
    // 4. append the data in the file
})


// app.post("/addData",(req,res) => {
//     console.log("post req made")
//     console.log(req.body);
//     res.send("data has been added");
// })

app.listen(4500,() => {
    console.log("Server is running at 4500.")
});