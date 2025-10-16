import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <h1>WM</h1> 
        <ul>
            <NavLink to='/'>HOME</NavLink>
            <NavLink to='/login'>LOGIN</NavLink>
        </ul>
    </div>
  )
}

export default NavBar