import { FC, useEffect, useState } from "react";
import styles from "@styles/components/controls/controls.module.scss";
import { useToggleSidePanel } from "@context/sidePanel/SidePanelProvider";
import videoSvg from "@assets/svg/video.svg";
import noVideoSvg from "@assets/svg/noVideo.svg";
import micSvg from "@assets/svg/mic.svg";
import noMicSvg from "@assets/svg/noMic.svg";
import chatSvg from "@assets/svg/chat.svg";
import shareSvg from "@assets/svg/share.svg";
import leaveRoomSvg from "@assets/svg/leaveRoom.svg";
import ControlBtn from "./ControlBtn";
import { useHistory, useLocation } from "react-router-dom";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import { useMedia } from "@context/media/mediaProvider";
import useLocalStorage from "@hooks/useLocalStorage";

const Controls: FC = () => {
  const toggleSidePanel = useToggleSidePanel();
  const { room } = useRoomContext();
  const { pathname } = useLocation();
  const { mediaStream } = useMedia();
  const [startWithCamera] = useLocalStorage('startWithCamera', false)
  const [startWithAudio] = useLocalStorage('startWithAudio', false)
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(startWithCamera);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(startWithAudio);
  const history = useHistory();
  const socket = useSocketIo();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  function hasAudio() {
    if (!mediaStream) return false;
    return mediaStream
      .getAudioTracks()
      .some((audioTrack) => audioTrack.enabled === true);
  }
  function hasVideo() {
    if (!mediaStream) return false;
    return mediaStream
      .getVideoTracks()
      .some((videoTrack) => videoTrack.enabled === true);
  }

  const handleAudio = () => {
    if (isAudioEnabled) {
      socket.emit("peer:audio:mute")
      setIsAudioEnabled(false);
    } else {
      socket.emit("peer:audio:unmute")
      setIsAudioEnabled(true);
    }
  };

  const handleVideo = () => {    
    if (isVideoEnabled) {
      socket.emit("peer:video:stop")
      setIsVideoEnabled(false);
    } else {      
      socket.emit("peer:video:start")
      setIsVideoEnabled(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("room:leave", { roomName: room.name });
    history.push("/");
  };

  useEffect(() => {
    if (pathname.includes("room")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (mediaStream && pathname.includes("room")) {
      setIsAudioEnabled(hasAudio());
    }
  }, [mediaStream]);
  useEffect(() => {
    if (mediaStream && pathname.includes("room")) {
      setIsVideoEnabled(hasVideo());
    }
  }, [mediaStream]);

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ControlBtn
          key={"videoSvg"}
          svg={videoSvg}
          alternateSvg={noVideoSvg}
          state={isVideoEnabled}
          callback={handleVideo}
        />
        <ControlBtn
          key={"audioSvg"}
          svg={micSvg}
          alternateSvg={noMicSvg}
          state={isAudioEnabled}
          callback={handleAudio}
        />
        <ControlBtn
          key={"chatSvg"}
          svg={chatSvg}
          state={false}
          callback={toggleSidePanel}
          disabled={isDisabled}
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

