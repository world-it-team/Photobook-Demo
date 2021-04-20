import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
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

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, image }) => {
  // const [image] = useImage(imgUrl);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // shapeRef.current.cache();
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useLayoutEffect(() => {
    shapeRef.current.cache();
  }, [shapeProps, image, isSelected]);

  return (
    <React.Fragment>
      <Image
        image={image}
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          node.width(Math.max(5, node.width() * scaleX));
          node.height(Math.max(node.height() * scaleY));

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: node.width(),
            height: node.height(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    id: "rect1",
  },
];

export default function UI() {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const classes = useStyles();
  const [bgUrl, setBgUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [image] = useImage(imgUrl);
  const [text, setText] = useState(null);
  const [zoom, setZoom] = useState({
    zoomScale: 1,
    X: 0,
    Y: 0
  });

  useEffect(() => {
    if (image) {
      const scale = Math.min(640 / image.width, 480 / image.height);
      setRectangles([{
        x: (640 - image.width * scale) / 2,
        y: (480 - image.height * scale) / 2,
        width: image.width * scale,
        height: image.height * scale,
        id: "rect1",
      }])
    }
  }, [image])

  const BgImage = () => {
    const [image] = useImage(bgUrl);
    return (
      <Rect fillPatternImage={image} x={0} y={0} width={640} height={480} />
    );
  };

  const AddText = () => {
    const [editedText] = useImage(text)
    return <Image image={editedText} width={300} height={50} draggable />
  }


  // const UrlImage = () => {
  //   const [image] = useImage(imgUrl);
  //   return <Image image={image} width={400} height={400} />
  // };

  function changeBg(event) {
    setBgUrl(event.target.src);
    event.preventDefault();
  }

  function ChangeImg(event) {
    setImgUrl(event.target.src);
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

    setZoom({
      zoomScale: newScale,
      X:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      Y:
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
        <EditToolTabs onChangeBg={changeBg} onChangeImg={ChangeImg} onChangeText={changeText} />
      </Drawer>
      <div className={classes.content}>
        <Stage
          width={640}
          height={480}
          onWheel={handleWheel}
          scaleX={zoom.zoomScale}
          scaleY={zoom.zoomScale}
          x={zoom.X}
          y={zoom.Y}
          className={classes.canvas}
        >
          <Layer>
            <BgImage />
            {/* <UrlImage /> */}
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  imgUrl={imgUrl}
                  image={image}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    (rect.id === selectedId) ? selectShape(null) : selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    console.log(rects);
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
          <Layer>
            <AddText />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
