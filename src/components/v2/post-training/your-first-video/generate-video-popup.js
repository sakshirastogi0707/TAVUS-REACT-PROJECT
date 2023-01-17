import React, { useState } from "react";
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import "./generate-video-popup.scss";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AppImage } from "../../../$widgets/images/app-image";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons-black";
export default function GenerateVideoPopup() {
  const [openModal, SetOpenModal] = useState(true);
  return (
    <>
      <AppDialogInvite
        open={openModal}
        maxWidth={"lg"}
        customClassMain="live-preview-main"
        onClose={() => SetOpenModal(false)}
        content={
          <div className="recordingBox">
            <div className="interaction">
             
            </div>
            <div className="live-btn">
              <IconLabelButtons title="Live preview"/>
              </div>

            {/* <div className="loader-box">
              <div className="loader">
                <AppImage
                  name={"loader-anim.png"}
                  className="rotate"
                  width="88"
                />
              </div>
            </div> */}
          </div>
        }
      />
    </>
  );
}
