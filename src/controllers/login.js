import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js"

import Jwt from "jsonwebtoken"
import User from "../models/users.js";
import bcrypt from 'bcrypt'
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";

const Login = async (req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {username,password}=req.body;
        const user = await User.findOne({username:username})

        if(user){
            const verified = bcrypt.compareSync(password,user.password)
            if(verified){
                const token = Jwt.sign({userId:user._id}, JWT_TOKEN_SECRET)
                res.json(jsonGenerate(StatusCode.SUCCESS,"Login Successful",{userId:user._id,token:token}))
                
            }else{
                res.json(jsonGenerate(StatusCode.WRONG_CREDENTIALS,"Wrong password"))
            }

        }
        else{
            res.json(jsonGenerate(StatusCode.USER_DOES_NOT_EXIST,"No such user found"))
        }

        
    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()))
}

export default Login;