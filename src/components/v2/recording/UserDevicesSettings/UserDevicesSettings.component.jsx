import React from "react";
import { useUserDevices } from "../context/UserDevices.context";
import Webcam from "../Webcam/Webcam.component";
import { Grid } from "@material-ui/core";
import "./SettingModal.styles.scss";
import DeviceDropdown from "./DeviceDropdown.component";
import {SegmentService} from '../../../../service/api/segment.service'

const Settings = ({ height }) => {
  const {
    currentAudioDevice,
    currentVideoDevice,
    audioDevices,
    videoDevices,
    changeCurrentAudioDevice,
    changeCurrentVideoDevice,
  } = useUserDevices();



  const onChangeSetAudioDevice = (value) => {
    const selectDevice = audioDevices.find(
      (device) => device.deviceId === value.value
    );
    changeCurrentAudioDevice(selectDevice);
  };
  const onChangeSetVideoDevice = (value) => {
    const selectDevice = videoDevices.find(
      (device) => device.deviceId === value.value
    );
    changeCurrentVideoDevice(selectDevice);

  };

  return (
    <>
      <div className="videoSection">
        <Webcam
          style={{ borderRadius: "8px", objectFit: "cover" }}
          audio={false}
          muted={true}
          height={height ? height : "100%"}
          width={"100%"}
          aspectRatio={376 / 227}
          videoDeviceId={currentVideoDevice.deviceId}
          audioDeviceId={currentAudioDevice.deviceId}
        />
      </div>
      <Grid
        container
        justifyContent="space-between"
        style={{ padding: "32px 0" }}
      >
        <Grid item xs style={{ paddingRight: "32px" }}>
          <DeviceDropdown
            type="audio"
            currentDevice={currentAudioDevice}
            availableDevices={audioDevices}
            onChange={onChangeSetAudioDevice}
          />
        </Grid>
        <Grid item xs>
          <DeviceDropdown
            type="video"
            currentDevice={currentVideoDevice}
            availableDevices={videoDevices}
            onChange={onChangeSetVideoDevice}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
