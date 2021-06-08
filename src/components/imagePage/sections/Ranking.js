import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../common/Image";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
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
  mediaIcon:{
    display:"flex",
    justifyContent: "space-between",
  }
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
                <CardMedia className={classes.media}>
                  <Image {...item.img} className={classes.img} />
                </CardMedia>

                <CardContent>
                </CardContent>
                <CardActions disableSpacing className={classes.mediaIcon}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
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
