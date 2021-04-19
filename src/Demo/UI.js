import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditToolTabs from "./EditToolTabs";
import Navigation from "./Navigation";
import { Stage, Layer, Rect, Image, Text, Transformer } from "react-konva";
import useImage from "use-image";

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
  const [img, setImg] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [text, setText] = useState({ text: "", fontFamily: "", fontSize: 0 });
  const [image] = useImage(img);

  useEffect(() => {
    if (!image) {
      return;
    }
    setWidth(image.width);
    setHeight(image.height);
  }, [image])

  const DrawImage = () => {
    const scale = Math.min(640 / width, 480 / height);
    const imgWidth = width * scale;
    const imgHeight = height * scale;
    return (
      <Image image={image} width={imgWidth} height={imgHeight} x={320 - imgWidth / 2} y={240 - imgHeight / 2} />
    );
  };


  function changeImg(event) {
    setImg(event.target.src);
    event.preventDefault();
  }

  function changeText(event) {
    let fontFamily = event.target.style.fontFamily
    let fontSize = parseInt(event.target.style.fontSize.split('px')[0])
    let text = event.target.outerText
    setText({ text, fontFamily, fontSize })
  }


  const handleTextEdit = e => {

    console.log(e.target.value)
  };
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
        <EditToolTabs onChangeImg={changeImg} onChangeText={changeText} />
      </Drawer>
      <div className={classes.content}>
        <Stage width={640} height={480} className={classes.canvas}>
          <Layer>
            <DrawImage />
          </Layer>
          <Layer>
            <Text text={text.text} fontFamily={text.fontFamily} x={100} y={200} fontSize={text.fontSize} draggable onClick={handleTextEdit} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
