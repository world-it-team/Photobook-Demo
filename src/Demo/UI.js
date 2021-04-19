import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditToolTabs from "./EditToolTabs";
import Navigation from "./Navigation";
import { Stage, Layer, Image, Text, } from "react-konva";
import useImage from "use-image";
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  mainContent: {
    margin: "64px 0 0 0",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
  },
  LeftPanel: {
    minWidth: "40%",
    maxWidth: "40%",
    marginRight: "20px",

  },
  RightPanel: {
    width: "auto",
    padding: "0 60px",
  },
  canvas: {
    boxShadow: "0 0 5px grey",
    margin: "30px auto",
  },
  zoom: {
    position: "fixed",
    bottom: "50px",
    left: "50%",
    width: "500px"
  }
}));

export default function UI() {
  const classes = useStyles();
  const [img, setImg] = useState("");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [text, setText] = useState(null);
  const [image] = useImage(img);
  const [state, setState] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0
  });
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (image) {
      setWidth(image.width);
      setHeight(image.height);
    }
  }, [image])

  const DrawImage = () => {
    const scale = Math.min(640 / width, 480 / height);
    const imgWidth = width * scale;
    const imgHeight = height * scale;
    return (
      <Image
        image={image}
        width={imgWidth * zoom}
        height={imgHeight * zoom}
        x={(640 - imgWidth) * zoom / 2}
        y={(480 - imgHeight) * zoom / 2}
      // draggable
      // onDragEnd={(e) => {
      //   setState({
      //     stageScale: state.stageScale,
      //     stageX: e.target.x(),
      //     stageY: e.target.y()
      //   });
      // }}
      />
    );
  };
  const AddText = () => {
    const [editedText] = useImage(text)
    return <Image image={editedText} width ={300} height = {50} draggable />
  }


  function changeImg(event) {
    setImg(event.target.src);
    event.preventDefault();
  }
  function changeText(event) {
    setText(event)
  }
  
  function handleWheel(e) {
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
      <Navigation />
      <div className={classes.mainContent}>
        <div className={classes.LeftPanel}>
          <EditToolTabs onChangeImg={changeImg} onChangeText={changeText} />
        </div>
        <div className={classes.RightPanel}>
          <Stage
            onWheel={handleWheel}
            scaleX={state.stageScale}
            scaleY={state.stageScale}
            x={state.stageX}
            y={state.stageY}
            width={640 * zoom}
            height={480 * zoom}
            className={classes.canvas}
          >
            <Layer className={classes.layer}>
              <DrawImage />
            </Layer>
            <Layer>
              <AddText/>
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
              min={0.1}
              max={3}
              step={0.01}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}