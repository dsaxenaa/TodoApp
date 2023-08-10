import { StatusCode } from "../utils/constants.js";
import Todo from "../models/todo.js";
import User from "../models/users.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator"

export const createTodo = async (req,res) =>{
    const error = validationResult(req);
    if(error.isEmpty()){
        try {
            const result = await Todo.create({
                userId:req.userId,
                desc:req.body.desc
            })
            if(result){
                const user = await User.findOneAndUpdate({_id:req.userId},
                    {
                        $push:{todos:result}
                    })
                    res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created Successfully",result))
            }
            
        } catch (error) {
            res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Something went wrong", error))
            
        }
        
    }
    res.json(jsonGenerate(StatusCode.MISSING_FIELD,"Todo is required",error.mapped()))
}