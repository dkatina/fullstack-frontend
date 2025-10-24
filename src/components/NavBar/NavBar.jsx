import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './NavBar.css'

const NavBar = () => {
  const { token } = useAuth();
  return (
    <>
    <div id="navBar">
      
            <NavLink className={'navLink'} to='/'>HOME</NavLink>

            <NavLink style={{marginLeft: "12px"}}className={'navLink'} to='/login'>LOGIN</NavLink>
            {token&&
            <NavLink className={'navLink'} to='/collections'>ALBUMS</NavLink>
            }
       
    </div>
    <hr style={{width: "90%", margin: '0 auto', backgroundColor: 'black', border: 'none', height: '2px'}}/>
    </>
  )
}

export default NavBar