import toggleOnSvg from '@assets/svg/toggleOn.svg'
import toggleOffSvg from '@assets/svg/toggleOff.svg'

interface SettingInterface {
  styles: {
    readonly [key: string]: string;
  };
  callback: () => void;
  label: string;
  falseIcon: string;
  trueIcon?: string;
  state: boolean;
  type: "dropdown" | "boolean"
}

const Setting = ({ styles, label, falseIcon, trueIcon, state, callback, type }: SettingInterface) => {
  return (
    <div className={styles.setting}>
        <h5 className={styles.label}>
          <img src={state && trueIcon? trueIcon : falseIcon} />
          {label}
        </h5>
        <div className={styles.action}>
          {
            type === "boolean"? (
              <img onClick={callback} src={state? toggleOnSvg : toggleOffSvg} />
            ) : (
              <div />
            )
          }
        </div>
    </div>
  );
};

export default Setting;
