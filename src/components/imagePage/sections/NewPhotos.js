import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Image from "../../common/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    margin:"auto",
    marginTop:"5%",
    marginBottom:"5%",
    maxWidth: 345,
  },
  button:{
    position:"absolute",
    zIndex:"1",
    margin:"5%",
    marginTop:"4%",
    backgroundColor:"#ffffff",
  },
  like:{
    display: "inline-flex",
    position:"absolute",
    zIndex:"1",
    color:"white",
    marginTop:"5%",
    marginLeft:"78%"
  },
  img: {
    position:"relative",
    width:"100%"
  },
  prev:{
    position:"absolute",
    fontSize:"xxx-large",
    color: "silver",
    top:"37%",
    left:"10px"
  },
  next:{
    position:"absolute",
    fontSize:"xxx-large",
    color: "silver",
    top:"37%",
    right:"10px",
  },
  sub:{
    margin:"4%"
  },
  title:{
    fontSize:"1.2rem",
    textTransform: "capitalize",
  },
  datetime:{
    fontSize:"0.7rem",
  },
}));

export default function NewPhotos({data}) {
  const classes = useStyles();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTags, setActiveTags] = useState(0);
  const [activeTitle, setActiveTitle] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState(0);
  function handleBack(img,tags,title,subtitle){
    setActiveImg((prevActiveStep) => (prevActiveStep +img - 1) % img);
    setActiveTags((prevActiveStep) => (prevActiveStep +tags - 1) % tags);
    setActiveTitle((prevActiveStep) => (prevActiveStep +title - 1) % title);
    setActiveSubtitle((prevActiveStep) => (prevActiveStep +subtitle - 1) % subtitle); 
  }
  function handleNext(img,tags,title,subtitle){
    setActiveImg((prevActiveStep) => (prevActiveStep + 1) % img);
    setActiveTags((prevActiveStep) => (prevActiveStep + 1) % tags);
    setActiveTitle((prevActiveStep) => (prevActiveStep + 1) % title);
    setActiveSubtitle((prevActiveStep) => (prevActiveStep + 1) % subtitle); 
  }
  return (
    <Card className={classes.root}>
      <Button  className={classes.button} variant="contained">
        {data.tags[activeTags]}
      </Button>
      <FavoriteIcon className={classes.like}/>
      <Image {...data.img[activeImg]} className={classes.img}/>
      <NavigateBeforeIcon className={classes.prev}  onClick={()=>handleBack(data.img.length,data.tags.length,data.title.length,data.subtitle.length)}/>
      <NavigateNextIcon className={classes.next}  onClick={()=>handleNext(data.img.length,data.tags.length,data.title.length,data.subtitle.length)}/>
      <div className={classes.sub}>
        <Container className={classes.title}>
          {data.title[activeTitle]}
        </Container>
        <Container className={classes.datetime}>
          {data.subtitle[activeSubtitle]}
        </Container>
      </div>
    </Card>
  );
}

