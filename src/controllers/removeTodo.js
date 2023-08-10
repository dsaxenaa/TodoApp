import { StatusCode } from "../utils/constants.js";
import Todo from "../models/todo.js";
import User from "../models/users.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator"

export const RemoveTodo = async(req,res) =>{
    const error = validationResult(req);
    if(error.isEmpty()){
        try {
            const result = await Todo.findOneAndDelete({
                _id:req.body.todo_id,
                userId:req.userId
            });
            if(result){
                const user = await User.findOneAndUpdate({
                    _id:req.userId,
                },{$pull:{todos:req.body.todo_id}
                    
                })
                res.json(jsonGenerate(StatusCode.SUCCESS,"Deleted",null))
            }
            
        } catch (error) {
            res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Something went wrong"))
            
        }
        
    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",error.mapped()))
    
}