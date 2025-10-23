import React from 'react'
import './MyAlbumCard.css'
import AddAlbum from '../AddSong/AddAlbum'
import RemoveAlbum from '../RemoveAlbum/RemoveAlbum'

const MyAlbumCard = ({ album }) => {
  return (
    <div className='AlbumCardContainer'>
        <img className='AlbumCover'src={album.cover_art} alt="cover img" />
        <div>
            <h4>{album.title}</h4>
            <p>{album.release_date}</p>
            <a href={album.spotify_link}>listen </a>
        </div>
        <RemoveAlbum album={album}/>
    </div>
  )
}

export default MyAlbumCard