import { childrenProp } from "@customTypes";
import { createContext, useContext, FC, useState } from "react";
import screenfull from "screenfull";

const FullScreenContext = createContext<() => void>(() => null);
const IsFullScreenContext = createContext<boolean>(false);

export function useToggleFullscreen() {
  return useContext(FullScreenContext);
}

export function useIsFullscreen() {
  return useContext(IsFullScreenContext);
}

const FullscreenProvider: FC<childrenProp> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen: () => void = () => {
    if (screenfull.isEnabled && !isFullscreen) {
      screenfull.request();
    } else if (screenfull.isEnabled) {
      screenfull.exit();
    }
    setIsFullscreen((prev) => !prev);
  };

  return (
    <FullScreenContext.Provider value={toggleFullscreen}>
      <IsFullScreenContext.Provider value={isFullscreen}>
        {children}
      </IsFullScreenContext.Provider>
    </FullScreenContext.Provider>
  );
};

export default FullscreenProvider;
