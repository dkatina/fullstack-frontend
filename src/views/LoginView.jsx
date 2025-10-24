import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './LoginView.css'

const LoginView = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(true)
    const { login, user } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        // login the user using the context function
        let loggedin = await login(email, password)
        if (loggedin){
          navigate('/collections')
        }
        setSuccess(loggedin)
    }

  return (
    <div className="login-container">
      <div className="login-card" role="main" aria-labelledby="login-title">
        <h2 id="login-title" className="login-title">Sign in</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            <span className="visually-hidden">Email</span>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="login-label">
            <span className="visually-hidden">Password</span>
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          <button className="login-button" type="submit">Sign In</button>
        </form>

        {!success && <p className="login-error" role="alert">Invalid email or password</p>}
      </div>
    </div>
  )
}

export default LoginView