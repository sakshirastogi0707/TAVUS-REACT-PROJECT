import React, { useState } from "react";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    background: "#1D1E28",
    backgroundColor: "#1D1E28",
    borderRadius: "16px",
  },
  test:{
    borderRadius: "16px",

  },
  dialogPaper: {
    background: "#1D1E28",
    backgroundColor: "#1D1E28",
    borderRadius: "16px",
    maxWidth: "600px",
    maxHeight: "390px",
  },
  dialogTitle: {},
  dialogContent: {
    color: "#6F7897",
    fontSize: "18px",
  },
});

const DismissModal = ({ open, title, content, children }) => {
  const classes = useStyles();
  const [dismissed, setDismissed] = useState(false);
  return (
    <Dialog
      open={open && !dismissed}
      maxWidth={"md"}
      onClose={() => setDismissed(true)}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
        },
      }}
    >
      <DialogContent
        classes={{
          root: classes.root,
          paper: classes.dialogPaper,
        }}
      >
        <DialogTitle
          style={{
            fontSize: "28px",
            color: "white",
            textAlign: 'center',
            fontWeight: 700,
            padding: "16px",
          }}
        >
          {title}
        </DialogTitle>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid
            item
            style={{
              color: "#6F7897",
              fontSize: "18px",
            }}
          >
            {content}
            {children}
          </Grid>
          <Grid item style={{marginBottom:"20px"}}>
            <IconLabelButtons
              title="Dismiss"
              onClick={() => setDismissed(true)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default DismissModal;
