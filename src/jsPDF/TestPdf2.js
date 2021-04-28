import React, { useState, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import JsPDF from "jspdf";
import { Stage, Layer, Image, Text, Rect } from 'react-konva';
import useImage from 'use-image';
import Konva from "konva"
import CircularProgress from '@material-ui/core/CircularProgress';


import naruto from "../image/naruto.png"
import sasuke from "../image/sasuke.jpg"
import yonko from "../image/yonko.jpg"
import law from "../image/law.jpg"
import luffy from "../image/luffy.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: 1000,
        flexGrow: 1,
    },
    konva: {
        margin: '20px  auto',
        boxShadow: "0 0 5px grey",
        width: "420px",
        height: "594px"
    },
    mobileStepper: {
        margin: "20px auto",
        width: "420px",
    },
    saveButton: {
        backgroundColor: "#6a6cd6",
        display: "flex",
        margin: "auto"
    }
}));



const DrawImage = ({ src, x, y, width, height }) => {
    const [image] = useImage(src, 'Anonymous');
    var x, y, width, height, scale;
    if (image) {
        scale = Math.min(420 / image.width, 594 / image.height);
        width = image.width * scale;
        height = image.height * scale;
        x = (420 - width) / 2;
        y = (594 - height) / 2;
    }
    return <Image
        x={x}
        y={y}
        image={image}
        width={width}
        height={height}
    />;
}

export default function TextPdf2() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [active, setActive] = useState(false)
    const [process, setProcess] = useState({
        label:"Save as PDF"
    })


    const [image, setImage] = useState([
        {
            width: 420,
            height: 420,
            x: 0,
            y: 0,
            src: naruto,
        },
        {
            width: 420,
            height: 420,
            x: 0,
            y: 0,
            src: sasuke,
        },
        {
            width: 420,
            height: 420,
            x: 0,
            y: 0,
            src: law,
        },
        {
            width: 420,
            height: 420,
            x: 0,
            y: 0,
            src: luffy,
        },
        {
            width: 420,
            height: 420,
            x: 0,
            y: 0,
            src: yonko,
        },
    ]);


    const [label, setLabel] = useState([
        {
            label: "naruto",
            x: 30,
            y: 30,
            fontSize: 20,
        },
        {
            label: "sasuuke",
            x: 30,
            y: 30,
            fontSize: 20,
        },
        {
            label: "law",
            x: 30,
            y: 30,
            fontSize: 20,
        },
        {
            label: "luffy",
            x: 30,
            y: 30,
            fontSize: 20,
        },
        {
            label: "yonko",
            x: 30,
            y: 30,
            fontSize: 20,
        },
    ]);
    const maxSteps = image.length + 1;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + maxSteps - 1) % maxSteps);
    };




    const generatePDF = () => {
        setProcess({
            label:"Loading..."
        })
        setActive(true)
        var doc = new JsPDF("p", "pt", "a4");
        let counter = 0;
        var stage = new Konva.Stage({
            container: 'container',
            width: 420,
            height: 594,
        });
        var layer = new Konva.Layer();
        stage.add(layer);

        var text = new Konva.Text({
            text: "これはタイトルページです。",
            x: 30,
            y: 255,
            fontSize: 20,
            fill: "#dd4a0f"
        });
        text.cache();
        layer.add(text);

        doc.addImage(
            layer.toDataURL({ pixelRatio: 2 }),
            0,
            0,
            595,
            842
        );
        doc.addPage();
        const fakeArray = [];

        for (let i = 0; i < maxSteps - 1; i++) {
            var stage = new Konva.Stage({
                container: 'container',
                width: 420,
                height: 594,
            });

            var layer = new Konva.Layer();
            stage.add(layer);

            Konva.Image.fromURL(image[i].src, function (darthNode) {
                var back = new Konva.Rect({
                    width: 420,
                    height: 594,
                    fill: "#e1dddd",
                });
                layer.add(back);

                var x, y, width, height, scale;
                scale = Math.min(420 / darthNode.attrs.image.width, 594 / darthNode.attrs.image.height);
                width = darthNode.attrs.image.width * scale;
                height = darthNode.attrs.image.height * scale;
                x = (420 - width) / 2;
                y = (594 - height) / 2;

                darthNode.setAttrs({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
                layer.add(darthNode);

                var text1 = new Konva.Text({
                    text: label[i].label,
                    x: label[i].x,
                    y: label[i].y,
                    fontSize: label[i].fontSize,
                    fill: "#dd4a0f"
                });
                text1.cache();
                layer.add(text1);

                var text2 = new Konva.Text({
                    text: (i + 1).toString(),
                    x: 380,
                    y: 560,
                    fontSize: 15,
                    fill: "#dd4a0f"
                });
                text2.cache();
                layer.add(text2);



                fakeArray.push({
                    sortOrder: i,
                    layer: layer.toDataURL({ pixelRatio: 2 }),
                })


                counter++;

                if (counter === maxSteps - 1) {
                    fakeArray.sort(function (a, b) { return a.sortOrder - b.sortOrder });
                    for (let i = 0; i < fakeArray.length; i++) {
                        doc.addImage(
                            fakeArray[i].layer,
                            0,
                            0,
                            595,
                            842
                        );
                        doc.addPage();
                    }

                    var pageCount = doc.internal.getNumberOfPages();
                    if(pageCount === maxSteps+1){
                        setActive(false)
                            setProcess({
                                label:" SAVE AS PDF "
                            })
 
                    }
                    
                    doc.deletePage(pageCount);
                    doc.save("mypdf.pdf");
                }
            });
        }
    }

    return (
        <div className={classes.root}>
            <div id="container" style={{ display: "none" }}>  </div>
            <div className={classes.konva} id="content">
                <Stage width={420} height={594}  >
                    {activeStep !== 0 ?
                        <Layer >
                            <Rect
                                x={0}
                                y={0}
                                width={420}
                                height={594}
                                fill="#e1dddd"
                            />
                            <DrawImage src={image[activeStep - 1].src} x={image[activeStep - 1].x} y={image[activeStep - 1].y} width={image[activeStep - 1].width} height={image[activeStep - 1].height} />
                            <Text text={label[activeStep - 1].label} x={label[activeStep - 1].x} y={label[activeStep - 1].y} fontSize={label[activeStep - 1].fontSize} fill="#dd4a0f" />
                            <Text text={(activeStep)} x={380} y={560} fontSize={15} fill="#dd4a0f" />
                        </Layer >
                        : <Layer >
                            <Text text="これはタイトルページです。" x={30} y={255} fontSize={20} fill="#dd4a0f" />
                        </Layer>
                    }
                </Stage>
            </div>
            <MobileStepper
                steps={maxSteps}
                className={classes.mobileStepper}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} >
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
                }
            />
            <div>
                {/* {active && <CircularProgress  disableShrink value={100}/>} */}
                <Button className={classes.saveButton} onClick={generatePDF}>{process.label}</Button>
            </div>
        </div>
    );
}