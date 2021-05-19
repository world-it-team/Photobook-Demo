import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';

    
import Image from "../../common/Image"

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


export default function WorksOfOthers({data}) {
  console.log(data)
  const classes = useStyles();
  return (
    <section>
        {data.map((item) => {
            return(
              <div className= {classes.root}>
                <div className= {classes.title}>
                    {item.tagName}
                </div>
                <div >
                    <Image {...item.img[0]}/>
                </div>
                <FavoriteIcon/>
              </div>
            )
                       
         })}
    </section>
  );
}
