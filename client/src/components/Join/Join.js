/**
 * author: Denis Kravchenko
 */
import React, { useState } from "react";

import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    marginTop: 200,
  },
}));

const Join = () => {
  const [name, setName] = useState("");

  const [room, setRoom] = useState("");

  const [nameInputError, setNameInputError] = useState(false);

  const [roomInputError, setRoomInputError] = useState(false);

  const classes = useStyles();

  const handleClick = (e) => {
    if (name === "" || room === "") {
      e.preventDefault();
      name === "" ? setNameInputError(true) : setNameInputError(false);
      room === "" ? setRoomInputError(true) : setRoomInputError(false);
    }
  };

  return (
    <div>
      <form autoComplete="off" className={classes.root}>
        <TextField
          error={nameInputError}
          id="outlined-error-helper-text"
          label="Name"
          helperText={nameInputError ? "Incorrect entry." : ""}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          error={roomInputError}
          id="outlined-error-helper-text"
          label="Room"
          helperText={roomInputError ? "Incorrect entry." : ""}
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <Link
          onClick={handleClick}
          to={`/chatandwatch?name=${name}&room=${room}`}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Primary
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Join;
