import React, { createContext, useContext, useState, useEffect } from "react";

//creating the auth context
const AuthContext = createContext();

//create hook to consume context (give access to context variables)
export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

const API_URL = import.meta.env.VITE_API_URL
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const artist_id = '2cTWfmhgzCiU5JWCcePyii'


//Create the Context Provider (wrapper that I will place over my app)
export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null) //user will be an object in JSON
    const [token, setToken] =useState(localStorage.getItem('token') || null)
    const [spotifyAlbums, setSpotifyAlbums] = useState([])
    const [spotifyToken, setSpotifyToken] = useState(localStorage.getItem('spotifyToken') || null)
    const [myAlbums, setMyAlbums] = useState([])

    useEffect (()=>{
        const getSpotToken = async () =>{
            console.log('getting token')
            fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
            .then(r => r.json())
            .then(r => {
                setSpotifyToken(r.access_token)
                localStorage.setItem('spotifyToken', r.access_token)
            })

            //Getting all of my albums from my API
            const response2 = await fetch(API_URL+'/collections', {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer '+ token
                }
            })

            const data2 = await response2.json()
            console.log(data2)
            setMyAlbums(data2)

            //Getting Spotify Albums
            const response3 = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums`, {
                method:'GET',
                headers:{
                    'Authorization': 'Bearer '+ spotifyToken
                }
                })

            const data = await response3.json()
            console.log(data.items)
            setSpotifyAlbums(data.items)


            

        };

        getSpotToken()
    }, []) //With an empty dependency array this will only run on mount



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
        console.log(data)
        if ('error' in data){ //checking the login response for an error from my backend
            return false
        }
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        return true
    }

    const value = {
        token,
        user,
        login,
        spotifyToken,
        artist_id,
        myAlbums,
        setMyAlbums,
        spotifyAlbums,
        setSpotifyAlbums
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )



}