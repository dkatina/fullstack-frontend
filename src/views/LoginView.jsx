import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoginView = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, user } = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        //login the user using the context function
        await login(email, password)
    }


  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="email" placeholder='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
            <p>{user.email}</p>
        </form>
    </div>
  )
}

export default LoginView