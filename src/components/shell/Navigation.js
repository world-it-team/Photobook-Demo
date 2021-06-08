import React from "react";


import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";

import Clear from "@material-ui/icons/Clear";
import Favorite from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import Settings from "@material-ui/icons/Settings";
import VolumeUp from "@material-ui/icons/VolumeUp";
import LoginOutButton from "./LoginOutButton";
import Alink from "../common/Alink";




const useStyles = makeStyles((theme) => ({
  appBarList: {},
  wrapnavMenu: {
    color: "#fff",
    backgroundImage:
      "linear-gradient(to right,#f55f8d 0,#f8ae56 100%,#f55f8d 100%)",
    
    zIndex: 7,
  },
  navMenu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      padding: 0,
      width: "100vw",
      height: "100%",
      margin: "auto",
      zIndex: 7,
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "40vw",
      height: "100%",
      margin: "auto",
      zIndex: 7,
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      margin: "auto",
    },
  },
  navItem: {
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textDecoration: "none",
    alignItems: "center",
    width: "auto",
    height: "30px",
    padding: "0 10px",
    color: "#fff",
    fontSize: "18px",
    marginRight: "30px",
    zIndex: 9,
    [theme.breakpoints.down("md")]: {
      color: "#000000",
    },
    position: "relative",
    "&:hover": {
      color: "yellow",
    },
    "&:after": {
      position: "absolute",
      bottom: "0",
      left: 0,
      right: 0,
      margin: "auto",
      width: "0%",
      content: "''",
      color: "transparent",
      background: "linear-gradient(to right bottom, #004EB4, #004EB4)",
      height: "3px",
      transition: "all .5s",
    },
    "&:before": {
      transition: "all .5s",
    },

    "&:hover:after": {
      width: "100%",
    },
  },
  appBarList: {
    
  },
  appBarOutlineNone: {},
}));

export default function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "responsive-menu-id";

  const listObject = (
    <List
      className={classes.appBarList}
      display="flex!important"
      justifyContent="space-between"
      alignItems="center"
      component={Box}
      maxWidth="xl"
    >
      <List className={classes.navMenu}>
        <ListItem className={classes.appBarListItem}>
        <Alink to="/">
            <Box className={classes.navItem}>Home</Box>
          </Alink>
        </ListItem>
        {/* <ListItem className={classes.appBarListItem}>
          <Alink to="/photoedit">
            <Box className={classes.navItem}>PhotoBook</Box>
          </Alink>
        </ListItem> */}

        <ListItem className={classes.appBarListItem}>
         <Alink to="/images">
            <Box className={classes.navItem}>ImagePrint</Box>
          </Alink>
        </ListItem>
        <ListItem className={classes.appBarListItem}>
          <Alink to="/blog">
            <Box className={classes.navItem}>Blog</Box>
          </Alink>
        </ListItem>

        <LoginOutButton />
      </List>
    </List>
  );

  const appBarRootClasses = {
    root: classes.appBarRootDefault,
  };
  const menuClasses = { paper: classes.appBarMenuPaper };
  const menuPozitions = { vertical: "top", horizontal: "right" };
  return (
    <>
      <AppBar
        
        color="inherit"
        elevation={0}
        classes={appBarRootClasses}
        className={classes.wrapnavMenu}
      >
        <Toolbar>
          <Container
            display="flex!important"
            justifyContent="space-between"
            alignItems="center"
            component={Box}
            maxWidth="xl"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Alink to="/">
                <Box component="a" className={classes.appBarBrand} color="#fff">
                  LOGO
                </Box>
              </Alink>
              <Hidden mdDown implementation="js">
                {listObject}
              </Hidden>
              <Hidden
                className={classes.listObjectStyle}
                lgUp
                implementation="js"
                backgroundColor="#ff0000"
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls={menuId}
                  aria-haspopup="true"
                >
                  <Box
                    component={MenuIcon}
                    color={theme.palette.white}
                    width="2rem!important"
                    height="2rem!important"
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={menuPozitions}
                  id={menuId}
                  keepMounted
                  transformOrigin={menuPozitions}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  classes={menuClasses}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    flexDirection="colum"
                    paddingLeft="1.25rem"
                    paddingRight="1.25rem"
                    paddingBottom="1rem"
                    className={classes.appBarOutlineNone}
                  >
                    <Box
                      alt="..."
                      height="36px"
                      component="img"
                      className={classes.appBarHeaderImg}
                      src={
                        require("../../images/home/banner-image1.png").default
                      }
                    />
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleMenuClose}
                      aria-controls={menuId}
                      aria-haspopup="true"
                    >
                      <Box
                        component={Clear}
                        width="2rem!important"
                        height="2rem!important"
                      />
                    </IconButton>
                  </Box>
                  <Box
                    component={Divider}
                    marginBottom="1rem!important"
                    marginLeft="1.25rem!important"
                    marginRight="1.25rem!important"
                  />
                  {listObject}
                </Menu>
              </Hidden>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}












































































































































































































































