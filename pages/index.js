import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import React, { useState, useReducer } from "react";
import GistsList from "../components/GistsList";
import UserSearch from "../components/UserSearch";

import Slide from "@material-ui/core/Slide";
import GistView from "../components/GistView";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  paper: {
    overflowY: "auto",
    padding: theme.spacing(2),
    height: "calc(100vh - 100px)",
  },
}));

const initialState = {
  user: null,
  gist: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "newSearch":
      return initialState;
      break;
    case "userSelected":
      return {
        ...state,
        gist: null,
        user: action.payload,
      };
      break;
    case "gistSelected":
      return {
        ...state,
        gist: action.payload,
      };
      break;
  }
}

export default function GistExplorer() {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, gist } = state;

  const handleGistSelect = (payload) =>
    dispatch({ type: "gistSelected", payload });

  const handleUserSelect = (payload) =>
    dispatch({ type: "userSelected", payload });

  const handleNewSearch = () => dispatch({ type: "newSearch" });

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6">Gist Explorer</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={3}
        alignItems="stretch"
        className={classes.content}
      >
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Search github users
            </Typography>
            <UserSearch
              onSelect={handleUserSelect}
              selectedUser={user}
              onSearchInitiated={handleNewSearch}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Slide
            direction="up"
            in={Boolean(user?.login)}
            mountOnEnter
            unmountOnExit
          >
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Public gists by {user?.login}
              </Typography>
              <GistsList
                owner={user?.login}
                selectedGist={gist}
                onSelect={handleGistSelect}
              />
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Slide direction="up" in={gist !== null} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
              <GistView id={gist?.id} />
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </div>
  );
}
