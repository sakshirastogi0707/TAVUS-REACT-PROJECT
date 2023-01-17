import React from "react";
import StartRecordingIcon from "@material-ui/icons/FiberManualRecordRounded";
import { StopRecordingIcon, RevertIcon } from "../../../icons";
import { ActionTextButton } from "../../../buttons";

const RecordAgainIcon = (
  <RevertIcon style={{ color: "#1877F2" }} height={"16px"} width={"16px"} />
);

const StartRecordIcon = (
  <StartRecordingIcon
    style={{ color: "white" }}
    height={"16px"}
    width={"16px"}
  />
);

const StopRecordIcon = (
  <StopRecordingIcon
    style={{ color: "white" }}
    height={"16px"}
    width={"16px"}
  />
);

const RecodingButtonBase = ({ backgroundColor, text, ...rest }) => (
  <ActionTextButton
    styleOverwrites={{
      height: "66px",
      width: "367px",
      backgroundColor: backgroundColor,
    }}
    {...rest}
  >
    <span style={{ fontSize: "18px", fontWeight: "500" }}>{`${text}`}</span>
  </ActionTextButton>
);

const CurrentRecordingButton = ({
  capturing,
  rerecordVideo,
  recordedUrl,
  handleStartCaptureClick,
  handleStopCaptureClick,
  access,
  isCountDown
}) => {
  if (!capturing && recordedUrl) {
    return (
      <RecodingButtonBase
        backgroundColor="#232631"
        onClick={rerecordVideo}
        startIcon={RecordAgainIcon}
        text="Record again"
      />
    );
  }
  if (!capturing) {
    return (
      <RecodingButtonBase
        onClick={handleStartCaptureClick}
        startIcon={StartRecordIcon}
        disabled={!access || isCountDown}
        text={"Start Recording"}
      />
    );
  }
  return (
    <RecodingButtonBase
      backgroundColor="#232631"
      onClick={handleStopCaptureClick}
      startIcon={StopRecordIcon}
      text={"Stop recording"}
    />
  );
};

export default CurrentRecordingButton;
