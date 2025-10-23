import React from 'react'
import './AlbumSongCard.css'
import { motion } from 'framer-motion'

const AlbumSongCard = ({ albumSong }) => {


  return (
    <motion.div 
      className='albumSongCard'
      initial={{ opacity: 0, y:10}}
      animate={{ opacity: 1, y:0}}
      transition={{duration: 0.4, delay: 1.1}}
      >
      
        <iframe data-testid="embed-iframe" style={{border: 0}} src={`https://open.spotify.com/embed/album/${`${albumSong[0].album_id}?utm_source=generator`}?utm_source=generator`} width="100%" height="600"   allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </motion.div>
  )
}

export default AlbumSongCard