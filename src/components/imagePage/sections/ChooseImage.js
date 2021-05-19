import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Image from "../../common/Image";

const useStyles = makeStyles((theme) => ({
  tagContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  tag: {
    listStyle: "none",
    border: "1px solid grey",
    borderRadius: 4,
    padding: "5px 10px",
  },
  imageContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "95%",
    height: "70vh",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // objectPosition:"50% 50%"
  },
}));

const category = ["BlackPink", "Rose", "Lisa", "Jisoo", "Jennie"];

export default function ChooseImage(props) {
  const classes = useStyles();

  return (
    <section>
      <h3>Category</h3>
      <div className={classes.tagContainer}>
        {category.map((item, index) => (
          <li className={classes.tag} key={index}>
            {item} (
            {props.data.filter((x) => x.category === item.toLowerCase()).length}
            )
          </li>
        ))}
      </div>

      <div className={classes.imageContainer}>
        <GridList cellHeight={80} className={classes.gridList} cols={3}>
          {props.data.map((tile) => (
            <GridListTile key={tile} cols={1}>
              <Image {...tile.img} className={classes.image} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </section>
  );
}
