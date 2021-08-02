import { childrenProp } from "@customTypes";
import { createContext, FC, useContext, useState } from "react";

interface videoContextInterface {
  getVideo: () => any;
  videoPermission: boolean;
  videoStream: MediaStream | null;
}

const defaultVideoContext = {
  getVideo() {},
  videoPermission: false,
  videoStream: null,
};

const VideoContext = createContext<videoContextInterface>(defaultVideoContext);

export function useVideo() {
  const context = useContext(VideoContext);
  return context;
}

const VideoProvider: FC<childrenProp> = ({ children }) => {
  const [videoPermission, setVideoPermission] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const getVideo = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    setVideoStream(stream);
    setVideoPermission(stream ? true : false);
  };

  return (
    <VideoContext.Provider value={{ getVideo, videoPermission, videoStream }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
