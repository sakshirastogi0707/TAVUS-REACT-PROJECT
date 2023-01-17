import { Grid, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { ActionTextButton } from "../../buttons";
import SubstitutionTextAreaComponent from "../SubstitutionTextArea/SubstitutionTextArea.component";
import convertToWordArray from "../SubstitutionTextArea/utils/convertToWordArray"
import { useSubstitutions } from "../context/Substitution.context";

const useStyles = ({ x, y }, left) =>
  makeStyles({
    root: {
      background: "none",
    },
    originalText: {
      color: "#6F7897",
      fontSize: "12px",
    },
    textArea: {
      color: "#FFFFFF",
      fontSize: "20px",
      resize: "none",
      background: "none",
      margin: "24px 24px 0 24px",
      border: "none",
      outline: "none",
      height: "100%",
      width: "calc(100% - (24px * 2 ))",
    },
    tipArea: {
      borderTop: "1px solid #6F7897",
      maxHeight: "45px",
      fontSize: "12px",
      textAlign: "center",
      padding: "14px",
      "& span": {
        color: "#1877F2",
      },
    },
    modalContainer: {
      maxHeight: "250px",
      width: "450px",
      position: "absolute",
      background: "none",

      top: y + 30,
      left: x,
      "&:focus": {
        outline: "none",
      },
    },
    modalContent: {
      color: "#FFFFFF",
      background: "#232631",
      maxHeight: "250px",
      width: "450px",
      boxShadow: "0 3px 24px rgba(0,0,0,0.25)",
      border: "none",
      borderRadius: "8px",
      position: "relative",
      left: left,
    },
    buttonStyle: {
      padding: "8px 37",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row-reverse",
      padding: "0 24px 24px 0",
    },
  })();

const SubstitutionModal = ({
  position,
  open,
  onClose,
  startEndIndexOfSub
}) => {
  const [output, setOutputOfText] = useState({outputText: '', allVariables: []});
  const [loading, setLoading] = useState(false);
  const [isCreateDisabled, setIsCreateDisabled] = useState(false)
  const [left, setLeft] = useState(0);
  const classes = useStyles(position, left);
  const WIDTH = 450
  const ref = useRef();
  const {addNewSubstitutionInstance} = useSubstitutions();



  useEffect(() => {
    const windowWidth = window.innerWidth;
    const leftCorner = position.x + WIDTH;
    const howFarOutside = leftCorner - windowWidth;
    if (howFarOutside > 0) {
      setLeft(-howFarOutside);
    }

    return () => setLeft(0);
  }, [position]);

  const handleOnCreate = async () => {
    setLoading(true);
    const vars = convertToWordArray(output.contentBlock)
    await addNewSubstitutionInstance(vars, startEndIndexOfSub.startIdx, startEndIndexOfSub.endIdx)
    setLoading(false);
    onClose();
  };

  const setOutput = (output) => {
    setOutputOfText(output);
  };

  return (
    <Modal
      ref={ref}
      open={open}
      BackdropProps={{
        style: { background: "rgba(0,0,0,0)" },
      }}
      classes={classes.root}
      onClose={onClose}
    >
      <div className={classes.modalContainer} style={{ marginRight: "100px" }}>
        <div className={classes.modalContent}>
          <Grid item style={{ padding: "20px 0 10px 20px" }}>
            <SubstitutionTextAreaComponent
              setOutput={setOutput}
              setDisableCreate={setIsCreateDisabled}
              className="PostEditor__input"
            />
          </Grid>
          <Grid item className={classes.buttonContainer}>
            <ActionTextButton
              styleOverwrites={{
                padding: "8px 37px",
                fontSize: "15px",
                borderRadius: "8px",
              }}
              disabled={output.outputText==="" || isCreateDisabled }
              onClick={ loading ? null : handleOnCreate}
            >
              {loading ? "Loading" : "Create"}
            </ActionTextButton>
          </Grid>
          <Grid
            item
            container
            className={classes.tipArea}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <span>Tip: </span>Type "@" to create a dynamic variable
            </Grid>
          </Grid>
        </div>
      </div>
    </Modal>
  );
};

export default SubstitutionModal;