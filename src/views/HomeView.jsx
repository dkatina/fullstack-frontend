import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useEffect} from 'react' 

const HomeView = () => {
  const { myAlbums, spotifyToken  } = useAuth();
  const [ albumSongs, setAlbumSongs ] = useState([])

  const getAlbumSongs = async (token, albumId) =>{
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        method: 'GET',
        headers:{
            'Authorization': 'Bearer '+ token
        }
    } )

    const data = await response.json()
    return data
  }

  useEffect (()=>{
    const getAllAlbums = async () => {
    if (myAlbums.length > 0) {
      const results = await Promise.all(
        myAlbums.map(album =>
          getAlbumSongs(spotifyToken, album.album_id)
        )
      )

      setAlbumSongs(results)
      console.log('Fetched:', results)
    }
    };

    getAllAlbums()
  }, []) //empty depency array so this will only fire on mount


  return (
    <div>
      
    </div>
  )
}

export default HomeView