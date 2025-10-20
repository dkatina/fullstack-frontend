import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'

const AddAlbum = ({ album }) => {
    const API_URL = import.meta.env.VITE_API_URL
    const { user, token, setMyAlbums } = useAuth()
    const [clicked, setClicked] = useState(false)
    const [albumData, setAlbumData] = useState({
        album_id: album.id,
        collection_type: album.album_group,
        cover_art: album['images'][0]['url'],
        release_date: album.release_date,
        spotify_link: album.external_urls.spotify,
        title: album.name,
        user_id: user?.id
    })

    useEffect (()=>{
        const addAlbum = async () =>{
            if (clicked){
            console.log(albumData)
            const response = await fetch(API_URL + "/collections", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(albumData)
            })

            const data = await response.json()
            console.log(data)
            setMyAlbums(data.collections)
            }
        }

        addAlbum()
    }, [clicked])


  return (
    <button onClick={()=>setClicked(true)}>Add Album</button>
  )
}

export default AddAlbum