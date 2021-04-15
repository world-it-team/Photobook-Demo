import React, { useCallback, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Button from "@material-ui/core/Button";
import Cropper from "react-easy-crop";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Slider from "@material-ui/core/Slider";

import getCroppedImg from "./cropImage";

import naruto from "../../image/bg3.jpg"
import naruto1 from "../../image/bg2.jpg"
import naruto2 from "../../image/bg1.jpg"


const listImg = [
  {
    src: naruto,
    alt: "naruto"
  },
  {
    src: naruto1,
    alt: "sasuke"
  },
  {
    src: naruto2,
    alt: "itadori"
  }
];

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      paddingTop: "20px",
      paddingBottom: "20px"
    },
    gridList: {
      width: "600px",
      height: "auto"
    },
    gridListTile: {
      border: "1px solid #000000"
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      cursor: "pointer"
    },
    cropContainer: {
      position: "relative",
      width: "100%",
      height: "70vh",
      background: "#333"
    },
    controls: {
      padding: 16,
      display: "flex"
    },
    sliderContainer: {
      display: "flex",
      flex: "1",
      alignItems: "center"
    },
    slider: {
      margin: "auto 20px"
    },
    buttonContainer: {
      margin: "20px auto"
    },
    button: {
      margin: "0 50px",
      width: "110px"
    }
  })
);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ZoomPhoto() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [editImg, setEditImg] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        editImg,
        croppedAreaPixels,
        rotation
      );
      listImg.forEach((e) => {
        if (e.src === editImg) e.src = croppedImage;
      });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  }, [editImg, croppedAreaPixels, rotation]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} cols={3} className={classes.gridList}>
        {listImg.map((img) => (
          <GridListTile className={classes.gridListTile}>
            <img
              className={classes.img}
              src={img.src}
              alt={img.alt}
              onClick={() => {
                setEditImg(img.src);
                setOpen(true);
              }}
            />
          </GridListTile>
        ))}
      </GridList>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className={classes.cropContainer}>
          <Cropper
            image={editImg}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            minZoom={0.5}
            maxZoom={3}
            aspect={3 / 3}
            zoomWithScroll={false}
            restrictPosition={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              {" "}
              Zoom{" "}
            </Typography>
            <Slider
              value={zoom}
              min={0.5}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              className={classes.slider}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              {" "}
              Rotation{" "}
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              className={classes.slider}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={saveImage}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {" "}
            保存{" "}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {" "}
            キャンセル{" "}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
