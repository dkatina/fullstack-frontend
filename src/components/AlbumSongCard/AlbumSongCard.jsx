import React from 'react'
import './AlbumSongCard.css'

const AlbumSongCard = ({ albumSong }) => {

    function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

  return (
    <div className='albumSongCard'>
        <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} src={`https://open.spotify.com/embed/album/${`${albumSong[0].album_id}?utm_source=generator`}?utm_source=generator`} width="100%" height="352"   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}

export default AlbumSongCard