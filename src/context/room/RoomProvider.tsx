import { childrenProp, roomContextInterface, roomInterface, userInterface } from "@customTypes";
import { createContext, FC, useContext, useState } from "react";

const defaultRoom = { name: "", participants: [] };

const RoomContext = createContext<roomContextInterface>({
  room: defaultRoom,
  updateRoom: () => null,
});

export function useRoomContext() {
  const context = useContext(RoomContext);
  return context;
}

const RoomProvider: FC<childrenProp> = ({ children }) => {
  const [room, setRoom] = useState<roomInterface>(defaultRoom);

  function updateRoom(roomObject: roomInterface) {
    setRoom(roomObject);
  }

  return (
    <RoomContext.Provider value={{ room, updateRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
