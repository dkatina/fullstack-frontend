import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useEffect} from 'react' 
import AlbumSongCard from '../components/AlbumSongCard/AlbumSongCard';

const HomeView = () => {
  const { myAlbums, spotifyToken  } = useAuth();
  const [ albumSongs, setAlbumSongs ] = useState([]);

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
    console.log("Loading")
    const getAllAlbums = async () => {
      console.log(myAlbums)
    if (myAlbums.length > 0) {
  
      const results = await Promise.all(
        myAlbums.map(album =>
          getAlbumSongs(spotifyToken, album.album_id)
        )
      )
      let tempAlbumSongs = []
      for (let i = 0; i<myAlbums.length; i++){
        let tempAlbumSong = [myAlbums[i], results[i]]
        tempAlbumSongs.push(tempAlbumSong)

      }

      setAlbumSongs(tempAlbumSongs)
      console.log('Fetched:', tempAlbumSongs)
    }
    };

    getAllAlbums()
  }, []) //empty depency array so this will only fire on mount


  return (
    <div>
      <h1>HOME</h1>
      {albumSongs?.map(( albumSong, idx)=>(
        <AlbumSongCard  key={idx} albumSong={albumSong}/>
      ))}
    </div>
  )
}

export default HomeView