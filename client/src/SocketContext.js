// YE SAARI SOCKET KI LOGIC AND FUNCTIONALITY KO HOLD KREGA
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext=createContext();

const socket=io('http://localhost:5000');

const ContextProvider=({ children })=>{
    
    // creating use state for stream
    const [stream,setStream]=useState(null);
    // other use state
    const [me,setMe]=useState('');
    const [call,setCall]=useState({});
    const [callAccepted,setCallAccepted]=useState(false);
    const [callEnded, setCallEnded]=useState(false);
    const [name,setName]=useState('');

    // using useRef to populate very fast
    const myVideo=useRef();
    const userVideo=useRef();
    const connecionRef=useRef();


    // jaise hi contextprovider render hoga toh
    // useeffect wala code hi chalega
    useEffect(()=>{
        // giving access of microphone and camera
        navigator.mediaDevices.getUserMedia({ video: true, audio:true }).then((currentStream)=>{
            setStream(currentStream);

            myVideo.current.srcObject=currentStream;
        });
        
        // yha se reload hote hi user ko new id milegi
        socket.on('me',(id)=> setMe(id));

        socket.on('calluser',({ from, name: callerName, signal}) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal})
        });

    },[]);
    // if this empty dependency array wouldn't be there then this useeffect
    // will always run

    // functions

    //  for answering call
    const answerCall=()=>{
        setCallAccepted(true);

        const peer=new Peer({ initiator:false, trickle:false, stream});

        peer.on('signal', (data)=>{
            socket.emit('answercall',{ signal:data, to: call.from});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream;
            // use ref 
        });

        peer.signal(call.signal);

        connecionRef.current=peer;


    }

        // for calling user
    const callUser=(id)=>{
        const peer=new Peer({ initiator:true, trickle:false, stream});

        peer.on('signal', (data)=>{
            socket.emit('calluser',{ userToCall: id, signalData: data, from: me,name});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream;
            // use ref 
        });

        // user can decline or accept call
        socket.on('callaccepted', (signal)=>{
            setCallAccepted(true);

            peer.signal(signal);
        });

        connecionRef.current=peer;
    }

    const leaveCall=()=>{
        setCallEnded(true);

        connecionRef.current.destroy();

        window.location.reload();
    }

    return(
        // these values will be globally accessible throughout
        // all the components
        <SocketContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export {ContextProvider, SocketContext};

