const access = (...permittedRoles) => {
   return (req,res,next) => {
        if(permittedRoles.includes(req.role)){
            next();
        }else{
            res.send({"mssg":"You're not Authorized to access this page"})
        }
   }
}

module.exports = {
    access
}