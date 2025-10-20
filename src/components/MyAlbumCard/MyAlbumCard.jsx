import React from 'react'
import './MyAlbumCard.css'
import AddAlbum from '../AddSong/AddAlbum'

const MyAlbumCard = ({ album }) => {
  return (
    <div className='AlbumCardContainer'>
        <img className='AlbumCover'src={album.cover_art} alt="cover img" />
        <div>
            <h4>{album.title}</h4>
            <p>{album.release_date}</p>
            <p>Tracks: {album.spotify_link}</p>
        </div>
        
    </div>
  )
}

export default MyAlbumCard