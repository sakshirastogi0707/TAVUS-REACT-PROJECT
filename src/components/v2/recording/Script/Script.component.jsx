import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import "./script.scss";
const useStyles = makeStyles({
  textArea: {
    color: "white",
    fontSize: "24px",
    width: "100%",
    height: "100%",
    background: "rgba(35, 38, 49, 1)",
    resize: "none",
    border: "none",
    padding: "35px",
    borderRadius: "16px",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
});

export const Script = ({ onTextChange, isEditable, text }) => {
  const classes = useStyles();
  const handleOnChange = (e) => {
    onTextChange(e.target.value);
  };
  return (
        <div className="scriptScrollBar">
          <textarea
            className={classes.textArea}
            value={text}
            readOnly={!isEditable}
            onChange={isEditable ? handleOnChange : null}
          />
      </div>
    
  );
};
