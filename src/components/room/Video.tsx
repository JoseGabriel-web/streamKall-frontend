import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRef, useState, useEffect } from "react";
import Peer from 'simple-peer'
import noVolumeSvg from "@assets/svg/noVolume.svg";
import volumeSvg from "@assets/svg/volume.svg";

interface videoProps {
    peer: Peer.Instance;
    muted?: boolean;
    socketID: string;
    styles: {
        readonly [key: string]: string;
    }
  }
  
  interface User {
    name: string;
    id: string;
  }
  
  const Video = ({ peer, socketID, styles }: videoProps) => {
    const socket = useSocketIo();
    const ref = useRef<HTMLVideoElement>(document.createElement("video"));
    const defaultUser = {
      name: "",
      id: "",
    };
    const [user, setUser] = useState<User>(defaultUser);
    const [isMuted, setIsMuted] = useState<boolean>(false);    
  
    useEffect(() => {
      socket.emit("room:get:user", socketID);
      socket.on(`room:provide:user:${socketID}`, (user) => {
        setUser(user);
      });
    }, []);
  
    useEffect(() => {
      if (ref.current) {
        peer.on("stream", (stream) => {
          ref.current.srcObject = stream;
        });
      }
    }, [ref]);
  
    const toggleIsMuted = () => {
      setIsMuted((prev) => !prev);
    };
  
    return (
      <div className={styles.videoContainer} data-name={user.name}>
        <div className={styles.volumeStateSvg} onClick={toggleIsMuted}>
          <img
            src={isMuted? noVolumeSvg : volumeSvg}
            height="70%"
            width="70%"
            style={{ maxWidth: "25px", maxHeight: "25px" }}
          />
        </div>
        <video muted={isMuted} ref={ref} height="100%" width="100%" autoPlay />
      </div>
    );
  };
export default Video
