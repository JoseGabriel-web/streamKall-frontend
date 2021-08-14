import { FC, useEffect, useState } from "react";
import styles from "@styles/components/controls/controls.module.scss";
import { useToggleSidePanel } from "@context/sidePanel/SidePanelProvider";
import ControlBtn from "./ControlBtn";
import { useHistory, useLocation } from "react-router-dom";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  CameraVideo,
  CameraVideoOff,
  Mic,
  MicMute,
  ChatSquareDots,
  BoxArrowRight,
} from "react-bootstrap-icons";

const Controls: FC = () => {
  const toggleSidePanel = useToggleSidePanel();
  const { room } = useRoomContext();
  const { pathname } = useLocation();
  const [startWithCamera] = useLocalStorage("startWithCamera", false);
  const [startWithMic] = useLocalStorage("startWithMic", false);
  const [isVideoEnabled, setIsVideoEnabled] =
    useState<boolean>(startWithCamera);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(startWithMic);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const history = useHistory();
  const socket = useSocketIo();

  const handleAudio = () => {
    if (isAudioEnabled) {
      socket.emit("peer:audio:mute");
      setIsAudioEnabled(false);
    } else {
      socket.emit("peer:audio:unmute");
      setIsAudioEnabled(true);
    }
  };

  const handleVideo = () => {
    if (isVideoEnabled) {
      socket.emit("peer:video:stop");
      setIsVideoEnabled(false);
    } else {
      socket.emit("peer:video:start");
      setIsVideoEnabled(true);
    }
  };

  useEffect(() => {
    if (pathname.includes("room")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    /* Update user start with feautures selected, on pathname change */
    setIsVideoEnabled(startWithCamera);
    setIsAudioEnabled(startWithMic);
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("room")) return;
    else {
      setIsVideoEnabled(startWithCamera);
      setIsAudioEnabled(startWithMic);
    }
  }, [startWithCamera, startWithMic]);
  

  const leaveRoom = () => {
    socket.emit("room:leave", { roomName: room.name });
    history.push("/");
  };

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <ControlBtn
          key={"videoSvg"}
          Svg={CameraVideo}
          AlternateSvg={CameraVideoOff}
          state={isVideoEnabled}
          callback={handleVideo}
        />
        <ControlBtn
          key={"audioSvg"}
          Svg={Mic}
          AlternateSvg={MicMute}
          state={isAudioEnabled}
          callback={handleAudio}
        />
        <ControlBtn
          key={"chatSvg"}
          Svg={ChatSquareDots}
          state={false}
          callback={toggleSidePanel}
          disabled={isDisabled}
        />
      </div>
      <div
        className={styles.roomSwitch}
        style={{ display: pathname.includes("room") ? "flex" : "none" }}
      >
        <ControlBtn
          key={"roomControlSvg"}
          Svg={BoxArrowRight}
          state={true}
          size={"100%"}
          callback={leaveRoom}
        />
      </div>
    </div>
  );
};

export default Controls;
