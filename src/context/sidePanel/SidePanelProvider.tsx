import { childrenProp } from "@customTypes";
import { createContext, FC, useContext, useEffect, useState } from "react";

const SidePanelStateContext = createContext<boolean | null>(null);
const SidePanelUpdateStateContext = createContext<() => void>(() => null);

export function useSidePanelState() {
  return useContext(SidePanelStateContext);
}
export function useToggleSidePanel() {
  return useContext(SidePanelUpdateStateContext);
}

const SidePanelProvider: FC<childrenProp> = ({ children }) => {
  const [sidePanelState, setSidePanelState] = useState<boolean>(true);

  function toggleSidePanel() {
    setSidePanelState((prev) => !prev);
  }

  useEffect(() => {    
    if(window.innerWidth < 700) {
      toggleSidePanel()
    }
  }, []);

  return (
    <SidePanelStateContext.Provider value={sidePanelState}>
      <SidePanelUpdateStateContext.Provider value={toggleSidePanel}>
        {children}
      </SidePanelUpdateStateContext.Provider>
    </SidePanelStateContext.Provider>
  );
};

export default SidePanelProvider;
