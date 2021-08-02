import { FC, useEffect, useState } from "react";
import styles from "@styles/components/controls/controls.module.scss";
import { useToggleSidePanel } from "@context/sidePanel/SidePanelProvider";
import videoSvg from "@assets/svg/video.svg";
import noVideoSvg from "@assets/svg/noVideo.svg";
import audioSvg from "@assets/svg/audio.svg";
import noAudioSvg from "@assets/svg/noAudio.svg";
import chatSvg from "@assets/svg/chat.svg";
import shareSvg from "@assets/svg/share.svg";
import notFullscreenSvg from "@assets/svg/notFullscreen.svg";
import fullscreenSvg from "@assets/svg/fullscreen.svg";
import settingsSvg from "@assets/svg/settings.svg";
import joinRoomSvg from "@assets/svg/joinRoom.svg";
import leaveRoomSvg from "@assets/svg/leaveRoom.svg";
import ControlBtn from "./ControlBtn";
import {
  useIsFullscreen,
  useToggleFullscreen,
} from "@context/fullscreen/FullscreenProvider";
import { useHistory, useLocation } from "react-router-dom";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import { useAudio } from "@context/media/audioProvider";
import { useVideo } from "@context/media/videoProvider";

const Controls: FC = () => {
  const toggleSidePanel = useToggleSidePanel();
  const toggleFullscreen = useToggleFullscreen();
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const isFullscreen: boolean = useIsFullscreen();
  const { pathname } = useLocation();
  const history = useHistory();
  const socket = useSocketIo();
  const { room } = useRoomContext();
  const { getAudio, audioPermission, audioStream } = useAudio();
  const { getVideo, videoPermission, videoStream } = useVideo();

  const handleAudio = () => {
    getAudio();    
  };
  const handleVideo = () => {
    getVideo();
  };

  useEffect(() => {
    if(audioStream) {
      socket.emit("media:stream", { media: audioStream })
    }
  }, [audioStream])

  /**
   * first get permision for audio and video
   * when click on video icon check if already has permission for camera if so start streaming or stop streaming
   * if clicked on audio check for permission on audio
   * */

  const leaveRoom = () => {
    socket.emit("room:leave", { roomName: room.name });
    history.push("/");
  };

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ControlBtn
          key={"videoSvg"}
          svg={videoSvg}
          alternateSvg={noVideoSvg}
          state={videoPermission}
          callback={handleVideo}
        />
        <ControlBtn
          key={"audioSvg"}
          svg={audioSvg}
          alternateSvg={noAudioSvg}
          state={audioPermission}
          callback={handleAudio}
        />
        <ControlBtn
          key={"chatSvg"}
          svg={chatSvg}
          state={false}
          callback={toggleSidePanel}
        />
        <ControlBtn key={"shareSvg"} svg={shareSvg} state={true} />
      </div>
      <div
        className={styles.roomSwitch}
        style={{ display: pathname.includes("room") ? "flex" : "none" }}
      >
        <ControlBtn
          key={"roomControlSvg"}
          svg={leaveRoomSvg}
          state={true}
          size={"100%"}
          callback={leaveRoom}
        />
      </div>
    </div>
  );
};

export default Controls;

{
  /*
  
  Replace maybe in nav
  <ControlBtn key={"settingsSvg"} svg={settingsSvg} state={true} />

  Not working on mobile iphone
  <ControlBtn
          key={"fullscreenSvg"}
          alternateSvg={notFullscreenSvg}
          svg={fullscreenSvg}
          state={isFullscreen}
          callback={toggleFullscreen}
        /> */
}
