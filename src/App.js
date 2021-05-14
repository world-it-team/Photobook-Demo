import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomeContent from "./components/home/HomeContent"

import { appData } from "./react/data.service";


function App() {
  return (
    <Router>
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

