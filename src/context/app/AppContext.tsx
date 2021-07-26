import FullscreenProvider from "@context/fullscreen/FullscreenProvider";
import { childrenProp } from "@customTypes";
import { FC } from "react";
import SidePanelProvider from "../sidePanel/SidePanelProvider";

const AppContext: FC<childrenProp> = ({ children }) => {
  return (
    <FullscreenProvider>
      <SidePanelProvider>{children}</SidePanelProvider>
    </FullscreenProvider>
  );
};

export default AppContext;
