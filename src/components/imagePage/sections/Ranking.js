import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "../../common/Image"
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize:"20px",
    fontWeight:"700",
    marginLeft:"40px"
  },
  content:{
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  item:{
    display: "flex",
    width: "45%",
    margin:"10px auto",
  },
  start:{
    width: "20%",
    height: "50px",
    top:"10px",
  },
  subitem:{
    width: "80%",
    position:"relative",
    margin:"10px auto",
  },
  itemTitle:{
    width: "70px",
    height:" 20px",
    backgroundColor:"white",
    border:" 1px solid ",
    borderRadius: "5px",
    textAlign: "center",
    position:"absolute",
    top:"10px",
    left:"5px",
  },
  image:{
    "& >img":{
      width: "100%",
      height:"150px",
      border: "1px ",
      borderRadius: "10px",
    }
  },
  icon:{
    position:"absolute",
    top:"10px",
    right:"5px"
  },
}));

export default function Ranking(props) {
  const classes = useStyles();
  
  return (
    <section className= {classes.section}>
      <div className= {classes.title}> ランキング</div>
      <div className= {classes.content}>
        {props.data.map((item, index) => {
            return index < 10 ?  (
                   <div className= {classes.item}>
                     <StarBorderIcon className= {classes.start} value="1"/>
                     <div className= {classes.subitem}>
                        <div className= {classes.itemTitle} >
                            {item.category}
                        </div>
                        <div className= {classes.image}>
                            <Image {...item.img}/>
                        </div>
                        <FavoriteIcon className= {classes.icon}/>
                      </div>
                  </div>
            ): null
         })}
        </div>
    </section>
  );
}
