import React from 'react';
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

const tutorialSteps = [
    {
        label: 'naruto',
        src: naruto,
    },
    {
        label: 'sasuke',
        src: sasuke,
    },
    {
        label: 'yonko',
        src: yonko,
    },
    {
        label: 'law',
        src: law,
    },
    {
        label: 'luffy',
        src: luffy,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: 1000,
        flexGrow: 1,
    },
    konva: {
        // margin: "20px",
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
                width={600}
                height={500}
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
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + maxSteps - 1) % maxSteps);
    };

    const generatePDF = () => {
        var doc = new JsPDF("l", "pt", [1000, 500]);
        doc.html(document.querySelector("#content"), {
            callback: function (pdf) {
                // var pageCount = doc.internal.getNumberOfPages();
                // pdf.deletePage(pageCount);
                pdf.save("mypdf.pdf");
            },
            x: 0,
            y: 0
        });
    }

    // const generatePDF = () => {
    //     var doc = new JsPDF("l", "pt", [1040, 540]);
    //     // for (let i = 0; i++; i < maxSteps) {
    //     // var imgData = naruto.toDataURL('image/jpeg');
    //     doc.setFillColor("#fff");
    //     doc.rect(0, 0, 1000, 500, "F");
    //     doc.addImage(imgData, 'JPEG', 200, 0, 600, 500);
    //     doc.setTextColor('#000000');
    //     doc.setFontSize(30);
    //     doc.text("abc", 100, 200);
    //     // doc.addPage("l", "pt", [1040, 540]);
    //     // }

    //     doc.save("mypdf.pdf");

    // }

    return (
        <div className={classes.root}>
            <div className={classes.konva} id="content">
                <Stage width={1000} height={500}>
                    <Layer>
                        <Rect
                            x={0}
                            y={0}
                            width={1000}
                            height={500}
                            fill="#fff"
                        />
                        <DrawImage src={tutorialSteps[activeStep].src} x={200} y={0} />
                        <Text text={tutorialSteps[activeStep].label} x={100} y={200} fontSize={30} fill="#dd4a0f" />
                        <Text text={(activeStep + 1)} x={960} y={460} fontSize={20} fill="#dd4a0f" />
                    </Layer>
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
            <Button className={classes.saveButton} onClick={generatePDF}>Save as PDF</Button>
        </div>
    );
}