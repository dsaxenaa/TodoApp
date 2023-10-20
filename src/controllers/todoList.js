import { StatusCode } from "../utils/constants.js";
import User from "../models/users.js";
import { jsonGenerate } from "../utils/helpers.js";

export const TodoList = async (req,res) =>{
    try {
        const list = await User.findById(req.userId).select("-password").populate('todos').exec();
        return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo List", list))
        
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Can't load the list", error))
        
    }
}