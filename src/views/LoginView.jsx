import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginView = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(true)
    const { login, user } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        //login the user using the context function
        let loggedin = await login(email, password)
        if (loggedin){
          navigate('/collections')
        }
        setSuccess(loggedin)
    }


  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="email" placeholder='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
        {
          !success && <p style={{color: 'red'}}>Invalid Email or Password</p>
        }
    </div>
  )
}

export default LoginView