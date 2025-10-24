import React from 'react'
import './MyAlbumCard.css'
import AddAlbum from '../AddSong/AddAlbum'
import RemoveAlbum from '../RemoveAlbum/RemoveAlbum'

const MyAlbumCard = ({ album }) => {
  return (
    <div className='AlbumCardContainer'>
        <div className="AlbumCardInfo">
        <img className='AlbumCover'src={album.cover_art} alt="cover img" />
        <div>
            <h4>{album.title}</h4>
            <p>{album.release_date}</p>
            <p>Tracks: {album.total_tracks}</p>
        </div>
        </div>
        <RemoveAlbum album={album}/>
    </div>
  )
}

export default MyAlbumCard