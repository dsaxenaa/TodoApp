import Login from "../controllers/login.js";
import { LoginSchema } from "../validation/login.js";
import { MarkTodo } from "../controllers/markTodo.js";
import Register from "../controllers/register.js";
import { RegisterSchema } from "../validation/register.js";
import { RemoveTodo } from "../controllers/removeTodo.js";
import { TodoList } from "../controllers/todoList.js";
import {check} from "express-validator"
import { createTodo } from "../controllers/todo.js";
import express from 'express'

const apiRoute = express.Router()
export  const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema ,Register)
apiRoute.post('/login',LoginSchema, Login)

apiProtected.post('/createTodo',[check("desc","Todo desc is required").exists()], createTodo)
apiProtected.get('/todoList', TodoList)
apiProtected.post('/markTodo',
[check("todo_id","Todo is is required").exists()], MarkTodo)

apiProtected.post('/deleteTodo',
[check("todo_id","Todo is is required").exists()], RemoveTodo)

export default apiRoute;