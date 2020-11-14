import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
  cardContent: {
    position: "relative",
    padding: 0,
    cursor: "pointer",
    borderRadius: 0,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    height: 200,
    overflow: "hidden",
    marginBottom: 10,
    "&:hover": {
      borderColor: theme.palette.primary.dark,
    },
  },
  viewButton: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 0,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "60vw",
  },
}));

export default function GistFile({ file, ownerName }) {
  const classes = useStyles();
  const language = file.language ? file.language.toLowerCase() : "text";

  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

  const title = `${ownerName}/${file.filename}`;
  return (
    <>
      <Card className={classes.root} elevation={0}>
        <CardHeader subheader={file.type} title={<code>{title}</code>} />
        <CardContent
          onClick={handleOpen}
          className={classes.cardContent}
          onMouseEnter={(e) => setIsHover(true)}
          onMouseLeave={(e) => setIsHover(false)}
        >
          <SyntaxHighlighter
            wrapLongLines
            customStyle={{ margin: 0 }}
            style={materialLight}
            language={language}
          >
            {file.content}
          </SyntaxHighlighter>
          {isHover && (
            <Button
              className={classes.viewButton}
              variant="contained"
              color="primary"
              disableElevation
            >
              View
            </Button>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={isModalOpen}
        onClose={(e) => setIsModalOpen(false)}
        fullWidth
        scroll={"paper"}
        maxWidth={"lg"}
      >
        <DialogTitle>{file.filename}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText tabIndex={-1}>
            {isModalOpen && (
              <SyntaxHighlighter
                style={materialLight}
                language={language}
                showLineNumbers
              >
                {file.content}
              </SyntaxHighlighter>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" href={file.raw_url} target="_blank">
            View Raw
          </Button>
          <Button onClick={(e) => setIsModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
