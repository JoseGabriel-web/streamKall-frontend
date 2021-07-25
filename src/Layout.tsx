import { layoutProps } from "src/types/customTypes";
import { FC, useState } from "react";
import styles from "@styles/layout/layout.module.scss";
import Controls from "@components/controls/Controls";
import SidePanel from "@components/sidePanel/SidePanel";
import Nav from "@components/nav/Nav";

const Layout: FC<layoutProps> = ({ children }) => {
  const [sidePanelState, setSidePanelState] = useState<boolean>(
    window.innerWidth > 1000,
  );

  const handleSidePanel = (): void => {
    setSidePanelState(!sidePanelState);
  };

  return (
    <div className={styles.layout} data-layout>
      <Nav />
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.children}>{children}</div>
          <Controls />
        </div>
        <SidePanel sidePanelState={sidePanelState} />
      </div>
    </div>
  );
};

export default Layout;
