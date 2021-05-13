import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import JsPDF from "jspdf";
import { Stage, Layer, Image, Text, Rect } from 'react-konva';

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
        border: "1px solid #000000",
        width: "1000px",
        height: "500px"
    },
    mobileStepper: {
        marginTop: "20px"
    },
    saveButton: {
        backgroundColor: "#6a6cd6"
    }
}));

class DrawImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    render() {
        return (
            <Image
                x={this.props.x}
                y={this.props.y}
                image={this.state.image}
                width={this.props.width}
                height={this.props.height}
                ref={node => {
                    this.imageNode = node;
                }}
            />
        );
    }
}

export default function TextPdf() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [image, setImage] = useState([
        {
            width: 600,
            height: 500,
            x: 200,
            y: 0,
            src: naruto,
        },
        {
            width: 600,
            height: 500,
            x: 200,
            y: 0,
            src: sasuke,
        },
        {
            width: 600,
            height: 500,
            x: 200,
            y: 0,
            src: law,
        },
        {
            width: 600,
            height: 500,
            x: 200,
            y: 0,
            src: luffy,
        },
        {
            width: 600,
            height: 500,
            x: 200,
            y: 0,
            src: yonko,
        },
    ]);
    const [label, setLabel] = useState([
        {
            label: "naruto",
            x: 100,
            y: 200,
            fontSize: 30,
        },
        {
            label: "sasuuke",
            x: 100,
            y: 200,
            fontSize: 30,
        },
        {
            label: "law",
            x: 100,
            y: 200,
            fontSize: 30,
        },
        {
            label: "luffy",
            x: 100,
            y: 200,
            fontSize: 30,
        },
        {
            label: "yonko",
            x: 100,
            y: 200,
            fontSize: 30,
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
        var doc = new JsPDF("l", "pt", [1000, 500]);
        for (let i = 0; i < maxSteps; i++) {
            if (i !== 0) {
                doc.setFillColor("#fff");
                doc.rect(0, 0, 1000, 500, "F");
                doc.addImage(image[i - 1].src, 'JPEG', image[i - 1].x, image[i - 1].y, image[i - 1].width, image[i - 1].height);
                doc.setTextColor('#dd4a0f');
                doc.setFontSize(label[i - 1].fontSize);
                doc.text(label[i - 1].label, label[i - 1].x, label[i - 1].y, {
                    baseline: 'top',
                });
                doc.setFontSize(20);
                doc.text((i).toString(), 960, 460, {
                    baseline: 'top',
                });
                doc.addPage();
            }
            else {
                doc.setTextColor('#dd4a0f');
                // doc.addFont("./NotoSerifJP-ExtraLight.otf", "NotoSerifJP", "");
                // doc.setFont('NotoSerifJP'); // set font
                doc.setFontSize(30);
                doc.text("これはタイトルページです。", 100, 50, {
                    baseline: 'top',
                });
                doc.addPage();
            }
        }
        console.log(doc.getFontList());
        var pageCount = doc.internal.getNumberOfPages();
        doc.deletePage(pageCount);
        doc.save("mypdf.pdf");
    }

    return (
        <div className={classes.root}>
            <div className={classes.konva} id="content">

                <div >
                    <Stage width={1000} height={500}>
                        {activeStep !== 0 ?
                            <Layer>
                                <Rect
                                    x={0}
                                    y={0}
                                    width={1000}
                                    height={500}
                                    fill="#fff"
                                />
                                <DrawImage src={image[activeStep - 1].src} x={image[activeStep - 1].x} y={image[activeStep - 1].y} width={image[activeStep - 1].width} height={image[activeStep - 1].height} />
                                <Text text={label[activeStep - 1].label} x={label[activeStep - 1].x} y={label[activeStep - 1].y} fontSize={label[activeStep - 1].fontSize} fill="#dd4a0f" />
                                <Text text={(activeStep)} x={960} y={460} fontSize={20} fill="#dd4a0f" />
                            </Layer>
                            : <Layer>
                                <Text text="これはタイトルページです。" x={100} y={50} fontSize={30} fill="#dd4a0f" />
                            </Layer>
                        }
                    </Stage>
                </div>
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
            <Button className={classes.saveButton} onClick={generatePDF}>Save as PDF</Button>
        </div>
    );
}