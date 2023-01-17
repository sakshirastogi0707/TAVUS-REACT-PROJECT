import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useUserDevices } from "../context/UserDevices.context";

const Recorder = ({
  videoDeviceId,
  audioDeviceId,
  webcamRef,
  aspectRatio,
  height,
  width,
  style,
  ...rest
}) => {
  
  const {currentAudioDevice, currentVideoDevice }= useUserDevices();

  return (
    <>
      <Webcam
        style={style}
        ref={webcamRef}
        videoConstraints={{ deviceId: currentVideoDevice.deviceId }}
        audioConstraints={{ deviceId: currentAudioDevice.deviceId }}
        audio={true}
        muted={true}
        width={width}
        height={height}
        {...rest}
      />
    </>
  );
};

export default Recorder;
