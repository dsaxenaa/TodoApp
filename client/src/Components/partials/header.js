import {Link, useNavigate} from "react-router-dom"
import React, { useEffect, useState } from 'react'

export const Header = ({search,setSearch}) => {


  const [user,setUser] = useState(null)
  const navigation = useNavigate()

  useEffect(()=>{
    const u =localStorage.getItem('user');
    setUser(u)
  },[])
  const handleLogout=()=>{
    localStorage.clear();
    navigation('/')
    
  }
  


  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  return (
    <div><nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div className="container-fluid">
      {
        user ? <Link className="navbar-brand" to="/home">TODO APP</Link>:<Link className="navbar-brand" to="/">TODO APP</Link>
      }
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          {
            user &&   <li className="nav-item">
            <Link className="nav-link active" to="/home">Home</Link>
          </li>
          }
        
          {
            !user && <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          }
          {
            !user && <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          }
          
          {
            user && <li className="nav-item">
            <a className="nav-link" style={{cursor:"pointer"}} onClick={handleLogout}>LOGOUT</a>
          </li>
          }
          
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </li> */}
        </ul>
        {
          user && <form className="d-flex">
          <input className="form-control me-sm-2" type="search" placeholder="Search" onChange={handleSearch} value={search}/>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit" >Search</button>
        </form>
        }
      </div>
    </div>
  </nav></div>
  )
}
