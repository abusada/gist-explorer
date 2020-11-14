import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CodeIcon from "@material-ui/icons/Code";
import React, { useState } from "react";
import useGistById from "../hooks/useGistById";
import GistFile from "./GistFile";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const GistView = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading, isError } = useGistById(id);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "loading...";
  }

  return (
    <>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Code" icon={<CodeIcon />} />
        <Tab
          label={`Forks (${data.forks.length})`}
          icon={<AccountTreeIcon />}
        />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        {data.description && (
          <Typography paragraph gutterBottom>
            {data.description}
          </Typography>
        )}
        {Object.values(data.files).map((file) => (
          <GistFile
            file={file}
            key={file.filename}
            ownerName={data.owner.login}
          />
        ))}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <List>
          {data.forks.map((fork, index) => (
            <ListItem key={`fork-${index}`}>
              <ListItemAvatar>
                <Avatar alt={fork.user.login} src={fork.user.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={fork.user.login}
                secondary={fork.user.html_url}
              />
              <ListItemSecondaryAction>
                <Button
                  variant="outlined"
                  target="_blank"
                  size="small"
                  href={`https://gist.github.com/${fork.user.login}/${fork.id}`}
                >
                  View Fork
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </>
  );
};

export default GistView;
