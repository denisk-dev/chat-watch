/**
 * author: Denis Kravchenko
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
  },
  media: {
    height: 540,
    width: 600,
  },
  rootDiv: {
    display: "flex",
    justifyContent: "center",
  },
});

const ChatWindow = (props) => {
  const classes = useStyles();

  console.log(props);
  return (
    <div className={classes.rootDiv}>
      <Card className={classes.root}>
        <CardContent className={classes.media}>
          {props.messages.map((message) => {
            return (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={
                  props.userName === message.user
                    ? { textAlign: "right" }
                    : { textAlign: "left" }
                }
              >
                {message.user} : {message.message}
              </Typography>
            );
          })}
        </CardContent>

        <CardActions>
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            style={{ width: "80%" }}
            value={props.message}
            onChange={props.messageOnChange}
          />
          <Button
            size="large"
            color="primary"
            style={{ width: "20%" }}
            onClick={props.sendMessage}
          >
            Send
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ChatWindow;
