import { FC, useEffect } from "react";
import styles from "@styles/screens/roomScreen/roomScreen.module.scss";
import { useRoomContext } from "@context/room/RoomProvider";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { roomInterface } from "@customTypes";

const RoomScreen: FC = () => {
  useEffect(() => {
    socket.emit("room:join", { room: room.name, name: user.name });
    return () => {
      socket.emit("room:leave", { room: room.name });
    };
  }, []);

  const socket = useSocketIo();
  const { room, updateRoom } = useRoomContext();
  const { user, updateUser } = useUserContext();

  useEffect(() => {
    socket.on("room:information", (roomData: roomInterface) => {
      updateRoom(roomData);      
    });   
  }, [socket]);

  return (
    <div className={styles.roomScreen}>
      <div>
        {room?.name && room.name}
        {user?.name && user.name}
      </div>
    </div>
  );
};

export default RoomScreen;
