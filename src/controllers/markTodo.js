import { StatusCode } from "../utils/constants.js";
import Todo from "../models/todo.js";
import User from "../models/users.js";
import { jsonGenerate } from "../utils/helpers.js";
import { validationResult } from "express-validator"

export const MarkTodo = async (req,res) =>{
    const error = validationResult(req);
    if(error.isEmpty()){
        try {
            const todo = await Todo.findOneAndUpdate({
                _id:req.body.todo_id,
                userId:req.userId
            },[
                {
                    $set:{
                        isCompleted:{
                            $eq:[false,"$isCompleted"]
                        }
                    }
                }
            ])
            if(todo){
                return res.json(jsonGenerate(StatusCode.SUCCESS,"Updated",todo))
            }else{
                return res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Something went wrong"))
            }
        } catch (error) {
            return res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Could not update"))          
        }
    }
    return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",error.mapped()))
}