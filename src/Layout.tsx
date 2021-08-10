import { layoutProps } from "src/types/customTypes";
import { FC, useEffect, useState } from "react";
import styles from "@styles/layout/layout.module.scss";
import Controls from "@components/controls/Controls";
import SidePanel from "@components/sidePanel/SidePanel";
import Nav from "@components/nav/Nav";
import AppContext from "./context/app/AppContext";

const Layout: FC<layoutProps> = ({ children }) => {
  let [initialHeight, setInitialHeight] = useState(window.innerHeight);
  useEffect(() => {
    setInitialHeight(window.innerHeight);
    console.log(initialHeight);
  }, []);

  return (
    <div
      style={{ minHeight: initialHeight + "px" }}
      className={styles.layout}
      data-layout
    >
      <AppContext>
        <Nav />
        <div className={styles.container}>
          <SidePanel />
          <div className={styles.contentContainer}>
            <div className={styles.children}>{children}</div>
            <Controls />
          </div>
        </div>
      </AppContext>
    </div>
  );
};

export default Layout;
