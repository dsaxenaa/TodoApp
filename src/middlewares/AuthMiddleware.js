import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js"

import Jwt from "jsonwebtoken"
import { jsonGenerate } from "../utils/helpers.js"

const AuthMiddleware = (req,res,next) =>{
    if(req.headers["auth"]===undefined){
        res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"))
    }

    const token = req.headers['auth']
    try {
        const decoded = Jwt.verify(token,JWT_TOKEN_SECRET)
        console.log(decoded)
        req.userId=decoded.userId;
        return next();
    } catch (error) {
        res.json(jsonGenerate(StatusCode.INVALID_TOKEN,"Invalid Token"))
        
    }
}

export default AuthMiddleware