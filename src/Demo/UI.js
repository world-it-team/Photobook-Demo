import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditToolTabs from "./EditToolTabs";
import Navigation from "./Navigation";
import {Stage,Layer,Rect} from "react-konva"
import useImage from "use-image"


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

  const classes = useStyles();
  const [bgUrl, setBgUrl] = React.useState('')
  console.log(bgUrl);

  const BgImage = ()=> {
    const [image] = useImage(bgUrl);
    return <Rect fillPatternImage={image} x={0} y={0} width={640} height={480} />;
  };

  function changeBg(event) {
    setBgUrl(event.target.src);
    event.preventDefault();
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
        <EditToolTabs onChangeBg ={changeBg} />
      </Drawer>
      <div className={classes.content}>
          <Stage width ={640} height={480} className={classes.canvas}>
            <Layer>
              <BgImage/>
            </Layer>
          </Stage>
      </div>
    </div>
  );
}

