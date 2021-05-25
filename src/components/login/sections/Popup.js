import React from "react";
import Alink from "../../common/Alink";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import StarsIcon from '@material-ui/icons/Stars';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Button from '@material-ui/core/Button';

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
    fontSize:"24px",
    margin:"auto",
  },
  button:{
    margin:"5%"
  }
}));

export default function PopUp() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        お気に入りのアイテムを選択してください
      </div>
      <Alink to="/">
        <Card className={classes.card}>
          <CardActions className={classes.icon}>
            <StarsIcon/>
          </CardActions>
          <Container className={classes.text}>
            公式グッズ
          </Container>
        </Card>
      </Alink>
      
      <Alink to="/">
        <Card className={classes.card}>
          <CardActions className={classes.icon}>
            <AcUnitIcon />
          </CardActions>
          <Container className={classes.text}>
            マッス 大会公式グッズ
          </Container>
        </Card>
      </Alink>
      
      <Alink to="/">
        <Card className={classes.card}>
          <CardActions className={classes.icon}>
            <ImportContactsIcon />
          </CardActions>
          <Container className={classes.text}>
            フォトブック
          </Container>
        </Card>
      </Alink>
      
      <Alink to="/">
        <Card className={classes.card}>
          <CardActions className={classes.icon}>
            <EventAvailableIcon />
          </CardActions>
          <Container className={classes.text}>
            イベント
          </Container>
        </Card>
      </Alink>
     
      <Alink to="/">
        <Card className={classes.card}>
          <CardActions className={classes.icon}>
            <AttachmentIcon />
          </CardActions>
          <Container className={classes.text}>
            付属品
          </Container>
        </Card>
      </Alink>
      
      <Alink to="/">
        <Button  className={classes.button} variant="contained" color="black">
          スキップ
        </Button>
      </Alink>
    </div>
  );
}