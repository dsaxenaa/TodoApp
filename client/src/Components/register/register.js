import "react-toastify/dist/ReactToastify.css"

import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"

import { Header } from '../partials/header.js'
import { Registerr } from '../../services/api';
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const naviagtion = useNavigate()
    const [form,setForm] = useState({
        username:"",
        password:"",
        name:"",
        email:""
    })
    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            return naviagtion("/home")
        }
    },[])
    
    const [errors,setErrors] = useState(null);
    
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async()=>{
        const result = await Registerr(form)
        console.log("user",result)
        setErrors(null)

        if(result.data.statusCode==200){
            naviagtion("/login")
        
        }
         if(result.data.statusCode==201){
            setErrors(result.data.data)
        }
        if(result.data.statusCode==403){
            toast(result.data.message)
        }
    }

  return (
    <div><Header/>
    <div className='conatiner'>
        <ToastContainer/>
        <div className='row justify-content-md-center mt-4'>
            <div className='col-lg-5 card border-primary mb-3' >
                <div className='card-header h4 text-center'>Regsiter an Account</div>
                <div className='card-body'>
                    
                    <div className="form-group">
                        <label className='col-form-label mt-2'>Name</label>
                        <input type='text' placeholder='name' className='form-control' name='name' onChange={handleChange} />
                        {errors?.name && <small  className='form-text text-muted'>
                        {errors.name.msg}</small>}
                    </div>
                    <div className="form-group">
                    <label className='col-form-label mt-2'>Username</label>
                        <input type='text' placeholder='username' className='form-control' name='username' onChange={handleChange}/>
                        {errors?.username && <small  className='form-text text-muted'>
                        {errors.username.msg}</small>}
                    </div>
                    <div className="form-group">
                    <label className='col-form-label mt-2'>Email</label>
                        <input type='email' placeholder='email' className='form-control' name='email' onChange={handleChange}/>
                        {errors?.email && <small  className='form-text text-muted'>
                        {errors.email.msg}</small>}
                    </div>
                    <div className="form-group">
                    <label className='col-form-label mt-2'>Password</label>
                        <input type='password' placeholder='password' className='form-control' name='password' onChange={handleChange}/>
                        {errors?.password && <small  className='form-text text-muted'>
                        {errors.password.msg}</small>}
                    </div>
                    <div className='row justify-content-md-center form-group mt-3'>
                        <button type='button' className='col-sm-6 btn btn-outline-secondary center' onClick={handleSubmit} >Submit</button>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    </div>
  )
}
