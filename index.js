import apiRoute, { apiProtected } from './src/routes/api.js'

import AuthMiddleware from './src/middlewares/AuthMiddleware.js';
import cors from 'cors'
import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose';
import morgan from 'morgan'
import path from 'path';

dotenv.config()
const URL = process.env.URL

const app = express()
app.use(cors())


mongoose.connect(URL,{ useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
    console.log("Connected");
})
.catch(e=>{
    console.log(e)
})

const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(morgan('dev'))
app.use(
    express.urlencoded()
);

app.use('/api/',apiRoute)
app.use('/api/',AuthMiddleware,apiProtected)

if(process.env.NODE_ENV ="production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})