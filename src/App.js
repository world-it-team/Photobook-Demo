import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomeContent from "./components/home/HomeContent"

import Login from "./components/login/Login"
import SingUp from "./components/login/SingUp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import { appData } from "./react/data.service";


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/singup">
            <SingUp/>
          </Route>
        </Switch>
      <Switch>
        <Route exact path="/">
          <HomeContent data={appData.chooseData} />
        </Route>
        <Route exact path="/login">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

