import {check} from "express-validator"

export const RegisterSchema = [

    check('name').exists().trim().isAlpha('en-US', {ignore: ' '}).withMessage("Name should be only alphabets"),
    check('username',"username is required").exists()
    .isAlphanumeric()
    .withMessage("Username should be alphanumeric")
    .trim().isLength(
        {min:6,max:20}
    ),

    check('password',"password is requried").exists().trim().isLength({min:6,max:12}),
    check('email',"email is required").exists().trim().isEmail()


]