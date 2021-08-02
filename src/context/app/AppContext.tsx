import FullscreenProvider from "@context/fullscreen/FullscreenProvider";
import AudioProvider from "@context/media/audioProvider";
import VideoProvider from "@context/media/videoProvider";
import RoomProvider from "@context/room/RoomProvider";
import SocketIoProvider from "@context/socketIo/SocketIoProvider";
import UserProvider from "@context/user/UserProvider";
import { childrenProp } from "@customTypes";
import { FC } from "react";
import SidePanelProvider from "../sidePanel/SidePanelProvider";

const AppContext: FC<childrenProp> = ({ children }) => {
  return (
    <FullscreenProvider>
      <VideoProvider>
        <AudioProvider>
          <RoomProvider>
            <UserProvider>
              <SocketIoProvider>
                <SidePanelProvider>{children}</SidePanelProvider>
              </SocketIoProvider>
            </UserProvider>
          </RoomProvider>
        </AudioProvider>
      </VideoProvider>
    </FullscreenProvider>
  );
};

export default AppContext;
