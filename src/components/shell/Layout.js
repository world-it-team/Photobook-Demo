import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import Footer from "./Footer";
const useStyles = makeStyles(() => ({
    app: {
      minHeight: "100vh",
      position: "relative",
    },
  }));
const Layout = (props) => {
    const classes = useStyles();
    return <React.Fragment className={classes.app}>
        <Header />
        <main>
            {props.children}
        </main>
        <Footer />
    </React.Fragment>
};

export default Layout;