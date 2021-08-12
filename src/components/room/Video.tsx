import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRef, useState, useEffect } from "react";
import Peer from "simple-peer";
import noVolumeSvg from "@assets/svg/noVolume.svg";
import volumeSvg from "@assets/svg/volume.svg";

interface videoProps {
  peer: Peer.Instance;
  muted?: boolean;
  socketID: string;
  styles: {
    readonly [key: string]: string;
  };
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
  const [volume, setVolume] = useState<number>(1.0);

  useEffect(() => {
    socket.emit("room:get:user", socketID);
    socket.on(`room:provide:user:${socketID}`, (user) => {
      setUser(user);
    });
  }, []);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
    console.log(volume);
  }, [volume]);

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
      <div className={styles.volumeStateSvg}>
        <input
          aria-orientation="vertical"
          type="range"
          value={volume}
          step={0.1}
          min={0.0}
          max={1.0}
          onChange={(e) => handleVolume(e)}
        />
        <img
          onClick={toggleIsMuted}
          src={isMuted ? noVolumeSvg : volumeSvg}
          height="70%"
          width="70%"
          style={{ maxWidth: "25px", maxHeight: "25px" }}
        />
      </div>
      <video muted={isMuted} ref={ref} height="100%" width="100%" autoPlay />
    </div>
  );
};
export default Video;
