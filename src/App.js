
import Login from "./components/login/Login"
import SingUp from "./components/login/SingUp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"


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
    </Router>
  );
}

export default App;

