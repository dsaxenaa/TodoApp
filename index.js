import apiRoute, { apiProtected } from './src/routes/api.js'

import AuthMiddleware from './src/middlewares/AuthMiddleware.js';
import { URL } from './src/utils/constants.js';
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose';

const app = express()
app.use(cors())

mongoose.connect(URL,{ useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
    console.log("Connected");
})
.catch(e=>{
    console.log(e)
})

const PORT = 8000;
app.use(express.json())

app.use('/api/',apiRoute)
app.use('/api/',AuthMiddleware,apiProtected)


app.listen(PORT,()=>{
    console.log("Server is running");
})