import React, { useEffect, useState, useCallback } from "react";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import UserDevicesSettings from "../../recording/UserDevicesSettings/UserDevicesSettings.component";
import "./access.scss";
import { useUserDevices } from "../../recording/context/UserDevices.context";
import { Grid } from "@mui/material";
const Access = (props) => {
  const [openModal, SetOpenModal] = useState({
    open: false
  });
  const { allowedAccess,currentAudioDevice,currentVideoDevice} = useUserDevices()
  props.setAudioDevice(currentAudioDevice.label);
  props.setVideoDevice(currentVideoDevice.label)
  useEffect(() => {
    if (!allowedAccess) {
      SetOpenModal({
        open: true,
        heading: "We need access to your video and audio to record!",
        subHeading: `Follow this guide to grant microphone and video access to Tavus ${process.env.REACT_APP_IMAGE_URL}`,
      });
    }
  }, [allowedAccess]);

  return (
    <>
      <div className="training-frame-main ">
        <HeaderLanding userData={props.userData}/>
        <Grid container alignItems="center"  className="training-box">
          <Grid item xs={5} style={{paddingRight: '72px'}}>
            <h3
              style={{
                fontWeight: 500,
                fontSize: "48px",
                lineHeight: "58px",
                letterSpacing: "0.1px",
              }}
            >
              Let’s train our AI to recognize your voice
            </h3>
            <p
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "32px",
                color: "rgba(255, 255, 255, 0.8)",
                paddingTop: "24px",
              }}
            >
              To do this, we’re going to ask you to read a few sentences aloud.
              Begin by granting Tavus access to your microphone. This step
              should take no more than 20 minutes.
            </p>
          </Grid>
          <Grid item xs >
            <UserDevicesSettings height={"442px"}/>
          </Grid>
        </Grid>
        <AppDialogInvite
          open={openModal.open}
          maxWidth={"md"}
          customClassMain="allow-access"
          onClose={() =>
            SetOpenModal({ open: false, heading: "", subHeading: "" })
          }
          modelTitle={openModal.heading}
          modelSubTitle={openModal.subHeading}
          content={
            <div className="contentModal parentContentModal">
              <div className="NiceBtnone float-right">
                <IconLabelButtons
                  title="Dismiss"
                  onClick={() =>
                    SetOpenModal({ open: false, heading: "", subHeading: "" })
                  }
                />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default Access;
