import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Football from '../../../images/imagePage/Cr7.png';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:"auto",
    maxWidth: 345,
  },
  button:{
    position:"absolute",
    zIndex:"1",
    margin:"5%",
    marginTop:"30px",
    backgroundColor:"#ffffff",
  },
  like:{
    display: "inline-flex",
  },
  icon:{
    position:"absolute",
    zIndex:"1",
    marginTop:"100px",
    marginLeft:"260px"
  },
  text:{
    padding:"3px",
  },
  media: {
    position:"relative",
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function NewPhotos() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const data = {
    tags : ["PhotoBook","Event","Football"],
    img:["/src/images/imagePage/Cr7.png","/src/images/imagePage/fnd.png","/src/images/imagePage/mbb.png",],
    title:["フォトブック　キャンペーン開始！","スマホカメラ横撮りのすすめ","写真プリント　キャンペーン開始",],
    subtitle:["2021.05.18 13:00","2021.05.12 00:15","2021.05.10 22:35",]
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Button  className={classes.button} variant="contained" color="">
        PhotoBook
      </Button>
      <CardActions className={classes.like}>
        <IconButton className={classes.icon}>
          <FavoriteIcon/>
        </IconButton>
      </CardActions>
      <CardActions className={classes.pre}>
        <IconButton>
          <ArrowBackIosIcon/>
        </IconButton>
      </CardActions>
      <CardActions className={classes.next}>
        <IconButton>
          <NavigateNextIcon/>
        </IconButton>
      </CardActions>
      <CardMedia
        className={classes.media}
        image={Football}
        title="Photos Campus"
      />
        <CardHeader
        title="フォトブック　キャンペーン開始！"
        subheader="2021.05.06 09:45"
      />
    </Card>
  );
}

