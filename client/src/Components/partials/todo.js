import "react-toastify/dist/ReactToastify.css"

import {ToastContainer, toast} from "react-toastify"
import { deleteTodo, markTodo } from '../../services/api'

import React from 'react'
import moment from 'moment/moment'

export const Todo = ({todo, setRefresh}) => {

  const handleDelete=async()=>{
    const result = await deleteTodo({todo_id:todo._id})
    if(result.data.statusCode===200){
      toast("Todo Deleted!")
      setRefresh(new Date())
    }else{
      toast("Failed to delete, try again...")
    }
  }

  const handleMark=async()=>{
    const result =await markTodo({todo_id:todo._id})
    console.log(result)
    if(result.data.statusCode===200){
      toast("Updated")
      setRefresh(new Date())
    }else{
      toast(result.data.message)
    }
  }

  return (
    <div className='col-sm-3 mx-4 my-5 alert bg-dark'>
        <div className='card-header'>
            {moment(todo.date).fromNow()}
        </div>
        <div className='card-body'>
            <h4 className='card-title' style={{textDecoration: todo.isCompleted?'line-through':'none'}} >{todo.desc}</h4>
            <p className='card-text'>{
              todo.isCompleted?"Completed":"Not Completed"
            }</p>
        </div>
        <div className='actionButtons mt-2' style={{display:"flex",justifyContent:"space-between" , alignItems:"cenetr"}}>
          <button style={{backgroundColor:"red"}} onClick={handleDelete} >Delete</button>
          {
            todo.isCompleted?<button style={{backgroundColor:"gray"}} onClick={handleMark} >Unmark Todo</button>:<button style={{backgroundColor:"green"}} onClick={handleMark} >Mark Todo</button>
          }
          
          
        </div>
        
    </div>
  )
}
