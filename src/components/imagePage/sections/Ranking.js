import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../common/Image";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "20px",
    fontWeight: "700",
    marginLeft: "40px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
      color: "#004EB4",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "36px",
      color: "#004EB4",
    },
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  item: {
    display: "flex",
    width: "48%",
    margin: "10px auto",
    backgroundColor: "#fbfafe",
    [theme.breakpoints.up("sm")]: {
      margin: "20px auto 0 auto",
      "&:hover": {
        transform: " scale(1.03)",
        transition: "all ease 0.5s",
      },
    },
  },
  // start:{
  //   width: "20%",
  //   height: "50px",
  //   top:"10px",
  // },
  subitem: {
    width: "100%",
    position: "relative",
    margin: "10px auto",
    [theme.breakpoints.up("sm")]: {
      margin: "0",
    },
  },
  itemTitle: {
    // width: "70px",
    // height: " 20px",
    padding: "2px 5px",
    backgroundColor: "white",
    border: " 1px solid ",
    borderRadius: "5px",
    textAlign: "center",
    position: "absolute",
    top: "10px",
    left: "5px",
    [theme.breakpoints.up("sm")]: {
      top: "20px",
      left: "40%",
      fontSize: "24px",
      padding: "5px 10px",
    },
    [theme.breakpoints.up("md")]: {
      top: "20px",
      left: "45%",
      fontSize: "30px",
      padding: "5px 10px",
    },
  },
  image: {
    width: "100%",
    "& >img": {
      width: "100%",
      height: "150px",
      border: "1px ",
      objectFit: "cover",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        margin: "auto",
        width: "90%",
        height: "300px",
        padding: "120px 0 20px 0",
        objectFit: "cover",
      },
      [theme.breakpoints.up("md")]: {
        display: "block",
        margin: "auto",
        width: "70%",
        height: "400px",
        padding: "150px 0 50px 0",
        objectFit: "cover",
      },
    },
  },
  icon: {
    color: "white",
    position: "absolute",
    fontSize: "25px",
    top: "10px",
    right: "10px",
    [theme.breakpoints.up("sm")]: {
      fontSize: 45,
      color: "#f5dd89",
      top: "13%",
      right: "14%",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 55,
      color: "#f5dd89",
      top: "13%",
      right: "13%",
    },
  },
  rank: {
    position: "relative",
    width: "50px",
    [theme.breakpoints.up("sm")]: {
      width: "0",
    },
  },
  number: {
    position: "absolute",
    margin: "0 auto",
    top: "23px",
    left: "16px",
    fontSize: "12px",
    [theme.breakpoints.up("sm")]: {
      top: "14%",
      left: "63px",
      fontSize: "24px",
    },
    [theme.breakpoints.up("md")]: {
      top: "14%",
      left: "87px",
      fontSize: "24px",
    },
  },
  start: {
    // width: "40px",
    position: "absolute",
    top: "10px",
    left: "0px",
    fontSize: 40,
    [theme.breakpoints.up("sm")]: {
      fontSize: 60,
      top: "10%",
      left: "40px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 70,
      top: "10%",
      left: "60px",
    },
  },
  likeCount: {
    position: "absolute",
    top: "10px",
    right: "3px",
    // width: "17px",
    // height: "17px",
    display: " table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: "50%",
    background: "#ff834f",
    padding: "0 5px",
    fontSize: 15,
    [theme.breakpoints.up("sm")]: {
      fontSize: 25,
      padding: "0 8px",
      top: "14%",
      right: "11%",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 35,
      padding: "0 10px",
      top: "14%",
      right: "10%",
    },
  },
}));

export default function Ranking(props) {
  props.data.sort(function (a, b) {
    return b.likeCount - a.likeCount;
  });
  let imgRank = props.data.slice(0, 10);

  const classes = useStyles();

  return (
    <section className={classes.section}>
      <div className={classes.title}> ランキング</div>
      <div className={classes.content}>
        {imgRank.map((item, index) => {
          return (
            <div className={classes.item} key={index}>
              <div className={classes.rank}>
                <div className={classes.number}>{index + 1}</div>
                <StarBorderIcon className={classes.start} />
              </div>

              <div className={classes.subitem}>
                <div className={classes.itemTitle}>{item.category}</div>
                <div className={classes.image}>
                  <Image {...item.img} />
                </div>
                <div>
                  <FavoriteIcon className={classes.icon} />
                  <div className={classes.likeCount}>{item.likeCount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
