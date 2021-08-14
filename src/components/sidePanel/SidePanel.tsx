import { FC, useState } from "react";
import styles from "@styles/components/sidePanel/sidePanel.module.scss";
import { useSidePanelState } from "@context/sidePanel/SidePanelProvider";
import Participants from "./Participants";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import ControlBtn from "@components/controls/ControlBtn";
import { useToggleSidePanel } from "@context/sidePanel/SidePanelProvider";
import { XLg } from "react-bootstrap-icons";

const SidePanel: FC = () => {
  const state = useSidePanelState();
  const [isChat, setIsChat] = useState<boolean>(true);
  const [isParticipants, setIsParticipants] = useState<boolean>(false);
  const toggleSidePanel = useToggleSidePanel();

  const toggleContent = () => {
    setIsChat((prev) => !prev);
    setIsParticipants((prev) => !prev);
  };  

  return (
    <div
      className={styles.sidePanel}
      data-isopened={state}
    >
      <div className={styles.sidePanelContainer}>
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
              <ControlBtn
                size="40%"
                Svg={XLg}
                callback={toggleSidePanel}
                state={false}
              />
            </div>
          </div>

          <div className={styles.contentContainer}>
            <div
              style={{
                display: isChat ? "block" : "none",
                height: "100%",
                maxHeight: "100%",
              }}
            >
              <Chat />
            </div>
            <div
              style={{
                display: isParticipants ? "block" : "none",
                height: "100%",
                maxHeight: "100%",
              }}
            >
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
