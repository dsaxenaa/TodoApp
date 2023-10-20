import { ADDTODO, DELETETODO, GETTODO, LOGIN, MARKTODO, REGISTER } from './apiConstants'

import axios from 'axios'

export const Loginn = async(data)=>{
    return await axios.post(LOGIN,data)
}
export const Registerr = async(data)=>{
    return axios.post(REGISTER,data)
}

export const createTodo = async (data)=>{
    let token = getToken();
    return axios.post(ADDTODO,data,{
        headers:{
            auth:token
        }
    })
}

export const deleteTodo = async(data)=>{
    let token = getToken();
    return axios.post(DELETETODO,data,{
        headers:{
            auth:token
        }
    })
}

export const markTodo = async(data)=>{
    let token = getToken();
    return axios.post(MARKTODO,data,{
        headers:{
            auth:token
        }
    })
}


export const getTodo = async ()=>{
    let token = getToken();    
    return axios.get(GETTODO,{
        headers:{
            auth:token
        }
    })
}


function getToken(){
    let user =localStorage.getItem('user');
    if(!user) return
    const userObj = JSON.parse(user);
    return userObj.token
}