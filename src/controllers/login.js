import Jwt from "jsonwebtoken"
import { StatusCode } from "../utils/constants.js"
import User from "../models/users.js";
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator";

dotenv.config()
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET

const Login = async (req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {username,password}=req.body;
        const user = await User.findOne({username:username})

        if(user){
            const verified = bcrypt.compareSync(password,user.password)
            if(verified){
                const token = Jwt.sign({userId:user._id}, JWT_TOKEN_SECRET)
                return res.send(jsonGenerate(StatusCode.SUCCESS,"Login Successful",{user,token:token}))
                
            }else{
                return res.json(jsonGenerate(StatusCode.WRONG_CREDENTIALS,"Wrong password"))
            }

        }
        else{
           return  res.json(jsonGenerate(StatusCode.USER_DOES_NOT_EXIST,"No such user found"))
        }

        
    }
   return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()))
}

export default Login;