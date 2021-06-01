import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "../../common/Image"
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({

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
