
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
          <Route exact path="/">
            <HomeContent data={appData.chooseData} />
         </Route>
      </Switch>
    </Router>
  );
}

export default App;

