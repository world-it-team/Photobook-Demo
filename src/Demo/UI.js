import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import EditToolTabs from "./EditToolTabs";
import Navigation from "./Navigation";
import { Stage, Layer, Rect, Image, Text, Transformer } from "react-konva";
import useImage from "use-image";
import { ContactSupportOutlined } from "@material-ui/icons";
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
    margin:"590px 50px 0 0",
    padding:"0 150px 0 0"
  },

}));
const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(shapeProps.src);
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
      <Text
        text="Hãy đến với PhotoBook của chúng tôi"
        x={50}
        y={100}
        draggable
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

export default function UI() {
  const [zoom, setZoom] = useState(1)
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const classes = useStyles();
  const [bgUrl, setBgUrl] = useState("");
  const [text, setText] = useState({ text: "", fontFamily: "", fontSize: 0 });
  const [state, setState] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0
  })

  const BgImage = () => {
    const [image] = useImage(bgUrl);
    return (
      <Rect fillPatternImage={image} x={0} y={0} width={640} height={480} />
    );
  };

  // const UrlImage = () => {
  //   const [image] = useImage(imgUrl);
  //   return <Image image={image} width={400} height={400} />
  // };

  function changeBg(event) {
    setBgUrl(event.target.src);
    event.preventDefault();
  }

  function ChangeImg(event) {
    setRectangles(rect => [...rect, {
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      id: event.target.alt,
      src: event.target.src
    }])
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
        <EditToolTabs onChangeBg={changeBg} onChangeImg={ChangeImg} onChangeText={changeText}  />
      </Drawer>
      <div className={classes.content}>
        <Stage 

          onWheel={handleWheel}
          scaleX={state.stageScale}
          scaleY={state.stageScale}
          x={state.stageX}
          y={state.stageY}
          width={640 } 
          height={480} 
          className={classes.canvas} >
          <Layer
         
          >
            <BgImage />
            {/* <UrlImage /> */}
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  // imgUrl={imgUrl}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    (rect.id === selectedId) ? selectShape(null) : selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
          <Layer>
            <Text text={text.text} fontFamily={text.fontFamily} x={100} y={200} fontSize={text.fontSize} draggable onClick={handleTextEdit} />
          </Layer>
        </Stage>
  
      </div>
    </div>
  );
}