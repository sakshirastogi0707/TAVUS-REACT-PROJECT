import { makeStyles } from "@material-ui/core";
import { borderRadius } from "@mui/system";
import clsx from "clsx";
import React from "react";
import "./TemplateWord.styles.scss";
const useStyles = makeStyles({
  base: {
    color: "#FFFFFF",
    padding: "2px 0px",
    fontSize: "20px",
  },
  highlighted: {
    background: "#1877F2",
  },
  isStart: {
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px"
  },
  isEnd: {
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px"
  },
});

export const TemplateWord = ({
  word,
  id,
  type,
  vars,
  punctuatedWord,
  isHighlight,
  isEnd,
  isStart,
}) => {
  const classes = useStyles();
  return (
    <>
      <span
        id={id}
        className={clsx(classes.base, {
          [classes.highlighted]: isHighlight,
          [classes.isStart]: isStart,
          [classes.isEnd]: isEnd,
        })}
      >
        {punctuatedWord}
      </span>
      <span
        id={id}
        className={clsx(classes.base, {
          [classes.highlighted]: isHighlight && !isEnd,
        })}
      >
        {" "}
      </span>
    </>
  );
};
