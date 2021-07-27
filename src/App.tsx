import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import screens from "./data/screens";
import { screenInterface } from "@customTypes";

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          {screens.map(({ path, Component, label }: screenInterface) => (
            <Route key={label} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
