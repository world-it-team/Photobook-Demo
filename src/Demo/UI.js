import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EditToolTabs from "./EditToolTabs";
import Konva from "konva";
import Navigation from "./Navigation";

const drawerWidth = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    position: "relative",
  },
  canvas: {
    position: "absolute",
    boxShadow: "0 0 5px grey",
    right: 70,
    top: 100,
  },
}));

export default function UI() {
  const [background, setBackground] = React.useState(``);
  const [canvas, setCanvas] = React.useState(null);
  const classes = useStyles();

  console.log(background);

  React.useEffect(() => {
    addCanvas(background);
  }, []);

  function changeBg(event) {
    setBackground(event.target.src);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <EditToolTabs onChangeBg={changeBg} />
      </Drawer>
      <div className={classes.content}>
        <div id="canvas" className={classes.canvas}></div>
      </div>
    </div>
  );
}

function addCanvas(url) {
  let stage = new Konva.Stage({
    container: "canvas",
    width: 640,
    height: 480,
  });
  let layer = new Konva.Layer();
  let bg = new Konva.Rect({
    width: stage.width(),
    height: stage.height(),
  });
  var imageObj = new Image();
  imageObj.onload = function () {
    bg.fillPatternImage(imageObj);
    bg.draw();
  };
  imageObj.src = url;
}
