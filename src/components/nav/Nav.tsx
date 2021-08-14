import { FC, useState } from "react";
import styles from "@styles/components/nav/nav.module.scss";
import logoBlack from "@assets/img/logo-black.png";
import logoWhite from "@assets/img/logo-white.png";
import ControlBtn from "@components/controls/ControlBtn";
import { Link } from "react-router-dom";
import Settings from "@components/settings/Settings";
import { Gear } from "react-bootstrap-icons";


const Nav: FC = () => {
  const [settingsState, setSettingsState] = useState<boolean>(false);
  const openSettings = () => setSettingsState(true);

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection} />
      <Link to="/" className={styles.middleSection}>
        <img src={logoBlack} />
      </Link>
      <div className={styles.rightSection}>
        <ControlBtn
          key={"settingsSvg"}
          Svg={Gear}
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
