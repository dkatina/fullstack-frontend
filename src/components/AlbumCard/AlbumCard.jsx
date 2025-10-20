import React from 'react'
import './AlbumCard.css'
import AddAlbum from '../AddSong/AddAlbum'

const AlbumCard = ({ album }) => {
  return (
    <div className='AlbumCardContainer'>
        <img className='AlbumCover'src={album['images'][0]['url']} alt="cover img" />
        <div>
            <h4>{album.name}</h4>
            <p>{album.release_date}</p>
            <p>Tracks: {album.total_tracks}</p>
        </div>
        <AddAlbum album={album}/>
    </div>
  )
}

export default AlbumCard