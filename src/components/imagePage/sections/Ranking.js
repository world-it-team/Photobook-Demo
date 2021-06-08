import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../common/Image";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import zIndex from "@material-ui/core/styles/zIndex";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import CardActionArea from "@material-ui/core/CardActionArea";
const useStyles = makeStyles((theme) => ({
  root: {},
  img: {
    height: 250,
    width: "100%",
    objectFit: "cover",
    "@media screen and (min-width: 1300px)": {
      height: 300,
    },
  },

  avatar: {
    backgroundColor: red[500],
  },

  section: {
    color: theme.palette.text.secondary,
  },

  rank: {
    paddingBottom: "80px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    justifyContent: "space-around",
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {},
  },
  root1: {
    maxWidth: "345px",
    marginBottom: "50px",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px 8px #bfbfbf",
    transition: "all .5s",

    "&:hover": {
      boxShadow: "1px 1px 1px 1px #bfbfbf",
    },
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
}));

export default function Ranking(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container className={classes.root}>
      <div className={classes.rank}>
        <Typography variant="h6" component="h1" className={classes.title}>
          ランキング 位置
        </Typography>
      </div>
      <div className={classes.section}>
        <div className={classes.content}>
          {props.data.map((item, index) => {
            return index < 10 ? (
              <CardActionArea className={classes.root1}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia className={classes.media}>
                  <Image {...item.img} className={classes.img} />
                </CardMedia>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    This impressive paella is a perfect party dish and a fun
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                </CardActions>
              </CardActionArea>
            ) : null;
          })}
        </div>
      </div>
    </Container>
  );
}
