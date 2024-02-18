const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,"masai",(err,decoded) => {
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.author = decoded.author; 
                next();
            }else{
                res.send({"mssg":"You're not authorized."})
            }
        })
    }else{
        res.send({"err":"no token found"})  
    } 
}

module.exports = {
    auth
}