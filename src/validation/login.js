import {check} from "express-validator"

export const LoginSchema = [

    check('username',"username is required").exists()
    .trim().isLength(
        {min:6,max:30}
    ),

    check('password',"password is requried").exists().trim().isLength({min:6,max:20}),
    


]