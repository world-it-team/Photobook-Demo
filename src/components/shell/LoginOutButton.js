import React, { useState } from "react";
import Alink from "../common/Alink";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ImageIcon from "@material-ui/icons/Image";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import { isLoggedIn, logout } from "../../utils/Auth";
import getFirebase from "../../utils/firebase";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    navItemRight: {
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        textDecoration: "none",
        padding: "0 10px",
        color: "#fff",
        [theme.breakpoints.down('md')]: {
    
            // backgroundColor:"#ff0000",
            color:"#ff0000",
          },
      },
      wrapItemRight: {
        display: "flex",
    
      },
}))

export default function Navigation() {
  const classes = useStyles();
  const firebase = getFirebase();
  const [state, setState] = useState(isLoggedIn());

  const handleLogout = () => {
    logout(firebase);
    setState(false);
  };

  return (
        <Box className={classes.wrapnavMenu}>
          <Box className={classes.wrapItemRight}>
            {/* <Alink to="/blog">
              <Box className={classes.navItemRight}>
                <ChromeReaderModeIcon />
                Blog
              </Box>
            </Alink> */}
            {!state ? (
              <Alink to="/login">
                <Box className={classes.navItemRight}>
                  <ExitToAppIcon paddingTop="8px"/> Login
                </Box>
              </Alink>
            ) : (
              <Box onClick={handleLogout}>
                <Alink to="/">
                  <Box className={classes.navItemRight}>
                    <ExitToAppIcon /> LogOut
                  </Box>
                </Alink>
              </Box>
            )}
          </Box>
        </Box>

  );
}
