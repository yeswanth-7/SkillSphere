const jwt = require('jsonwebtoken');
const {SECRET_ADMIN_KEY} =  require('../config');

function adminmiddleware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,SECRET_ADMIN_KEY);
    if(!decode){
        return res.status(401).json({
            message : "user not authenticated",
            error : "Invalid token"
        })
    }else{
        req.user = decode.id;
        next();
    }
}

module.exports = {
    adminmiddleware: adminmiddleware
}