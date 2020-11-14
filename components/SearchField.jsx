import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearIcon from "@material-ui/icons/Clear";
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
  },
  input: {},
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SearchField({ placeholder, value, onChange, onClear }) {
  const classes = useStyles();
  return (
    <Input
      value={value}
      onChange={onChange}
      fullWidth
      autoFocus
      className={classes.input}
      placeholder={placeholder}
      startAdornment={
        <InputAdornment position="start" disablePointerEvents>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        value && (
          <InputAdornment position="end">
            <IconButton onClick={onClear}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }
      inputProps={{
        "aria-label": placeholder,
      }}
    />
  );
}
SearchField.defaultProps = {
  placeholder: "Search...",
};

export default SearchField;
