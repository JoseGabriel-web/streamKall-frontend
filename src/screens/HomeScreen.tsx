import { FC, useEffect, useState } from "react";
import styles from "@styles/screens/homeScreen/homeScreen.module.scss";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import ControlBtn from "@components/controls/ControlBtn";
import { useHistory } from "react-router-dom";
import React from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import { BoxArrowInLeft } from "react-bootstrap-icons";

const HomeScreen: FC = () => {
  const history = useHistory();
  const socket = useSocketIo();
  const { updateUser } = useUserContext();
  const { updateRoom } = useRoomContext();
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(
    name && roomName ? true : false,
  );
  const [storedName, setStoredName] = useLocalStorage("storedName", name);
  const [rememberName, setRememberName] = useLocalStorage(
    "rememberName",
    false,
  );

  const handleSaveName = () => {
    setStoredName(name);
  };

  const handleUser = () => {
    updateUser({
      name,
      id: socket.id,
      ref: React.createRef(),
    });
  };

  const handleRoom = () => {
    updateRoom({
      name: roomName,
      participants: [],
    });
  };

  const joinRoom = () => {
    if (!name || !roomName) return;
    if (rememberName) handleSaveName();
    handleUser();
    handleRoom();
    history.push("/room");
  };

  useEffect(() => {
    updateRoom({ name: "", participants: [] });
    if (rememberName) {
      setName(storedName);
    }        
  }, []);

  return (
    <div className={styles.homeScreen}>
      <div className={styles.roomSelector}>
        <div className={styles.userNameInput}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter user name"
          />
        </div>
        <div className={styles.roomNameInput}>
          <input
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            type="text"
            placeholder="Enter room name"
          />
        </div>
        <div className={styles.rememberNameQuestion}>
          <input
            type="checkbox"
            onChange={(e) => setRememberName(e.target.checked)}
            checked={rememberName}
          />
          <small>Remember name for future meetings</small>
        </div>
        <div className={styles.roomSwitch}>
          <ControlBtn
            callback={joinRoom}
            key={"roomControlSvg"}
            Svg={BoxArrowInLeft}
            state={true}
            size={"100%"}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
