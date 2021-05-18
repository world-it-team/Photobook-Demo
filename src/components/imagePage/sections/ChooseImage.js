import React from "react";
import { makeStyles } from "@material-ui/core/styles";
;

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
  imageContainer:{
      
  }
}));

const catagory = ["Blackpink", "Rosé", "Lisa", "Jisoo", "Jennie"];

export default function ChooseImage() {
  const classes = useStyles();
  return (
    <section>
      <h3>Catagory</h3>
      <div className={classes.tagContainer}>
        {catagory.map((item, index) => (
          <li className={classes.tag}>{item}</li>
        ))}
      </div>

      <div className={classes.imageContainer}>

      </div>
    </section>
  );
}
