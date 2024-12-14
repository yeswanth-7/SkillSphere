const jwt = require('jsonwebtoken')
const {SECRET_USER_KEY} = require('../config.js');

function usermiddleware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,SECRET_USER_KEY);
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
    userMiddleware : usermiddleware
}