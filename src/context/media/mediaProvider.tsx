import { childrenProp } from "@customTypes";
import useLocalStorage from "@hooks/useLocalStorage";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface mediaContextInterface {
  getMedia: () => any;
  mediaStream: MediaStream;
}

const dafaultMediaContext: mediaContextInterface = {
  getMedia: () => null,
  mediaStream: new MediaStream()
};

const MediaContext = createContext<mediaContextInterface>(dafaultMediaContext);

export function useMedia() {
  const context = useContext(MediaContext);
  return context;
}

const MediaProvider: FC<childrenProp> = ({ children }) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>(
    new MediaStream(),
  );  
  const [startWithCamera] = useLocalStorage('startWithCamera', false)
  const [startWithAudio] = useLocalStorage('startWithAudio', false)

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("This browser does not support the API yet");
  }

  const getMedia = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 },
      })
      .then((stream) => {
        if(!startWithCamera) {
          stream.getVideoTracks().forEach(track => track.enabled = false)
        }
        if(!startWithAudio) {
          stream.getAudioTracks().forEach(track => track.enabled = false)
        }
        setMediaStream(stream);
      })
      .catch((error) => {
        console.error(error)
      });
  };

  return (
    <MediaContext.Provider value={{ getMedia, mediaStream }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
