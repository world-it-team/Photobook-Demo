
import HomeContent from "./components/home/HomeContent"
import ImageContent from "./components/imagePage/ImageContent"
import BlogContent from "./components/blog/BlogContent"
import TestContent from "./components/testPage/TestContent"
import Login from "./components/login/Login"
import Popup from "./components/login/sections/Popup"
import SignUp from "./components/login/SignUp"
import RedirectPage from "./components/login/RedirectPage"
import PopUp from "./components/login/sections/Popup"
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
          <Route exact path="/popup">
            <Popup/>
          </Route>
          <Route exact path="/redirectPage">
            <RedirectPage/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/popup">
            <PopUp/>
          </Route>
          <Route exact path="/">
            <HomeContent data={appData.chooseData} />
         </Route>
         <Route exact path="/images">
            <ImageContent data={appData.chooseImage} />
         </Route>
         <Route exact path="/blog">
            <BlogContent data={appData.blog} />
         </Route>
         <Route exact path="/test">
            <TestContent data={appData.test} />
         </Route>
      </Switch>
    </Router>
  );
}

export default App;

