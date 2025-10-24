import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useEffect} from 'react' 
import AlbumSongCard from '../components/AlbumSongCard/AlbumSongCard';
import { motion, AnimatePresence } from 'framer-motion';
import './HomeView.css';

const HomeView = () => {
  const { myAlbums, spotifyToken  } = useAuth();
  const [ albumSongs, setAlbumSongs ] = useState([]);
  const [ selectedAlbum, setSelectedAlbum] = useState(null);
  const links = [
    ["https://www.instagram.com/west__main/#", "https://img.icons8.com/ios-filled/50/instagram-new--v1.png"],
    ["https://open.spotify.com/artist/2cTWfmhgzCiU5JWCcePyii", "https://img.icons8.com/ios-filled/100/spotify.png"],
    ["https://music.apple.com/us/artist/west-main/1610792593", "https://img.icons8.com/ios-filled/100/apple-music.png"],
    ["https://www.tiktok.com/@westmainmusic1",
      "https://img.icons8.com/ios-filled/100/tiktok--v1.png"],
    ["https://www.youtube.com/channel/UCUAYVnV7dXHgdmI6RaWIQ9A","https://img.icons8.com/ios-filled/100/youtube-play.png"]
  ]

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
      let tempAlbumSongs = []
      for (let i = 0; i<myAlbums.length; i++){
        let tempAlbumSong = [myAlbums[i], results[i]]
        tempAlbumSongs.push(tempAlbumSong)

      }

      setAlbumSongs(tempAlbumSongs)
      
    }
    };

    getAllAlbums()
  }, [myAlbums]) //this will fire on mount, and whenever myAlbums is changed

  //<AlbumSongCard  key={idx} albumSong={albumSong}/>
  return (
    <div>
      <div id="hero">
        <img src="https://i.scdn.co/image/ab6761610000517418cbd8d2e0377739c2dfa1fc" alt="West Main" />
        <h1>West Main Music</h1>
      </div>
      
      <div 
        className='myLinks'
        style={{
          display: 'flex',
          width: '90%',
          margin: '1vh auto',
          justifyContent: 'space-between'
        }}>
        {links.map((link, idx)=>(
          <a key={idx} href={link[0]}><img  style={{background: 'rgba(99, 99, 99, 1)', borderRadius: "50px", padding: '7px', overflow: 'visible'}}width="50" height="50" src={link[1]} alt="instagram-new--v1"/></a>
        ))}
      </div>
      <hr style={{width: "90%", margin: '0 auto', backgroundColor: 'black', border: 'none', height: '2px', marginBottom: '4vh'}}/>
      <div style={{display: 'flex', overflowX: 'scroll', alignItems: 'center', gap: '20px', paddingLeft: "20px"}}>
        {albumSongs?.map(( albumSong, idx)=>(
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{
              duration: 0.25,
              delay: idx * 0.2
            
            }}
          >
            <img 
              src={albumSong[0]['cover_art']}
              width={175}
              height={175}
              onClick={()=>setSelectedAlbum(albumSong)}
              style={{
                borderRadius: '15px',

              }}
              />
          </motion.div>
        ))}
      </div>
      
      {
        selectedAlbum &&
        <AnimatePresence>
          <motion.div
            key='backdrop'
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{duration: 0.2}}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 99999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}      
            onClick={()=>setSelectedAlbum(null)}
          >
            <AlbumSongCard albumSong={selectedAlbum}/>
          </motion.div>
        </AnimatePresence>
      }

    </div>
  )
}

export default HomeView