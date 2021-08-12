import { useRef, useState } from "react";
import useClickLocation from "@hooks/useClickLocation";
import styles from "@styles/components/settings/settings.module.scss";
import Setting from "./Setting";
import moonSvg from "@assets/svg/moon.svg";
import fullMoonSvg from "@assets/svg/fullMoon.svg";
import micSvg from "@assets/svg/mic.svg";
import noMicSvg from "@assets/svg/noMic.svg";
import videoSvg from "@assets/svg/video.svg";
import noVideoSvg from "@assets/svg/noVideo.svg";
import closeSvg from "@assets/svg/close.svg";
import ControlBtn from "@components/controls/ControlBtn";
import useLocalStorage from "@hooks/useLocalStorage";

interface SettingsProps {
  settingsState: boolean;
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({ settingsState, setSettingsState }: SettingsProps) => {
  const settingsRef = useRef(null);
  const closeSettings = () => setSettingsState(false);
  useClickLocation(settingsRef, closeSettings);
  const [iconState, setIconState] = useState(false);
  const toggleIconState = () => setIconState((prev) => !prev);

  const [startWithCamera, setStartWithCamera] = useLocalStorage('startWithCamera', false)
  const [startWithMic, setStartWithMic] = useLocalStorage('startWithMic', false)

  const toggleStartWithCamera = () => setStartWithCamera(prev => !prev)
  const toggleStartWithMic = () => setStartWithMic(prev => !prev)

  return (
    <div data-isopened={settingsState} className={styles.settingsSection}>
      <div ref={settingsRef} className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h4 className={styles.settingsLabel}>Settings</h4>
          <ControlBtn svg={closeSvg} state={false} callback={closeSettings} />
        </div>
        <div className={styles.settings}>
          <Setting
            styles={styles}
            label="Dark Mode"
            falseIcon={moonSvg}
            trueIcon={fullMoonSvg}
            state={iconState}
            callback={() => toggleIconState()}
            type="boolean"
          />
          <Setting
            styles={styles}
            label="Join with microphone"
            falseIcon={noMicSvg}
            trueIcon={micSvg}
            state={startWithMic}
            callback={toggleStartWithMic}
            type="boolean"
          />
          <Setting
            styles={styles}
            label="Join with camera"
            falseIcon={noVideoSvg}
            trueIcon={videoSvg}
            state={startWithCamera}
            callback={toggleStartWithCamera}
            type="boolean"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
