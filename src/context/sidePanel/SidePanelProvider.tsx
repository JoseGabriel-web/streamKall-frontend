import { childrenProp } from "@customTypes";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SidePanelStateContext = createContext<boolean | null>(null);
const SidePanelUpdateStateContext = createContext<() => void>(() => null);

export function useSidePanelState() {
  return useContext(SidePanelStateContext);
}
export function useToggleSidePanel() {
  return useContext(SidePanelUpdateStateContext);
}

const SidePanelProvider: FC<childrenProp> = ({ children }) => {
  const [sidePanelState, setSidePanelState] = useState<boolean>(false);
  const { pathname } = useLocation()


  function toggleSidePanel() {
    setSidePanelState((prev) => !prev);
  }

  useEffect(() => {
    if(!pathname.includes("room")) {
      setSidePanelState(false)
    }
  },[pathname, sidePanelState])

  return (
    <SidePanelStateContext.Provider value={sidePanelState}>
      <SidePanelUpdateStateContext.Provider value={toggleSidePanel}>
        {children}
      </SidePanelUpdateStateContext.Provider>
    </SidePanelStateContext.Provider>
  );
};

export default SidePanelProvider;
