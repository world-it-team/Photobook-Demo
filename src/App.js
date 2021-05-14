
import LoginDialog from "./components/login/LoginDialog"
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
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

