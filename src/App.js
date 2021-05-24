
import HomeContent from "./components/home/HomeContent"
import ImageContent from "./components/imagePage/ImageContent"
import Login from "./components/login/Login"
import Popup from "./components/login/sections/Popup"
import SigUp from "./components/login/SigUp"
import RedirectPage from "./components/login/RedirectPage"
import PopUp from "./components/login/sections/Popup"
import Newphotos from "./components/imagePage/sections/NewPhotos"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"



import { appData } from "./react/data.service";
import NewPhotos from "./components/imagePage/sections/NewPhotos"


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/popup">
            <Popup/>
          </Route>
          <Route exact path="/redirectPage">
            <RedirectPage/>
          </Route>
          <Route exact path="/sigup">
            <SigUp/>
          </Route>
          <Route exact path="/popup">
            <PopUp/>
          </Route>
          <Route exact path="/newphotos">
            <NewPhotos/>
          </Route>
          <Route exact path="/">
            <HomeContent data={appData.chooseData} />
         </Route>
         <Route exact path="/images">
            <ImageContent data={appData.chooseImage} />
         </Route>
      </Switch>
    </Router>
  );
}

export default App;

