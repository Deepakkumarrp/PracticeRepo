const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");

const auth = ((req,res,next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if(accessToken){
        jwt.verify(accessToken,"secret",async (err,decoded) => {
            if(decoded){
                const {userID} = decoded
                const user = await UserModel.findOne({_id:userID})
                const required_role = user.role;
                req.role = required_role;
                next();
            }else{
                res.send({"mssg":"Not authorized","err":err})
            }
        })
    }else{
        res.send({"mssg":"Please login"})
    }
})

module.exports = {
    auth
}