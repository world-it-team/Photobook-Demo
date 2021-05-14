
import LoginDialog from "./components/login/LoginDialog"
import HomeContent from "./components/home/HomeContent"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContent />
        </Route>
        <Route exact path="/login">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

