import Jwt from "jsonwebtoken"
import { StatusCode } from "../utils/constants.js";
import User from "../models/users.js";
import bcrypt from "bcrypt"
import { jsonGenerate } from "../utils/helpers.js";
import {validationResult} from "express-validator"

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET
const Register = async (req,res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {name, username,password,email} = req.body;
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password,salt);
        
        const exists = await User.findOne({$or:[{
            email:email
        }, {
            username:username
        }
    ]})
        if(exists){
            return res.json(jsonGenerate(StatusCode.ALREADY_EXISTS,"Username already exists"))
        }
        else{
            try {
                const result = await User.create({
                    name:name,
                    password:newpassword,
                    email:email,
                    username:username
                })

                const token = Jwt.sign({userId:result._id}, JWT_TOKEN_SECRET)
                
                return res.json(jsonGenerate(StatusCode.SUCCESS,"Registration successful", {userId:result._id,token:token}))
            } catch (error) {
                console.log(error)
            }   
        }
    }
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()))

}

export default Register;