import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import { CheckIcon } from "../../icons";
import { minWidth } from "@mui/system";

const BLUE_COMPLETE = "#0062FF";
const WHITE = "#000000";
const LIGHT_GREY = "#757B8C";

const useStyles = makeStyles({
  itemContainer: {
    padding: "15px 25px",
    maxWidth: "20%",
    minWidth: "220px",
  },
  checkIcon: {
    fontSize: "8px",
  },
  itemBase: {
    borderRadius: "50%",
    height: "20px",
    minWidth: "20px",
    fontSize: "11px",
    lineHeight: "9px",
    textAlign: "center",
    padding: "4px 3px 0 3px",
    lineHeight: "11px",
    color: LIGHT_GREY,
    border: `1px solid ${LIGHT_GREY}`,
  },

  itemComplete: {
    padding: "5px 4px",
    lineHeight: "10px",
    backgroundColor: BLUE_COMPLETE,
    color: BLUE_COMPLETE,
    border: "none",
  },

  itemNumber: {},

  active: {
    color: WHITE,
    borderColor: WHITE,
  },

  itemTitle: {
    color: "#757B8C",
  },
});

const NavFooterItem = ({ title, number, isActive, isComplete }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      className={classes.itemContainer}
      spacing={1}
    >
      <Grid item>
        <div
          className={clsx(classes.itemBase, {
            [classes.itemActive]: isActive,
            [classes.itemComplete]: isComplete,
          })}
        >
          {isComplete ? <CheckIcon style={{ fontSize: "8px" }} /> : number}
        </div>
      </Grid>
      <Grid item>
        <Typography
          className={clsx(classes.itemTitle, {
            [classes.active]: isActive || isComplete,
          })}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NavFooterItem;
