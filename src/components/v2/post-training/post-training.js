import React, { useEffect, useState } from "react";
import AppFooter from "../../app-frame/app-footer/app-footer";
import HeaderLanding from "../../app-frame/app-header-landing/app-header-landing";
import "./post-training.scss";
import SetPrimaryVariable from "./set-primary-variable/set-primary-variable";
import FirstVideo from "./your-first-video/your-first-video";
import { AppImage } from "../../$widgets/images/app-image";
import IconLabelButtons from "../../$widgets/buttons/icon-label-buttons";
import Email from "./email-screen/email";
import GenerateVideoPopup from "./your-first-video/generate-video-popup";

const PostTraining = (props) => {
  return (
    <>
      <GenerateVideoPopup />
      <Email />
      <FirstVideo />
      <SetPrimaryVariable />
    </>
  );
};

export default PostTraining;
