import React,{useState} from "react";
import Alink from "../common/Alink";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ImageIcon from "@material-ui/icons/Image";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import { isLoggedIn,logout } from "../../utils/Auth"
import {useHistory} from "react-router-dom";
import getFirebase from "../../utils/firebase"

const useStyles = makeStyles({
root: {
    // position: "fixed",
},
  navTitle: {
    textAlign: "center",
  },
  navMenu: {
    display: "flex",
    justifyContent: "space-around",
    padding: 0,
  },
  navItem: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
});

export default function Navigation() {

    const classes = useStyles();
    const firebase = getFirebase()
    const [state, setState] = useState(isLoggedIn());
   
    const handleLogout = () => {
    
      logout(firebase)
      setState(false)
  }

  return (
    <nav className={classes.root}>
      <h1 className={classes.navTitle}>フォトブック</h1>
      <ul className={classes.navMenu}>
        <Alink to="/">
          <li className={classes.navItem}>
            <HomeIcon /> Home
          </li>
        </Alink>
        <Alink to="/images">
          <li className={classes.navItem}>
            <ImageIcon />
            Image
          </li>
        </Alink>
        <Alink to="/blog">
          <li className={classes.navItem}>
            <ChromeReaderModeIcon />
            Blog
          </li>
        </Alink>
        {!state  ?
            <Alink to="/login">
              <li  className={classes.navItem}>
                <ExitToAppIcon /> Login
              </li>
          </Alink>
          :  
          <div onClick={handleLogout}>
            <Alink to="/">
              <li  className={classes.navItem}>
                <ExitToAppIcon /> LogOut
              </li>
            </Alink>
          </div>
        }
      </ul>
    </nav>
  );
}
