import { FC, useState } from "react";
import styles from "@styles/screens/homeScreen/homeScreen.module.scss";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { useRoomContext } from "@context/room/RoomProvider";
import joinRoomSvg from "@assets/svg/joinRoom.svg";
import ControlBtn from "@components/controls/ControlBtn";
import { useHistory } from "react-router-dom";

const HomeScreen: FC = () => {
  const history = useHistory()
  const socket = useSocketIo();
  const { user, updateUser } = useUserContext()
  const { room, updateRoom }= useRoomContext();
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");  

  const handleUser = () => {
    updateUser({
      name,
      id: socket.id
    });
  };

  const handleRoom = () => {
    updateRoom({
      name: roomName,
      participants: [],
    });
  };

  const joinRoom = () => {
    handleUser();
    handleRoom();
    history.push('/room')
  };

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
          <input type="checkbox" />
          <small>Remember name for future meetings</small>
        </div>
        <div className={styles.roomSwitch}>
          <ControlBtn
            callback={joinRoom}
            key={"roomControlSvg"}
            svg={joinRoomSvg}
            state={true}
            size={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
