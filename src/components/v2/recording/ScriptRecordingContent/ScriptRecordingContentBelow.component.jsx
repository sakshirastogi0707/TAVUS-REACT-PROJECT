import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "rgba(24, 119, 242, 0.1)",
    padding: "20px",
    color: "white",
    fontSize: "12px",
    padding: "2px 20px",
  },
}));

export const UserNotificationComponent = () => {
  const classes = useStyles();
  return (
    <Alert
      severity="info"
      className={classes.root}
      icon={false}
    >
      To ensure your AI voice matches the voice in your Tavus videos, 
      be sure to use the tone and volume in your training video that you want in your Tavus videos. 
      Also, make sure to record all of the training materials in one sitting. 
      And don't be deterred by the occasional stumble when reading. Keep going!
    </Alert>
  );
};

const ScriptRecordingContentBelow = () => (
  <>
    <UserNotificationComponent />
  </>
);

export default ScriptRecordingContentBelow;
