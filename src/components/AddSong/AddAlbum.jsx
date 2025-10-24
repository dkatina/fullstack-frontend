import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import './AddAlbum.css'

const AddAlbum = ({ album }) => {
    const API_URL = import.meta.env.VITE_API_URL
    const { user, token, setMyAlbums, myAlbums, setSpotifyAlbums } = useAuth()
    const [clicked, setClicked] = useState(false)
    const albumData = {
        album_id: album.id,
        collection_type: album.album_group,
        cover_art: album['images'][0]['url'],
        release_date: album.release_date,
        spotify_link: album.external_urls.spotify,
        title: album.name,
        user_id: user?.id,
        total_tracks: album.total_tracks,
        artist_name: album.artists[0]['name']
    }

    //check if the current album is already included in myAlbums, if so set added to true and display somthing other than the add button
    

 
    const addAlbum = async () =>{
      
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
        if ('error' in data) {
          window.alert('Maximum number of albums reached (limit 5)')

        } else{
          console.log(data)
          setMyAlbums(data.collections)
          console.log("This button is for Album" + album.id)
          setSpotifyAlbums(prev => prev.filter((spotAlbum)=> spotAlbum.id != album.id))
        }}
        

   


  return (

      <button className='MyBtn' onClick={()=>addAlbum()}>Add Album</button> 
  

  )
}

export default AddAlbum