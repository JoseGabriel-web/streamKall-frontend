import toggleOnSvg from "@assets/svg/toggleOn.svg";
import toggleOffSvg from "@assets/svg/toggleOff.svg";
import { Icon, ToggleOff, ToggleOn } from "react-bootstrap-icons";

interface SettingInterface {
  styles: {
    readonly [key: string]: string;
  };
  callback: () => void;
  label: string;
  FalseIcon: Icon;
  TrueIcon?: Icon;
  state: boolean;
  type: "dropdown" | "boolean";
}

const Setting = ({
  styles,
  label,
  FalseIcon,
  TrueIcon,
  state,
  callback,
  type,
}: SettingInterface) => {
  return (
    <div className={styles.setting}>
      <h5 className={styles.label}>
        {state && TrueIcon ? (
          <TrueIcon />
        ) : (
          <FalseIcon />
        )}
        {label}
      </h5>
      <div className={styles.action}>
        {type === "boolean" ? (
          <div onClick={() => callback()}>
            {state ? <ToggleOn /> : <ToggleOff />}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Setting;
