import React,{useState} from "react";
import { makeStyles,useTheme } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';  
import Typography from "@material-ui/core/Typography";
import Image from "../../common/Image";
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles((theme) => ({  
  root: {
    width:"80%",
    height:"300px",
    position:"relative",
    margin:"30px auto",
    borderRadius: "10px",
    [theme.breakpoints.up("sm")]: 
    {flexBasis:"30%",},
    [theme.breakpoints.up("md")]: {}, 
    [theme.breakpoints.up("lg")]: {},
    [theme.breakpoints.up("xl")]: {},
  },
  taninsahin:{
    [theme.breakpoints.up("sm")]: 
      {
        display:"flex",
        flexWrap:"wrap",
      },
  },
  rootTitle:{
    width: "100px",
    height:" 20px",
    backgroundColor:"white",
    border:" 1px solid ",
    borderRadius: "5px",
    textAlign: "center",
    position:"absolute",
    top:"20px",
    left:"20px",
  },
  image:{
    width:"100%",
      "& >img":{
        width: "100%",
        height:"300px",
        border: "1px ",
        borderRadius: "10px",
        objectFit: "cover",
      },
  },
  imageshow:{
    width:"100%",
    "& >img":{
      width: "100%",
      height:"500px",
      border: "1px ",
      borderRadius: "10px",
      objectFit: "contain",
    },
  },
  dialogContent:{
  },
  icon:{
    color:"white",
    position:"absolute",
    fontSize:"30px",
    top:"20px",
    right:"20px"
  },
  likeCount:{
    position:"absolute",
    top:"18px",
    right:"10px",
    height: "20px",
    width: "20px",
    display:" table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: "50%",
    background: "#ff834f",
  },
  button:{
    textAlign:"center",
    marginBottom:"20px",
    [theme.breakpoints.up("sm")]: 
    {margin:"30px"},

  },
  buttonmore:{
    [theme.breakpoints.up("sm")]: 
    {fontSize:"18px"},

  },
  action:{
    display:"flex",
    justifyContent: "space-between",
    margin:"10px",
  },
  actionButton:{
    color:"red",
  },
  actionBuyNow:{
    backgroundColor:"#ff834f",
  },
  test:{
    "&>MuiDialog-container>MuiDialog-paper":{
      width:"100%",
  }
  },
  imgpaper:{
  },
  title: {
    backgroundColor: "#14AC8D",
    color: "#ffffff",
    padding: "6px 0px 4px 10px",
    position: "relative",
    fontSize: "18px",
    "@media screen and (min-width: 768px)": {
      fontSize: "28px",
      padding: "3px 0px 1px 40px",
    },
    "&:before": {
      content: `''`,
      position: "absolute",
      right: "-1px",
      top: "-1px",
      width: "50%",
      borderTop: "36px solid #EAEAEA",
      borderLeft: "36px solid transparent",
      "@media screen and (min-width: 450px)": {
        width: "60%",
      },
      "@media screen and (min-width: 525px)": {
        width: "70%",
      },
      "@media screen and (min-width: 768px)": {
        width: "60%",
        borderTop: "46px solid #FFFFFF",
        borderLeft: "46px solid transparent",
      },
      "@media screen and (min-width: 987px)": {
        width: "67%",
      },
    },
  },
  rank: {
    paddingBottom: "80px",
  },
}));

function PaperComponent(props) {
  const classes = useStyles();
  return (
    <Draggable   handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper   className= {classes.imgpaper} {...props} />
    </Draggable>
  );
}


export default function WorksOfOthers({data}) {
  const classes = useStyles();
  const [visibleSize, setVisibleSize] = useState(3);
  const [popup, setPopup] = useState(false);
  const [value, setValue] = useState(0)
  const [maxStep, setMaxStep] = useState(0);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const Last = 1 * visibleSize;
  const First = Last - visibleSize;

  const ShowMoreItems = () => {
    setVisibleSize(visibleSize+1);
  };

  function handleClickOpen(index,length){
    setValue(index)
    setMaxStep(length)
    setPopup(true)
  } 

const handleClose = () =>{
  setPopup(false)
  setActiveStep(0)
}

const handleNext = () => {
  setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxStep);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => (prevActiveStep + maxStep - 1) % maxStep);
};
  return (
    <section className= {classes.section}>
      <div className={classes.rank}>
        <Typography variant="h6" component="h1" className={classes.title}>
           他人作品
        </Typography>
      </div>
        <div className={classes.taninsahin}>
        {data.slice(First, Last).map((item,index) => {
            return(
              <div className= {classes.root } onClick={()=>handleClickOpen(index,item.img.length)} key={index}>
                <div className= {classes.rootTitle} >
                    {item.tagName}
                </div>
                <div className= {classes.image}>
                    <Image {...item.img[0]}/>
                </div>
                <div>
                  <FavoriteIcon className= {classes.icon}/>
                  <div className= {classes.likeCount}>
                      2
                  </div>
                </div>
              </div>
            )  
         })}
         </div>
          <Dialog
            open={popup}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"  
            className= {classes.test} 
            {...PaperComponent}
            PaperProps={{
              style: {
                width:"100%"
              },
            }}
          >
            <DialogContent className= {classes.dialogContent}>
              {data.map((itemList,index)=>{
                return value === index ?(
                      <div className= {classes.imageshow} key={index} >
                         <Image {...itemList.img[activeStep]}/>
                         <MobileStepper
                            steps={itemList.img.length}
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
                                      Back
                                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                  </Button>
                            }
                        />
                      </div>
                ):null
              })}
            </DialogContent>
            <div className={classes.action}>
              <Button className={classes.actionButton} autoFocus onClick={handleClose} >
                Cancel
              </Button>
              <Button className={classes.actionBuyNow} autoFocus >
                 Buy now
              </Button>
            </div>
          </Dialog> 
          {visibleSize === 3 ? (
            <div className={classes.button}>
                <Button className={classes.buttonmore} variant="contained" color="primary" onClick={ShowMoreItems}> もっと見る </Button>
            </div>
          ) : null}
    </section>
  );
}
