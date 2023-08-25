import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import '../video.css'
const Videoplayer = () => {
    const { name, callAccepted, myVideo, userVideo,callEnded, stream, call }=useContext(SocketContext);
  return (
    
    <div className='maindiv'>
        {/* my video */}
        {stream&&(
        <div className='myvideo'>
            {/* NAME LIKHNA HH YHA */}
        <video  className='andr' playsInline muted ref={myVideo} autoPlay/>
        </div>
        )}
        
        {/*  user video */}
        {callAccepted&&!callEnded&&(
            <div className='uservideo'>
            {/* yha call.name likhna hh */}
            <video  playsInline ref={userVideo} autoPlay/>
            </div>
        )}
        
        
    </div>
    
  )
}

export default Videoplayer
