import { FC, useEffect, useRef, useState } from "react";
import styles from "@styles/screens/roomScreen/roomScreen.module.scss";
import { useRoomContext } from "@context/room/RoomProvider";
import { useUserContext } from "@context/user/UserProvider";
import { useSocketIo } from "@context/socketIo/SocketIoProvider";
import { roomInterface, userInterface } from "@customTypes";
import recalculateLayout from "@helpers/recalculateLayout";

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
  const { participants } = room;
  const aspectRatio = 16 / 9;
  // const aspectRatio = 4 / 3;
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (galleryRef.current === null) return;

    const calculateGrid = () => {
      if (galleryRef.current === null) return;
      recalculateLayout({
        containerWidth: galleryRef.current.getBoundingClientRect().width,
        containerHeight: galleryRef.current.getBoundingClientRect().height,
        videoCount: participants.length,
        aspectRatio
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

  return (
    <div className={styles.roomScreen}>
      <div className={styles.roomGrid} ref={galleryRef}>
        {participants.map(({ name, id }) => (
          <div className={styles.videoContainer}></div>
        ))}
      </div>
    </div>
  );
};

export default RoomScreen;
