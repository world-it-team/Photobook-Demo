import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActions disableSpacing>
        <EventAvailableIcon aria-label="add to favorites">
          <FavoriteIcon />
        </EventAvailableIcon>
      </CardActions>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="公式グッズ"
      />
      <CardActions disableSpacing>
        <EventAvailableIcon aria-label="add to favorites">
          <FavoriteIcon />
        </EventAvailableIcon>
      </CardActions>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="マッス 大会公式グッズ"
      />
      <CardActions disableSpacing>
        <EventAvailableIcon aria-label="add to favorites">
          <FavoriteIcon />
        </EventAvailableIcon>
      </CardActions>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="フォトブック"
      />
      <CardActions disableSpacing>
        <EventAvailableIcon aria-label="add to favorites">
          <FavoriteIcon />
        </EventAvailableIcon>
      </CardActions>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="イベント"
      />
      <CardActions disableSpacing>
        <EventAvailableIcon aria-label="add to favorites">
          <FavoriteIcon />
        </EventAvailableIcon>
      </CardActions>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title="付属品"
      />
    </Card>
  );
}