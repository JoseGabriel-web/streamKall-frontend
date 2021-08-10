import FullscreenProvider from "@context/fullscreen/FullscreenProvider";
import MediaProvider from "@context/media/mediaProvider";
import RoomProvider from "@context/room/RoomProvider";
import SocketIoProvider from "@context/socketIo/SocketIoProvider";
import UserProvider from "@context/user/UserProvider";
import { childrenProp } from "@customTypes";
import { FC } from "react";
import SidePanelProvider from "../sidePanel/SidePanelProvider";

const AppContext: FC<childrenProp> = ({ children }) => {
  return (
    <FullscreenProvider>
        <MediaProvider>
              <RoomProvider>
                <UserProvider>
                  <SocketIoProvider>
                    <SidePanelProvider>{children}</SidePanelProvider>
                  </SocketIoProvider>
                </UserProvider>
              </RoomProvider>
        </MediaProvider>
    </FullscreenProvider>
  );
};

export default AppContext;
