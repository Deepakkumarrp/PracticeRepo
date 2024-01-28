const http = require("http");
const fs = require("fs");

// const data = fs.readFileSync("./db.json","utf-8");
const server = http.createServer((req,res) => {
    req.url === "/" ? res.end("Home Page")
        : req.url === '/about' ? res.end("About Page")
        : req.url === '/contact' ? res.end("Contact Page")
        : req.url === '/blogs' ? res.end("Blog Page")
        : req.url === '/data' ? fs.readFile("./db.json","utf-8",(err,data) => {
            err ? res.end(err) : res.end(data);
        })
        : res.end("404 not found")
})

server.listen(8080, () =>{
    console.log("Server is running at port 8080.")
})