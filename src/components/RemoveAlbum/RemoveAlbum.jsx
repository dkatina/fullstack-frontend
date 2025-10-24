import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import '../AddSong/addAlbum.css'

const RemoveAlbum = ({ album }) => {
    const [clicked, setClicked] = useState(false)
    const { token, setMyAlbums, myAlbums, setSpotifyAlbums } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL

    
    const removeAlbum = async () =>{ //calling function directly on click due to weird interaction with clicked state across all buttons.
        console.log('loading button for album' + album.title)
    
        
        const response = await fetch(API_URL + `/collections/${album.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await response.json()
        setMyAlbums(data.collections)
        //Add album back to spotify list
        

    
    }




  return (
    <button className={"MyBtn"} onClick={()=>removeAlbum()}>Remove</button>
  )
}

export default RemoveAlbum