import "react-toastify/dist/ReactToastify.css"

import React, { useState } from 'react'
import {ToastContainer, toast} from "react-toastify"

import { createTodo } from "../../services/api";

export const AddTodo = ({setRefresh}) => {
    
    const [todo,setTodo] = useState("");

    const handleChange=(e)=>{
        setTodo(e.target.value)        
    }
    const handleSubmit=async ()=>{
        if(todo===""){
            toast('Todo is required')
            return;
        }
        const result = await createTodo({desc:todo})
        if(result.data.statusCode===200){
            setTodo("")
            console.log("i came")
            setRefresh(new Date())
            toast("Todo Added")
            
        }else{
            toast(result.data.message)
        }
    }

  return (
    <div>
     <div className='modal mt-5' id='exampleModal'>
        <div className='modal-dialog' role="document">
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='modal-title'>Add New Todo</div>
              <button typeof='button'className='btn-close'
              data-bs-dismiss="modal"
              aria-label='close'>
                <span arial-hidden="true"></span>
              </button> 
            </div>
            <div className='modal-body'>
              <div className='form-body'>
                <textarea  value={todo} className='form-control' rows={4}  onChange={handleChange}></textarea>
              </div> 
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={handleSubmit}>Save Todo</button>
              <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={()=>setTodo("")} >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
