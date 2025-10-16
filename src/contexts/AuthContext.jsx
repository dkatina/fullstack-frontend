import React, { createContext, useContext, useState, useEffect } from "react";

//creating the auth context
const AuthContext = createContext();

//create hook to consume context (give access to context variables)
export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

const API_URL = 'http://127.0.0.1:5000'


//Create the Context Provider (wrapper that I will place over my app)
export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null) //user will be an object in JSON
    const [token, setToken] =useState(localStorage.getItem('token') || null)



    //login function
    const login = async (email, password) =>{
        console.log('Trying to login')
        const response = await fetch(API_URL + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!response.ok){
            console.error('There was an issue logging in.')
        }

        const data = await response.json()// translating to js
        console.log('response data')
        console.log(data)
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
    }

    const value = {
        token,
        user,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )



}