import React from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import './AlbumList.css'
import MyAlbumCard from '../MyAlbumCard/MyAlbumCard'

const AlbumList = ({ albums, type}) => {
  return (
    <div className="AlbumListContainer">
    <div className="AlbumList">
        {albums.map((album, idx)=>(
            type==='spotify' ?
            <AlbumCard key={idx} album={album} />:
            <MyAlbumCard key={idx} album={album}/>
        ))}
    </div>
    </div>
  )
}

export default AlbumList