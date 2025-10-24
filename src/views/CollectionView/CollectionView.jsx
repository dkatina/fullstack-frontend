import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import AlbumList from '../../components/Albumlist/AlbumList'
import './CollectionView.css'

const CollectionView = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const { spotifyToken, artist_id,  myAlbums, spotifyAlbums } = useAuth()
    // const [spotifyAlbums, setSpotifyAlbums] = useState([])
    

    // useEffect (()=>{
    //     // Getting all available albums from spotify
    //     const getArtistAlbums = async () =>{
    //     const response = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums`, {
    //         method:'GET',
    //         headers:{
    //             'Authorization': 'Bearer '+ spotifyToken
    //         }
    //     })

    //     const data = await response.json()
    //     console.log(data.items)
    //     setSpotifyAlbums(data.items)

        
    //     }

    //     getArtistAlbums();

    // }, []) //Empty Dependency Array to only run this on MOUNT

  return (
    <div id="CollectionView">
        <h1>Available Albums</h1>
        <AlbumList albums={spotifyAlbums} type='spotify'/>
        <h1>Your Showcase</h1>
        <AlbumList albums={myAlbums} type='myalbums'/>
    </div>
  )
}

export default CollectionView