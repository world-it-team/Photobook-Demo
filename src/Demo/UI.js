import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import EditBar from "./EditBar";
import Navigation from "./Navigation"

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // edit:{ width:850, height:440, border:"1px solid gray"},
  editIcon: { fontSize: 40, marginRight: 20 },
}));

export default function UI() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Photo Editor
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Navigation />
      {/*Tool*/}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <EditBar />
        </div>
      </Drawer>

      {/*Main Edit Content */}
      <main className={classes.content}>
        <Toolbar />



        <div>
          <UndoIcon className={classes.editIcon} />
          <RedoIcon className={classes.editIcon} />
        </div>
      </main>
    </div>
  );
}
