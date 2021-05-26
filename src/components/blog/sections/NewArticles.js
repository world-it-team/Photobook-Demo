import React ,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../../common/Image";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({  
    title:{
        marginLeft:"30px",
        fontSize:"30px",
        fontWeight:"500"
    },
    root: {
        width:"80%",
        height:"300px",
        position:"relative",
        margin:"30px auto",
        borderRadius: "10px",
        
      },
      image:{
        width:"100%",
          "& >img":{
            width: "100%",
            height:"300px",
            border: "1px ",
            borderRadius: "10px",
            objectFit: "cover",
          }
      },
      button:{
        textAlign:"center",
        marginBottom:"20px",
      },
  }));

export default function NewArticles({data}) {
    const classes = useStyles();
    const [visibleSize, setVisibleSize] = useState(3);
    const Last = 1 * visibleSize;
    const First = Last - visibleSize;
  
    const ShowMoreItems = () => {
      setVisibleSize(visibleSize+1);
    };
  return (
    <section>
        <div className= {classes.title }>
            新着記事
        </div>
        <div>
            {data.slice(First, Last).map((item)=>{
                return(
                    <div className= {classes.root }>

                <div className= {classes.image}>
                    <Image {...item}/>
                </div>

              </div>
                )
            })}
            {visibleSize === 3 ? (
            <div className={classes.button}>
                <Button variant="contained" color="primary" onClick={ShowMoreItems}> もっと見る </Button>
            </div>
          ) : null}
        </div>

    </section>
  );
}


