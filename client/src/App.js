import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom"

import { Header } from './Components/partials/header';
import { Home } from './Components/home/home';
import { Landing } from './Components/landing/landing';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { useState } from 'react';

function App() {


  return (
   <>
   <BrowserRouter>
   {/* <Header/> */}
   <Routes>
    <Route path="/home" element={<Home/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login  />} />
    <Route path="/" element={<Landing/>} />
   </Routes>
   </BrowserRouter>
   
   
   </>
  );
}

export default App;
