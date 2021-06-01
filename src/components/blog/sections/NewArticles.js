import React ,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Image from "../../common/Image";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({  
  
    root: {
        width:"80%",
        height:"300px",
        position:"relative",
        margin:"30px auto",
        borderRadius: "10px",
        
      },
      title:{
        margin:"30px",
        fontSize:"30px",
        fontWeight:"500"
      },
      image:{
        position:"relative",
        width:"100%",
        display: "inline-flex",
          "& >img":{
            width: "100%",
            height:"300px",
            border: "1px ",
            borderRadius: "10px",
            objectFit: "cover",
          }
      },
      sub:{
        margin:"auto",
        marginTop: "67%",
        position:"absolute",
        zIndex:"1",
        backgroundColor: "darkslategrey",
        opacity: "0.9",
      },
      subtitle:{
        margin:"auto",
        marginTop:"2%",
        color:"white",
        fontSize:"20px",
        fontWeight:"500"
      },
      datetime:{
        margin:"2%",
        color:"white",
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
    console.log(data);

  
    const ShowMoreItems = () => {
      setVisibleSize(visibleSize+2);
    };
  return (
    <section>
        <div className= {classes.title}>
            新着記事
        </div>
        <div>
            {data.slice(First, Last).map((item)=>{
                return(
                  <div className= {classes.root }>
                      <div className= {classes.image}>
                          <Image {...item.img}/>
                          <div className={classes.sub}>
                            <Container className={classes.subtitle}>
                              {item.subtitle}
                            </Container>
                            <Container className={classes.datetime}>
                              {item.datetime}
                            </Container>
                          </div>
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


