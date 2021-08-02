import { childrenProp } from "@customTypes";
import { createContext, FC, useContext, useState } from "react";

interface audioContextInterface {
  getAudio: () => any;
  audioPermission: boolean;
  audioStream: MediaStream | null;
}

const dafaultAudioContext = {
  getAudio() {},
  audioPermission: false,
  audioStream: null,
};

const AudioContext = createContext<audioContextInterface>(dafaultAudioContext);

export function useAudio() {
  const context = useContext(AudioContext);
  return context;
}

const AudioProvider: FC<childrenProp> = ({ children }) => {
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("This browser does not support the API yet");
  }

  const getAudio = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
    }).then(stream => {
        setAudioStream(stream);
        setAudioPermission(true);        
    }).catch(error => {        
        setAudioPermission(false);
    }) 
  };

  return (
    <AudioContext.Provider value={{ getAudio, audioPermission, audioStream }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
