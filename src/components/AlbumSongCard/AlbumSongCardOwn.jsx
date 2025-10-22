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
        <div className='albumTop'>
            <img className='albumLogo'src={albumSong[0].cover_art} alt="" />
            <div className='infoContainer'>
                <h2 className='albumTitle'>{albumSong[0].title}</h2>
                <p className='albumArtist'>West Main</p>
                <p className='albumTracks'>Tracks: {albumSong[1].items.length}</p>
                <a href={albumSong[0].spotify_link} target="_blank">Listen</a>
            </div>
        </div>
        <div className='songBottom'>
            <div className='songs'>
                {albumSong[1].items?.map((song)=>(
                    <a href={song.external_urls.spotify} target="_blank">
                    <div className='song'>
                        <div>
                            <h4>{song.name}</h4>
                            <p>West Main</p>
                        </div>
                        <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
                    </div>
                    </a>
                ))}

            </div>

        </div>
    </div>
  )
}

export default AlbumSongCard