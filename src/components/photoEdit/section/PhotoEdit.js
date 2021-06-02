import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getUser } from "../../../utils/Auth";
import { getChoosedImage } from "../../../api/photo.service";
import GetCroppedImg from "./GetCroppedImg";
import Button from "@material-ui/core/Button";
import Cropper from "react-easy-crop";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Slider from "@material-ui/core/Slider";
import "./PhotoEdit.css"

const uid = getUser().uid;
const useStyles = makeStyles((theme) => ({
  choosedImageContainer: {
    width: "95%",
    margin: "auto",
  },
  choosedImageBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 90,
    maxWidth: 327,
    border: "1px solid lightblue",
    gap: 2,
  },
  choosedImageWrapper: {
    position: "relative",
    width: 45,
    height: 45,
  },
  choosedImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  editImageContainer: {
    maxWidth: "95%",
    minHeight: 300,
    border: "1px solid black",
    margin: "10% auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  editImageWrapper: {
    position: "absolute",
    width: 330,
    height: 260,
    border: "1px solid grey",
    backgroundColor: "white",
  },
  editImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cropContainer: {
    maxWidth: "100%",
    minHeight: 400,
    position: "relative"
  },
}));

const style = {
  
};

function getSrc(src) {
  const results = src.split("/");
  const imgFileName = results[results.length - 1];
  return require("../../../images/imagePage/" + imgFileName).default;
}

export default function PhotoEdit(props) {
  const classes = useStyles();
  const [choosedImageKey, setChoosedImageKey] = useState("");
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [editImg, setEditImg] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [initialCroppedAreaPixels, setInitialCroppedAreaPixels] = useState(
    undefined
  );

  const choosedImage = props.data
    .map((item) => item.img)
    .filter((item) => choosedImageKey.includes(item.alt));

  const addImage = (e) => {
    setEditImg(e.target.src);
  };

  const handleClose = () => {
    setOpen(false);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const onCropComplete = useCallback((croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const saveImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await GetCroppedImg(
  //       editImg,
  //       croppedAreaPixels,
  //       rotation
  //     );
  //     choosedImage.forEach((e) => {
  //       if (e.src === editImg) e.src = croppedImage;
  //     });
  //     handleClose();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [editImg, croppedAreaPixels, rotation]);

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  React.useEffect(() => {
    getChoosedImage().then((data) => {
      const result = data
        .filter((x) => x.uid === uid)
        .map((result) => result.key);
      setChoosedImageKey(result);
    });
  }, []);

  return (
    <section>
      {/*Choosed Image Container*/}
      <div className={classes.choosedImageContainer}>
        <h3>写真を選んで下さい！</h3>
        <div className={classes.choosedImageBox}>
          {choosedImage.map((tile, index) => (
            <div className={classes.choosedImageWrapper}>
              <img
                src={getSrc(tile.src)}
                alt={tile.alt}
                className={classes.choosedImage}
                key={index}
                onClick={(e) => addImage(e)}
              />
            </div>
          ))}
        </div>
      </div>

      {/*Edit Image Container*/}
      <div className={classes.editImageContainer}>
        <div className={classes.editImageWrapper}>
          <img
            src={editImg}
            className={classes.editImage}
            onClick={handleOpen}
          />
        </div>
      </div>

      {/*Show Modal Crop*/}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <div className={classes.cropContainer}>
          <Cropper
            image={editImg}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            minZoom={0.5}
            maxZoom={3}
            aspect={1}
            showGrid={false}
            style={
              ({ containerStyle: style.container },
              { mediaStyle: style.media },
              { cropAreaStyle: style.cropArea })
            }
            classes ={
              ({ containerClassName: "cropContainer" },
                { mediaClassName: "cropMedia" },
                { cropAreaClassName: "cropArea" })
            }
            zoomWithScroll={false}
            restrictPosition={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            initialCroppedAreaPixels={initialCroppedAreaPixels}
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
            // onClick={saveImage}
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
    </section>
  );
}
