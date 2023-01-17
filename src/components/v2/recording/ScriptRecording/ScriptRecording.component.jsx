import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Webcam from "../Webcam/Webcam.component";
import SettingsModal from "../SettingsModal/SettingsModal.component";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import RecordRTC from "recordrtc";
import "./VideoRecording.styles.scss";
import Utils from "../../../../service/core/utils";
import ScriptRecordingContentBelow from "../ScriptRecordingContent/ScriptRecordingContentBelow.component";
import DismissModal from "../../modals/DismissModal/DismissModal.component";
import CurrentRecordingButton from "../CurrentRecordingButton/CurrentRecordingButton.component";
import ScriptRecordingContentAbove from "../ScriptRecordingContent/ScriptRecordingContentAbove.component";
import { CircularProgress } from "@mui/material";
import { UserDevicesProvider } from "../context/UserDevices.context";
import { SegmentService } from "../.././../../service/api/segment.service";
import getBlobDuration from "get-blob-duration";
import {
  StorageKeys,
  StorageService,
} from "../../../../service/core/storage.service";
const ScriptRecording = ({
  setMediaBlob,
  totalRecordingSteps,
  currentRecordingStep,
  resetRecordingRef,
  resetWebCamRef,
  isTraining,
  perviousRecordingUrl,
}) => {
  const [capturing, setCapturing] = React.useState(false);
  const [access, setAccess] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [timerCounter, setTimerCounter] = React.useState();
  const [recordedUrl, setUrl] = React.useState(0);
  const [sec, setSec] = React.useState("");
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [storedID, setId] = React.useState("");


  const isInitialMount = React.useRef(true);

  (async function () {
    const duration = await getBlobDuration(recordedUrl);
    setSec(duration);
  })().catch((err) => {
    return err;
  });

  function secondsToTime(e) {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");
    const getVideoLength = `${m}:${s}`;
    StorageService.setPerm("getVideoLength", getVideoLength);
  }
  secondsToTime(sec);
  useEffect(() => {
    if (perviousRecordingUrl) {
      setUrl(perviousRecordingUrl);
    }
  }, [perviousRecordingUrl]);

  const handleStartCaptureClick = React.useCallback(async () => {
    if (!webcamRef.current.state.hasUserMedia) {
      return;
    }
    setShowTimer(true);
    for (let i = 3; i >= 1; i--) {
      setTimerCounter(i);
      await Utils.wait(1000);
    }
    setShowTimer(false);
    setCapturing(true);
    mediaRecorderRef.current = new RecordRTC.RecordRTCPromisesHandler(
      webcamRef.current.stream,
      { type: "video" }
    );
    await mediaRecorderRef.current.startRecording();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  useEffect(() => {
    if (resetRecordingRef) {
      resetRecordingRef.current = rerecordVideo;
    }
    
  }, [resetRecordingRef]);

  useEffect(() => {
    if (resetWebCamRef) {
      resetWebCamRef.current = resetWebCam;
    }
    
  }, [resetWebCamRef]);

  const rerecordVideo = () => {
    window.URL.revokeObjectURL(recordedUrl);
    setMediaBlob(null);
    setUrl(null);
    SegmentService.analyticsTrack('Record Again Clicked',{})
  };

  const resetWebCam = () => {
    window.URL.revokeObjectURL(recordedUrl);
    setMediaBlob(null);
    setUrl(null);
  };

  const handleStopCaptureClick = React.useCallback(async () => {
    try {
      await mediaRecorderRef.current.stopRecording();
      const blob = await mediaRecorderRef.current.getBlob();
      setMediaBlob(blob);
      const url = URL.createObjectURL(blob);
      setUrl(url);
    } catch (error) {
      console.log(`Error Stopping capture caused by : ${error}`);
    }
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleSetMediaBlob = React.useCallback(async () => {}, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!capturing) {
        handleSetMediaBlob();
      }
    }
  }, [access, setShowTimer]);

  const getUrl = (url) => {
    if (!(url && url.includes("blob"))) {
      return `${url}?time=${new Date().valueOf()}`;
    } else {
      return url;
    }
  };
  const ClickHandler = () => {
    setOpen(true);
  };
  return (
    <UserDevicesProvider>
      <div className="LeftBox-main">
        <Grid container direction="column" className="boxDiv" xs>
          <Grid item container direction="column" alignItems="center">
            {currentRecordingStep && totalRecordingSteps && (
              <Grid item alignSelf="flex-start" className="DevText">
                <span>
                  {currentRecordingStep} of {totalRecordingSteps}{" "}
                </span>
              </Grid>
            )}
            <ScriptRecordingContentAbove isTraining={isTraining} />
            <Grid item>
              <CurrentRecordingButton
                capturing={capturing}
                access={access}
                recordedUrl={recordedUrl}
                rerecordVideo={rerecordVideo}
                handleStartCaptureClick={handleStartCaptureClick}
                handleStopCaptureClick={handleStopCaptureClick}
                isCountDown={showTimer}
              />
            </Grid>
            {isTraining && (
              <Grid item className="Alert-message-box">
                <ScriptRecordingContentBelow />
              </Grid>
            )}
            <Grid item className="video-box-main">
              <div className="video-box" xs>
                {recordedUrl ? (
                  <video
                    ref={videoRef}
                    className="VideoBox"
                    type="video/mp4"
                    src={getUrl(recordedUrl)}
                    preload="auto"
                    controls
                    max-age="60"
                  ></video>
                ) : (
                  <div style={{}}>
                    <Webcam
                      webcamRef={webcamRef}
                      className="webcam"
                      audio={true}
                      muted={true}
                      aspectRatio={376 / 227}
                      onUserMediaError={() => {
                        setAccess(false);
                      }}
                    />
                    {
                      <CircularProgress
                        style={{
                          position: "absolute",
                          zIndex: 0,
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0,
                          margin: "auto",
                        }}
                      />
                    }
                    {capturing && (
                      <div className={"red-dot-wrapper"}>
                        <span></span>
                      </div>
                    )}
                  </div>
                )}

                {showTimer ? (
                  <div
                    className={"timer-counter"}
                    style={{
                      background: "rgba(0, 0, 0, 0.25)",
                      borderRadius: "20px",
                    }}
                  >
                    <span>{timerCounter}</span>
                  </div>
                ) : null}
              </div>
            </Grid>
            <Grid item alignSelf="flex-start" style={{ paddingTop: "20px" }}>
              <div className="Audiovideo">
                <IconLabelButtons
                  title="Audio and video"
                  onClick={() => ClickHandler()}
                  startIcon="Audio-video.svg"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <SettingsModal open={open} setOpen={setOpen} />
      <DismissModal
        open={!access}
        title={"Allow access to your microphone and camera"}
        content={"We need to record your voice and video to train our AI model"}
      />
    </UserDevicesProvider>
  );
};

export default ScriptRecording;
