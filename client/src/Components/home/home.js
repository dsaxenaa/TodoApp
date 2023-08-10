import "react-toastify/dist/ReactToastify.css"

import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"

import { AddTodo } from '../partials/addTodo.js'
import { Header } from '../partials/header.js'
import { Todo } from '../partials/todo.js'
import { getTodo } from '../../services/api.js'

export const Home = () => {

  const [list,setList] = useState([]);
  const [user,setUser] =useState({})
  const [search,setSearch] =useState("")
  const [refresh,setRefresh] =useState()
  const [filter,setFilter] =useState([])
  

  useEffect(()=>{
    fetchTodo();
  },[refresh])

 
  async function fetchTodo(){
    await getTodo().then((response)=>{
      const result = response.data;
      if(result.statusCode===200){
      setUser(result.data)
      setList(result.data.todos.reverse())
      }
    })
    }
    useEffect(()=>{
      if(search===""){
        setFilter(list)
      }else{
        const filterList = list.filter((todo)=>todo.desc.toLowerCase().includes(search.toLowerCase().trim()))
        setFilter(filterList)
      }
      
    },[list,search])
  
  

  return (
    <div>
      <Header search={search} setSearch={setSearch}/>
      <ToastContainer/>
      <div className='container' >
        <h2 className="h2 md-3 justify-content-center mt-3" >Hi! {user.name}.
        {
          
          list.length===0?" Your Todo List is Empty.": search===""?" Here's your Todo List!":filter.length===0 && search!=="" ?" No such Todos Found :(":" Your searched Todos."
        }
        </h2>
        <div className='row justify-content-center-md-center mt-4'>
          {filter.map((todo)=> <Todo todo={todo} key={todo._id} setRefresh={setRefresh} />)}
          
        </div>
      </div>
      <div className='' style={{position:'fixed' ,right:50, bottom:50, zIndex:1030}}>
        <button className='btn btn-outline-light'type='button' data-bs-toggle="modal" data-bs-target="#exampleModal" >ADD</button>
      </div>
      <AddTodo setRefresh={setRefresh}/>
    </div>
  )

  }