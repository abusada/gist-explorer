import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const UserListItem = ({
  login,
  html_url,
  onSelect,
  avatar_url,
  isSelected,
}) => {
  return (
    <ListItem button onClick={onSelect}>
      <ListItemAvatar>
        <Avatar alt={login} src={avatar_url} />
      </ListItemAvatar>
      <ListItemText primary={login} secondary={html_url} />
      {isSelected && (
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const UsersList = ({ users, isLoading, selectedUserid, onSelect }) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        minHeight={100}
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <List>
      {users.map((user) => (
        <UserListItem
          key={user.id}
          login={user.login}
          html_url={user.html_url}
          avatar_url={user.avatar_url}
          onSelect={(e) => onSelect(user)}
          isSelected={user.id === selectedUserid}
        />
      ))}
    </List>
  );
};

UsersList.defaultProps = {
  users: [],
  onSelect: (u) => console.log(u),
};

export default UsersList;
