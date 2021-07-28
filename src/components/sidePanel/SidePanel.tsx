import { FC, useState, useEffect } from "react";
import styles from "@styles/components/sidePanel/sidePanel.module.scss";
import { useSidePanelState } from "@context/sidePanel/SidePanelProvider";
import Participants from "./Participants";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import ControlBtn from "@components/controls/ControlBtn";
import closeSvg from "@assets/svg/close.svg";
import { useToggleSidePanel } from "@context/sidePanel/SidePanelProvider";

const SidePanel: FC = () => {
  const state = useSidePanelState();
  const [isChat, setIsChat] = useState<boolean>(true);
  const [isParticipants, setIsParticipants] = useState<boolean>(false);
  const toggleSidePanel = useToggleSidePanel();

  const toggleContent = () => {
    setIsChat((prev) => !prev);
    setIsParticipants((prev) => !prev);
  };

  const windowHeight = window.innerHeight  
  const [minHeight, setMinHeight] = useState<string>("")

  useEffect(() => {
    const updateMinHeight = () => {
      if(window.innerWidth > 900) {
        setMinHeight(`calc(${windowHeight}px - 10%)`)        
      } else {        
        setMinHeight(`${windowHeight}px`)
      }
    }
    window.addEventListener('resize', updateMinHeight)
    return () => window.removeEventListener('resize', updateMinHeight)
  },[])


  return (
    <div style={{ minHeight: minHeight, maxHeight: minHeight }} className={styles.sidePanel} data-isopened={state}>
      <div style={{ minHeight: minHeight, maxHeight: minHeight }} className={styles.sidePanelContainer}>
        <div className={styles.sidePanelContent}>  

        <div className={styles.sidePanelHeader}>                            

          <div className={styles.contentController}>
            <div onClick={() => toggleContent()} data-isselected={isChat}>
              <h5>chat</h5>
            </div>
            <div
              onClick={() => toggleContent()}
              data-isselected={isParticipants}
            >
              <h5>participants</h5>
            </div>
          </div>

          <div className={styles.closeBtnContainer}>
            <ControlBtn size="40%" svg={closeSvg} callback={toggleSidePanel} state={false} />
          </div>

        </div>        
          
          <div className={styles.contentContainer}>
            <div style={{ display: isChat ? "block" : "none", height: "100%" }}>
              <Chat />
            </div>
            <div style={{ display: isParticipants ? "block" : "none", height: "100%" }}>
              <Participants />
            </div>
          </div>
        </div>
        <div className={styles.chatInputContainer}>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
