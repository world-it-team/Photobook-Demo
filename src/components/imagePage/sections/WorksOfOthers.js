import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from "@material-ui/core";

    
import Image from "../../common/Image"

const useStyles = makeStyles((theme) => ({  
  title:{
    fontSize:"20px",
    fontWeight:"700",
    marginLeft:"40px"
  },
  root: {
    width:"80%",
    height:"300px",
    position:"relative",
    margin:"30px auto",

    borderRadius: "10px",
    
  },
  rootTitle:{
    width: "100px",
    height:" 20px",
    backgroundColor:"white",
    border:" 1px solid ",
    borderRadius: "5px",
    textAlign: "center",
    position:"absolute",
    top:"20px",
    left:"20px",

  },
  image:{
      "& >img":{
        width: "100%",
        height:"300px",
        border: "1px ",
        borderRadius: "10px",
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
  const [visibleSize, setVisibleSize] = useState(3);
  const [page, setPage] = useState(1);
  const Last = page * visibleSize;
  const First = Last - visibleSize;

  const ShowMoreItems = () => {
    setVisibleSize(4);
  };


  return (
    <section className= {classes.section}>
        <div className= {classes.title}> 他人作品</div>
        {data.slice(First, Last).map((item) => {
            return(
              <div className= {classes.root}>
                <div className= {classes.rootTitle} >
                    {item.tagName}
                </div>
                <div className= {classes.image}>
                    <Image {...item.img[0]}/>
                </div>
                <FavoriteIcon className= {classes.icon}/>
              </div>
            )         
         })}
          {visibleSize === 3 ? (
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={ShowMoreItems}> もっと見る </Button>
            </div>
        ) : null}
    </section>
  );
}
