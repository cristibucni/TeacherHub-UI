import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Accordion from "../layout/Accordion";
const useStyles = makeStyles({
  root: {
    minWidth: 600,
    maxWidthT: 600,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ title, text, image, events, link }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {events.map((event, index) => {
            return <Accordion key={index} event={event} />;
          })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
