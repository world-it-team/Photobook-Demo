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
  // start:{
  //   width: "20%",
  //   height: "50px",
  //   top:"10px",
  // },
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
    width:"100%",
      "& >img":{
        width: "100%",
        height:"150px",
        border: "1px ",
        objectFit: "cover",
      }
  },
  icon:{
    color:"white",
    position:"absolute",
    fontSize:"25px",
    top:"10px",
    right:"10px"
  },
  rank:{
    position: "relative",
    width: "50px",
  },
  number:{
    position: "absolute",
    margin: "0 auto",
    top: "23px",
    left: "16px",
    fontSize:"12px"
  },
  start:{
    width: "40px",
    position: "absolute",
    fontSize: "60px",
  },
  likeCount:{
    position:"absolute",
    top: "10px",
    right: "5px",
    width: "17px",
    height: "17px",
    display:" table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    borderRadius: "50%",
    background: "#ff834f",
    fontSize: "11px",
  }

}));

export default function Ranking(props) {

  const classes = useStyles();
  
  return (
    <section className= {classes.section}>
      <div className= {classes.title}> ランキング</div>
      <div className= {classes.content}>
        {props.data.map((item, index) => {
            return index < 10 ?  (
                   <div className= {classes.item} key={index}>
                     <div className= {classes.rank}>
                        <div className= {classes.number}>{index+1}</div>
                        <StarBorderIcon className= {classes.start}/>
                     </div>
                     
                     <div className= {classes.subitem}>
                        <div className= {classes.itemTitle} >
                            {item.category}
                        </div>
                        <div className= {classes.image}>
                            <Image {...item.img}/>
                        </div>
                        <div>
                          <FavoriteIcon className= {classes.icon}/>
                          <div className= {classes.likeCount}>
                              2
                          </div>
                        </div>
                      </div>
                  </div>
            ): null
         })}
        </div>
    </section>
  );
}
