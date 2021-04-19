import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditToolTabs from "./EditToolTabs";
import Navigation from "./Navigation";
import { Stage, Layer, Rect, Image, Text, } from "react-konva";
import useImage from "use-image";
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
  zoom:{
    width:"500px",
    margin:"600px 150px 0 0"
  },
}));

export default function UI() {
  const classes = useStyles();
  const [img, setImg] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [text, setText] = useState({ text: "", fontFamily: "", fontSize: 0 });
  const [image] = useImage(img);
  const [ state,setState] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0
  });
  const [zoom, setZoom] = useState(1)

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
  function handleWheel(e){
    e.evt.preventDefault();

    const scaleBy = 1.01;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    setState({
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    });
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
        <EditToolTabs onChangeImg={changeImg} onChangeText={changeText} />
      </Drawer>
      <div className={classes.content}>
        <Stage 
          onWheel={handleWheel}
          scaleX={state.stageScale || zoom}
          scaleY={state.stageScale || zoom}
          x={state.stageX}
          y={state.stageY}
          width={640} 
          height={480} 
          className={classes.canvas}
          >
          <Layer>
            <DrawImage />
          </Layer>
          <Layer>
            <Text text={text.text} fontFamily={text.fontFamily} x={100} y={200} fontSize={text.fontSize} draggable onClick={handleTextEdit} />
          </Layer>
        </Stage>
        <div className={classes.zoom}>
          <Typography
            variant="overline"
            classes={{ root: classes.sliderLabel }}
          >
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
      </div>
    </div>
  );
}