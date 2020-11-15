import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useMemo } from "react";
import useUserGists from "../hooks/useUserGists";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {},
  inline: {},
  chip: {
    marginRight: theme.spacing(0.5),
  },
}));

export function computeGistTitle(ownerName, files) {
  return ownerName + "/" + Object.keys(files)[0];
}

export function extractGistLanguges(files) {
  const languages = Object.values(files)
    .map((file) => file.language)
    .filter(Boolean);
  const dedupe = Array.from(new Set(languages));
  return dedupe;
}

const GistListItem = ({ owner, files, description, onSelect, isSelected }) => {
  const classes = useStyles();

  const languages = useMemo(() => extractGistLanguges(files), [files]);
  const title = useMemo(() => computeGistTitle(owner, files), [owner, files]);

  return (
    <ListItem button onClick={onSelect}>
      <ListItemText
        primary={title}
        secondary={
          <React.Fragment>
            {description && (
              <Typography component="span" variant="body2">
                {description} <br />
              </Typography>
            )}
            {languages.map((lang, index) => (
              <Chip
                component="span"
                className={classes.chip}
                key={`lang-${index}`}
                size="small"
                label={lang}
              />
            ))}
          </React.Fragment>
        }
      />
      {isSelected && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="active">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default function GistsList({ owner, selectedGist, onSelect }) {
  const classes = useStyles();
  const { data, isLoading, isError } = useUserGists(owner);

  const isIdle = !isLoading && !isError && !data;
  const isEmpty = data && data.length === 0;

  if (isIdle) {
    return "Not yet";
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Errored";
  }

  if (isEmpty) {
    return "No Gists";
  }

  return (
    <List className={classes.root}>
      {data.map((gist) => (
        <GistListItem
          {...gist}
          key={gist.id}
          onSelect={(e) => onSelect(gist)}
          isSelected={selectedGist?.id == gist.id}
        />
      ))}
    </List>
  );
}
