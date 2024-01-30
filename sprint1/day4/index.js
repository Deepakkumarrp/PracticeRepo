const http = require("http");
const fs = require("fs");
// const dns = require("dns");

// dns.lookup("www.google.com",(err,address,family) =>{
//     console.log(err);
//     console.log(address);
//     console.log(family);
// })
// const data = fs.readFileSync("./db.json","utf-8");
const server = http.createServer((req,res) => {
        if(req.url === "/") res.end("Home Page")
        else if( req.url === '/about' ) res.end("About Page")
        else if(req.url === '/contact' ) res.end("Contact Page")
        else if(req.url === '/blogs' ) res.end("Blog Page")
        else if(req.url === '/addData' && req.method === "POST") {
            let str = "";
            req.on("data", (data_packets) => {
                str += data_packets;
            })
            req.on("end",() => {
                console.log(str);
            })
            // console.log(str);
            res.end("Data has been added")
        }
        else if( req.url === '/data' ) fs.readFile("./db.json","utf-8",(err,data) => {
            err ? res.end(err) : res.end(data);
        })
        else res.end("404 not found")
})

server.listen(8080, () =>{
    console.log("Server is running at port 8080.")
})