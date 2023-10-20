import "react-toastify/dist/ReactToastify.css"

import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"

import { Header } from '../partials/header.js'
import { Loginn } from '../../services/api';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const naviagtion = useNavigate()

    const [form,setForm] = useState({
        username:"",
        password:""
    })

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            return naviagtion("/home")
        }
    },[]);

    const [errors,setErrors] = useState(null);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async ()=>{
        console.log(form)
        try {
        const result = await Loginn(form)
        console.log(result)
        setErrors(null)

        if(result.data.statusCode==200){
            localStorage.setItem("user",JSON.stringify(result.data.data))
            naviagtion("/home")
        }
        else if(result.data.statusCode==201){
            setErrors(result.data.data)
        }
        else{
            toast(result.data.message)
            
        }} catch (error) {
            console.log(error)
        }
      
    
    }
    
  return (
    <div><Header/>
    <div className='container'>
        <div className='row justify-content-center mt-4' >
            <div className='col-lg-5 card border-primary mt-4' >
                <div className='card-body'>
                    <h4 className='card-title'>Login Now</h4>
                    <div className='form-group'>
                        <label htmlFor='exampleInputEmal' className='form-label mt-4' >
                            Username
                        </label>
                        <input 
                        type='text'
                        onChange={handleChange}
                        name='username'
                        className='form-control'
                       
                        aria-describedby='emailHelp'
                        placeholder='Enter email or username'
                        />
                        {errors?.username ?<small id='emailHelp' className='form-text text-muted'>
                        {errors.username.msg}</small>:<small className='form-text text-muted'>
                        We'll never share your email with anyone else </small>}
                        
                        
                    </div>
                    <div className='form-group'>
                        <label htmlFor='exampleInputEmal' className='form-label mt-4' >
                            Password
                        </label>
                        <input 
                        type='password'
                        onChange={handleChange}
                        name='password'
                        className='form-control'
                       
                        aria-describedby='emailHelp'
                        placeholder='Enter password'
                        />
                          {errors?.password && <small  className='form-text text-muted'>
                        {errors.password.msg}</small>}
                    </div>
                    <button type='button' onClick={handleSubmit} className='btn btn-primary mt-2'>LOGIN</button>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
    </div>
  )
}
