import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import StarsIcon from '@material-ui/icons/Stars';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Button from '@material-ui/core/Button';
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    
  },
  title:{
    margin:"5%",
    fontSize:"30px",
    textTransform: "capitalize"
  },
  card:{
    margin:"5%",
    display: "inline-flex",
    margin:"1%",
  },
  icon:{
    margin:"10px",
    padding:0,
  },
  text:{
    fontSize:"12px",
    margin:0,
    padding:0,
  },
  button:{

  }

  // media: {
  //   height: 0,
  //   paddingTop: "56.25%" // 16:9
  // },
  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest
  //   })
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)"
  // },
  // avatar: {
  //   backgroundColor: red[500]
  // }
}));

export default function PopUp() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        お気に入りのアイテムを選択してください
      </div>
      <Card className={classes.card}>
        <CardActions className={classes.icon}>
          <StarsIcon aria-label="add to favorites">
            <FavoriteIcon />
          </StarsIcon>
        </CardActions>
        <CardHeader className={classes.text}
          action={<IconButton aria-label="settings"></IconButton>}
          title="公式グッズ"
        />
      </Card>
      <Card className={classes.card}>
        <CardActions className={classes.icon}>
          <AcUnitIcon aria-label="add to favorites">
            <FavoriteIcon />
          </AcUnitIcon>
        </CardActions>
        <CardHeader className={classes.text}
          action={<IconButton aria-label="settings"></IconButton>}
          title="マッス 大会公式グッズ"
        />
      </Card>
      <Card className={classes.card}>
        <CardActions className={classes.icon}>
          <ImportContactsIcon aria-label="add to favorites">
            <FavoriteIcon />
          </ImportContactsIcon>
        </CardActions>
        <CardHeader className={classes.text}
          action={<IconButton aria-label="settings"></IconButton>}
          title="フォトブック"
        />
      </Card>
      <Card className={classes.card}>
        <CardActions className={classes.icon}>
          <EventAvailableIcon aria-label="add to favorites">
            <FavoriteIcon />
          </EventAvailableIcon>
        </CardActions>
        <CardHeader className={classes.text}
          action={<IconButton aria-label="settings"></IconButton>}
          title="イベント"
        />
      </Card>
      <Card className={classes.card}>
        <CardActions className={classes.icon}>
          <AttachmentIcon aria-label="add to favorites">
            <FavoriteIcon />
          </AttachmentIcon>
        </CardActions>
        <CardHeader className={classes.text}
          action={<IconButton aria-label="settings"></IconButton>}
          title="付属品"
        />
      </Card>
      <Button  className={classes.button} variant="contained" color="black">
        スキップ
      </Button>
    </div>
  );
}