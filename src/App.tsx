import { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import screens from './data/screens'
import Layout from './Layout'
import { screenInterface } from 'src/types/customTypes'

const App:FC = () => {
  return (
    <Layout>
        <Router>
            <Switch>
                {screens.map(({ path, Component }: screenInterface) => (
                  <Route path={path} exact>
                    <Component />
                  </Route>
                ))}
            </Switch>
        </Router>
    </Layout>
  )
}

export default App

