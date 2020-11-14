import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const Recents = ({ recents, onDelete, onSelect }) => (
  <>
    <Typography color="textSecondary" variant="subtitle1">
      Recent Searches
    </Typography>
    <List>
      {recents.map((item) => (
        <ListItem button onClick={(e) => onSelect(item)} key={item}>
          <ListItemText primary={item} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => onDelete(item)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </>
);

export default Recents;
