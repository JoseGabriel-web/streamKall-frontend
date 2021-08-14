import { useRef } from "react";
import useClickLocation from "@hooks/useClickLocation";
import styles from "@styles/components/settings/settings.module.scss";
import Setting from "./Setting";
import ControlBtn from "@components/controls/ControlBtn";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  CameraVideo,
  CameraVideoOff,
  Mic,
  MicMute,
  XLg,
} from "react-bootstrap-icons";

interface SettingsProps {
  settingsState: boolean;
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({ settingsState, setSettingsState }: SettingsProps) => {
  const settingsRef = useRef(null);
  const closeSettings = () => setSettingsState(false);
  useClickLocation(settingsRef, closeSettings);

  const [startWithCamera, setStartWithCamera] = useLocalStorage(
    "startWithCamera",
    false,
  );
  const [startWithMic, setStartWithMic] = useLocalStorage(
    "startWithMic",
    false,
  );

  const toggleStartWithCamera = () => setStartWithCamera((prev) => !prev);
  const toggleStartWithMic = () => setStartWithMic((prev) => !prev);

  return (
    <div data-isopened={settingsState} className={styles.settingsSection}>
      <div ref={settingsRef} className={styles.settingsContainer}>
        <div className={styles.settingsHeader}>
          <h4 className={styles.settingsLabel}>Settings</h4>
          <ControlBtn Svg={XLg} state={false} callback={closeSettings} />
        </div>
        <div className={styles.settings}>
          <Setting
            styles={styles}
            label="Join with microphone"
            FalseIcon={MicMute}
            TrueIcon={Mic}
            state={startWithMic}
            callback={toggleStartWithMic}
            type="boolean"
          />
          <Setting
            styles={styles}
            label="Join with camera"
            FalseIcon={CameraVideoOff}
            TrueIcon={CameraVideo}
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
