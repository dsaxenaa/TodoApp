import './landing.css'

import { Header } from '../partials/header'
import Image from './image.jpg'
import React from 'react'

export const Landing = () => {
    
  return (
    <div className='new'> 
    <Header/>

    <div className='d-flex align-items-center row h1 text-primary justify-content-center mt-4'>
        YOUR TO-DO APP
        <div className='row h2 text-info justify-content-center mt-4 '>
            Start making your plans
        </div>
    </div>
    </div>
  )
}
