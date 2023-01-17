import React from "react";
import { Grid } from "@mui/material";



const trainingContent = `Click “Start recording” below and read the text to the right aloud.`;
const scriptContent = `You’re ready to record. Hit the button below to start the recording.`;

export const RecordingContent = ({ isTraining }) => {
  return (
    <Grid item className="DevCont">
      {isTraining ? trainingContent : scriptContent}
    </Grid>
  );
};

const ScriptRecordingContentAbove = ({isTraining}) => (
  <>
    <RecordingContent isTraining={isTraining} />
  </>
);

export default ScriptRecordingContentAbove;
