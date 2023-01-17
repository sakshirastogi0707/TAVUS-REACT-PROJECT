import React from "react";
import { makeStyles } from "@material-ui/core";


const useStaticStyles = makeStyles({
  base: {
    color: "#1877F2",
    padding: "2px 0px",
    fontSize: "20px",
  },
});

const StaticWord = ({ value, isDynamicCreation }) => {
  const classes = useStaticStyles();
  return <span className={classes.base}>{value}</span>;
};

export default StaticWord


