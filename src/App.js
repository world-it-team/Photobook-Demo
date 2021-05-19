
import HomeContent from "./components/home/HomeContent"
import ImageContent from "./components/imagePage/ImageContent"
import Login from "./components/login/Login"
import SingUp from "./components/login/SingUp";
import RedirectPage from "./components/login/RedirectPage";
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
          <Route exact path="/redirectPage">
            <RedirectPage/>
          </Route>
          <Route exact path="/singup">
            <SingUp/>
          </Route>
          <Route exact path="/">
            <HomeContent data={appData.chooseData} />
         </Route>
         <Route exact path="/images">
            <ImageContent data={appData.chooseImage}/>
         </Route>
      </Switch>
    </Router>
  );
}

export default App;

