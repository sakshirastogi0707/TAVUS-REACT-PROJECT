import React, { useState } from "react";
import { Grid, Modal, makeStyles } from "@material-ui/core";
import { TemplateWord } from "../TemplateWord/TemplateWord.component";
import RevertIcon from "../../icons/RevertIcon/RevertIcon.component";
import { ActionTextButton } from "../../buttons";
import { useSubstitutions } from "../../substitution/context/Substitution.context";
import { useGVS } from "../../substitution/context/GVS.context";
const useStyles = (x, y) =>
  makeStyles({
    root: {
      background: "none",
    },
    modalContent: {
      color: "#FFFFFF",
      background: "#232631",
      width: "450px",
      padding: "24px",
      position: "absolute",
      top: y + 20,
      left: x,
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 3px 24px rgba(0,0,0,0.25)",
      "&:focus": {
        outline: "none",
      },
    },
    buttonStyle: {
      padding: "8px 2px",
      color: "#FFFFFF",
      backgroundColor: "#1877F2",
      textTransform: "unset",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row-reverse",
      padding: "0 24px 24px 0",
    },
    subHeading: {
      color: "#6F7897",
      fontSize: "12px",
      paddingBottom: "8px",
    },
  })();

const RevertModal = ({
  words,
  open,
  onClose,
  position,
  subId,
}) => {
  const x = position.x;
  const y = position.y;
  const classes = useStyles(x, y);
  const { reloadVars } = useGVS()
  const {deleteSubstitutionInstance}  = useSubstitutions()
  const [loading, setLoading] = useState(false)

  const handleOnRevertClicked = async () => {
    setLoading(true)
    await deleteSubstitutionInstance(subId)
    await reloadVars()
    setLoading(false)
  }

  return (
    <Modal
      open={open}
      BackdropProps={{
        style: { background: "rgba(0,0,0,0)" },
      }}
      classes={classes.root}
      onClose={onClose}
    >
      <Grid container direction="column" className={classes.modalContent}>
        <Grid item className={classes.subHeading}>
          Original
        </Grid>
        <Grid item style={{ paddingBottom: "24px" }}>
          {words.map((word,idx) => (
            <TemplateWord
              key={`RevertModal-TemplateWord-${idx}`}
              {...word}
              isStart={false}
              isEnd={false}
              isHighlight={false}
            />
          ))}
        </Grid>
        <Grid item container direction="row-reverse">
          <ActionTextButton
            styleOverwrites={{ padding: "10px 25px", borderRadius: "8px" }}
            startIcon={<RevertIcon />}
            onClick={handleOnRevertClicked}
          >
           {loading ? "loading": "Revert"} 
          </ActionTextButton>
        </Grid>
      </Grid>
    </Modal>
  );
};


export default RevertModal