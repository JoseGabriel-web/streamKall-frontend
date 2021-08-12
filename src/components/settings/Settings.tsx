import { useRef, useState } from "react";
import useClickLocation from "@hooks/useClickLocation";
import styles from "@styles/components/settings/settings.module.scss";
import Setting from "./Setting";
import moonSvg from '@assets/svg/moon.svg'
import fullMoonSvg from '@assets/svg/fullMoon.svg'
import micSvg from '@assets/svg/mic.svg'
import noMicSvg from '@assets/svg/noMic.svg'
import videoSvg from '@assets/svg/video.svg'
import noVideoSvg from '@assets/svg/noVideo.svg'

interface SettingsProps {
  settingsState: boolean;
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({ settingsState, setSettingsState }: SettingsProps) => {
  const settingsRef = useRef(null);
  const closeSettings = () => setSettingsState(false);
  useClickLocation(settingsRef, closeSettings);

  const [iconState, setIconState] = useState(false)

  const toggleIconState = () => setIconState(prev => !prev)

  return (
    <div
      data-isopened={settingsState}
      className={styles.settingsSection}
      ref={settingsRef}
    >
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
        state={iconState}
        callback={() => toggleIconState()}
        type="boolean"
      />
      <Setting
        styles={styles}
        label="Join with camera"
        falseIcon={noVideoSvg}
        trueIcon={videoSvg}
        state={iconState}
        callback={() => toggleIconState()}
        type="boolean"
      />
    </div>
  );
};

export default Settings;
