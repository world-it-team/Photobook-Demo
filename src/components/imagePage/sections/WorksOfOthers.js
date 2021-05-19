import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';

    
import Image from "../../common/Image"

const useStyles = makeStyles((theme) => ({  
  root: {
    width:"80%",
    position:"relative",
    margin:"0 auto",
    
  },
  title:{
    position:"absolute",
    top:"20px",
    left:"20px"
  },
  image:{
      "& >img":{
        width: "100%",
        height: "300px",
      }
  },
  icon:{
    position:"absolute",
    top:"20px",
    right:"20px"
  }
}));


export default function WorksOfOthers({data}) {
  const classes = useStyles();
  return (
    <section className= {classes.section}>
        {data.map((item) => {
            return(
              <div className= {classes.root}>
                <div className= {classes.title} >
                    {item.tagName}
                </div>
                <div className= {classes.image}>
                    <Image {...item.img[0]}/>
                </div>
                <FavoriteIcon className= {classes.icon}/>
              </div>
            )
                       
         })}
    </section>
  );
}
