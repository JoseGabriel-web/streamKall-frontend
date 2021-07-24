import { layoutProps } from "src/types/customTypes";
import { FC } from "react";

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <div>
      layout
      {children}
    </div>
  );
};

export default Layout;
