const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");
const { BlacklistToken } = require("../model/blacklist.model");

const auth = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const findToken = await BlacklistToken.findOne({blacklistToken:token})
    if(findToken){
        res.status(400).send({"mssg":"You have been logged out, Please log in again."})
    }
    // if(blacklist.includes(token)){
    //     res.send({"mssg":"You have been logged out, Please log in again."})
    // }
    jwt.verify(token, 'shhhhh',(err,decoded) =>{
        if(decoded){
            next();
        }else{
            res.send({"mssg":"You're not authorized.",err})
        }
    })
}


module.exports = {
    auth
}
