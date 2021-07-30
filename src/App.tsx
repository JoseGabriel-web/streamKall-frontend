import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import screens from "./data/screens";
import { screenInterface } from "@customTypes";

const App: FC = () => {
  return (
    <Layout>
      <Switch>
        {screens.map(({ path, Component, label, exact }: screenInterface) => (
          <Route key={label} path={path} exact={exact}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Layout>
  );
};

export default App;
