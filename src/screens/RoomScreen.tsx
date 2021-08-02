import { FC, useEffect, useRef, useState } from "react";
import styles from "@styles/screens/roomScreen/roomScreen.module.scss";
import { useRoomContext } from "@context/room/RoomProvider";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { roomInterface, userInterface } from "@customTypes";
import recalculateLayout from "@helpers/recalculateLayout";
import { useHistory, useLocation } from "react-router-dom";
import { useAudio } from "@context/media/audioProvider";

const RoomScreen: FC = () => {
  useEffect(() => {
    socket.emit("room:join", { room: room.name, name: user.name });
    return () => {
      socket.emit("room:leave", { room: room.name });
    };
  }, []);

  const { pathname } = useLocation();
  const socket = useSocketIo();
  const { room, updateRoom } = useRoomContext();
  const { user, updateUser } = useUserContext();
  const { participants } = room;
  const aspectRatio = 16 / 9;
  const history = useHistory();
  const galleryRef = useRef<HTMLDivElement>(null);   
  const { getAudio, audioPermission, audioStream } = useAudio();

  useEffect(() => {
    if (galleryRef.current === null) return;

    const calculateGrid = () => {
      if (galleryRef.current === null) return;
      recalculateLayout({
        containerWidth: galleryRef.current.getBoundingClientRect().width,
        containerHeight: galleryRef.current.getBoundingClientRect().height,
        videoCount: participants.length,
        aspectRatio,
      });
    };

    calculateGrid();
    galleryRef.current.addEventListener("resize", calculateGrid);
  }, [galleryRef.current, participants]);

  useEffect(() => {
    socket.on("room:information", (roomData: roomInterface) => {
      updateRoom(roomData);
    });
  }, [socket]);

  socket.on("disconnect", () => {
    socket.emit("room:leave", { roomName: room.name });
  });

  useEffect(() => {
    if (!room.name) {
      return history.push("/");
    }
  }, []);


  return (
    <div className={styles.roomScreen}>
      <div className={styles.roomGrid} ref={galleryRef}>
        {participants.map(({ name, id }) => (
          <div key={id} className={styles.videoContainer}>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomScreen;
