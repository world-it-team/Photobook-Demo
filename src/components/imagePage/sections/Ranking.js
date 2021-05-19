import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Image from "../../common/Image"
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
    rank :{
        display: "flex",
        flexWrap: "wrap",
        // flexDirection: "column",
        width: "100%",
    },
  item:{
    width: "50%",
 
    },  
  list: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
      cardImage: {
        width: " 100%",
        height: "100px",
        margin: "auto",
        borderRadius: "10px",
        objectFit: "cover"
    },
}));

export default function Ranking(props) {
    console.log(props.data)
  const classes = useStyles();
  
  return (
    <div className={classes.rank}>
        {props.data.map((item, index) => {
            return(
                <div className={classes.item}>
                   {index < 10 && 
                   <Card className={classes.list}>
                        <Image className={classes.cardImage}  {...item.img} />
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                            <Typography variant="body2" color="textSecondary" component="p">
                                AAA 
                            </Typography>
                            </IconButton>
                        </CardActions>
                        <Image  {...item.img} />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {index+1 }
                            </Typography>
                        </CardContent> 
                    </Card>
                    }
                </div>
            )
         })}
    </div>
  );
}
