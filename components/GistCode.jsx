import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ScrollDialog({ open, onClose, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={"paper"}
      fullWidth={true}
      maxWidth={"lg"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText tabIndex={-1}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
