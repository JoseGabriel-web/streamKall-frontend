import { FC, useState } from "react";
import styles from "@styles/components/nav/nav.module.scss";
import logo from "@assets/img/logo-black.png";
import settingsSvg from "@assets/svg/settings.svg";
import ControlBtn from "@components/controls/ControlBtn";
import { Link } from "react-router-dom";
import Settings from "@components/settings/Settings";

const Nav: FC = () => {
  const [settingsState, setSettingsState] = useState<boolean>(false);
  const openSettings = () => setSettingsState(true);

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection} />
      <Link to="/" className={styles.middleSection}>
        <img src={logo} />
      </Link>
      <div className={styles.rightSection}>
        <ControlBtn
          key={"settingsSvg"}
          svg={settingsSvg}
          state={true}
          callback={openSettings}
        />
      </div>
      <Settings
        settingsState={settingsState}
        setSettingsState={setSettingsState}
      />
    </nav>
  );
};

export default Nav;
