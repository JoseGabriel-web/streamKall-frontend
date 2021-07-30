import { childrenProp } from "@customTypes";
import { createContext, FC, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { API_URL } from "../../config/config";
const socket = io(API_URL);
const SocketIoContext = createContext<Socket>(socket);

export function useSocketIo() {
  return useContext(SocketIoContext);
}

const SocketIoProvider: FC<childrenProp> = ({ children }) => {
  
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <SocketIoContext.Provider value={socket}>{children}</SocketIoContext.Provider>
  );
};

export default SocketIoProvider;
