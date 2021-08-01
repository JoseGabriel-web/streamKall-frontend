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
import { useLocation } from "react-router-dom";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";

const Controls: FC = () => {
  const toggleSidePanel = useToggleSidePanel();
  const toggleFullscreen = useToggleFullscreen();
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const isFullscreen: boolean = useIsFullscreen();
  const { pathname } = useLocation();
  const socket = useSocketIo();
  const { room } = useRoomContext();

  const leaveRoom = () => {
    console.log("leaving room");
    socket.emit("room:leave", { roomName: room.name });
  };

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ControlBtn
          key={"videoSvg"}
          svg={videoSvg}
          alternateSvg={noVideoSvg}
          state={hasVideo}
        />
        <ControlBtn
          key={"audioSvg"}
          svg={audioSvg}
          alternateSvg={noAudioSvg}
          state={hasAudio}
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
