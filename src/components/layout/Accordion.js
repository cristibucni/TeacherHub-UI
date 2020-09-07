import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion({ event }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{event.nume}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <strong>Dată: </strong>
              <Moment format="DD.MM.YYYY">{event.data}</Moment>
            </ListItem>
            <ListItem>
              <strong>Ora: </strong>
              <Moment format="HH:mm">{event.data}</Moment>
            </ListItem>
            <ListItem>
              <strong>Detalii adiționale: </strong>
              {event.detalii}
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
