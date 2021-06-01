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
import Image from "../../common/Image";
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles((theme) => ({  

}));

function PaperComponent(props) {
  const classes = useStyles();
  return (
    <Draggable   handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper   className= {classes.test} {...props} />
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
        <div className= {classes.title}> 他人作品</div>
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
                      <div className= {classes.image} key={index} >
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
                <Button variant="contained" color="primary" onClick={ShowMoreItems}> もっと見る </Button>
            </div>
          ) : null}
    </section>
  );
}
