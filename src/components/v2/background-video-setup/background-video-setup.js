import React, { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import AdminService from "../../../service/api/admin.service";
import Container from "@mui/material/Container";
import Utils from "../../../service/core/utils";
import HeaderLanding from "../../app-frame/app-header-landing/app-header-landing";
import AppFooter from "../../app-frame/app-footer/app-footer";
import {
  StorageService,
  StorageKeys,
} from "../../../service/core/storage.service";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AppImage } from "../../$widgets/images/app-image";
import "./../new-views.scss";
import "./background-video-setup.scss";
import { toast } from "react-toastify";
import UserServices from "./../../../service/api/user.service";
import { UserService } from "../../../service/api/user-service";
import { CampaignService } from "../../../service/api/campaign.service";
import { VideoType, AvatarShape } from "../../../enum/common.enum";
import TipsTricksModal from "./TipsTricksModal";
import ShapeToggle from "./ShapeToggle";
import DynamicBlock from "./DynamicBlock";
import StaticBlock from "./StaticBlock";
import RightPanel from "./RightPanel";
import {
  generateSampleBackground,
  getSampleBackground,
} from "../../../service/api/dynamicVideo.service";
import clsx from "clsx";
import HelpModal from "./HelpModal";
import Strings from "../../../constants/strings";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { set } from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#23263180",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const FILE_TOO_LARGE_MESSAGE = "File too large, please try again";

const BackgroundVideoSetup = (props) => {
  const SQUARE = AvatarShape.SQUARE,
    ROUND = AvatarShape.ROUND;
  const STATIC = VideoType.STATIC,
    DYNAMIC = VideoType.DYNAMIC;

  const [isLoading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [isGenerating, setGenerating] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState(
    "Generating your background video sample, this will take around 30 seconds"
  );
  const [previewLink, setPreviewLink] = useState(null);
  const [disableCompany, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [avatarShape, setAvatarShape] = useState(SQUARE);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [mediaTemplate, setMediaTemplate] = useState({});
  const [videoType, setVideoType] = useState(STATIC);
  const [campaignId, setCampaignId] = useState(null);
  const [userData, setUserData] = React.useState({});
  const [isGeneratingVedio, setGeneratingVedio] = useState(false);
  const [inputValue, setInputvalue] = useState("");
  const params = useParams();
  const history = useHistory();
  const [progress, setProgress] = useState(30);
  const [isEdit, setIsEdit] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("edit-campaign/background-video")) {
      setIsEdit(true);
    }
  }, []);
  useEffect(() => {
    loadBackgroundVideo();
    userDetails();
  }, []);

  async function userDetails() {
    AdminService.userDetails()
      .then(async (response) => {
        setUserData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  async function loadBackgroundVideo() {
    if (params?.campaignId) {
      setCampaignId(params?.campaignId);
      try {
        setGeneratingMessage("Loading");
        setGenerating(true);
        let response = await CampaignService.getMediaTemplate(
          params?.campaignId
        );
        if (response.media_json) {
          setMediaTemplate(response.media_json);
        }
        let videoType = response?.media_json?.assets?.background_video?.type;
        if (videoType) {
          setVideoType(videoType === "static" ? STATIC : DYNAMIC);
        }
      } catch (e) {
        toast.error(Strings.LOAD_BACKGROUND_VIDEO);
      } finally {
        setGenerating(false);
      }
    }
  }

  const fileInputRef = React.createRef();

  const handleClose = (event) => {
    setOpen(false);
  };

  const isFileSizeValid = (file) => file.size < MAX_FILE_SIZE;

  const onFileDrop = (ev) => {
    ev.preventDefault();

    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[0].kind === "file") {
        var file = ev.dataTransfer.items[0].getAsFile();
        if (isFileSizeValid(file)) {
          setUploadedFile(file);
        } else {
          toast.error(FILE_TOO_LARGE_MESSAGE);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      let file = ev.dataTransfer.files[0];
      if (isFileSizeValid(file)) {
        setUploadedFile(file);
      } else {
        toast.error(FILE_TOO_LARGE_MESSAGE);
      }
    }
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (event) => {
    let selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      if (isFileSizeValid(selectedFile)) {
        setUploadedFile(selectedFile);
        setProgress(60);
      } else {
        toast.error(FILE_TOO_LARGE_MESSAGE);
      }
    }
  };

  const changeAvatarShape = (shape) => {
    setAvatarShape(shape);
  };

  const getSrc = () => {
    const storageLink = mediaTemplate?.assets?.background_video?.storage_link;
    if (!uploadedFile && !storageLink) {
      return "";
    }
    if (!uploadedFile && storageLink) {
      return storageLink;
    }
    if (uploadedFile && !storageLink) {
      return URL.createObjectURL(uploadedFile);
    }
    // both are not null
    return URL.createObjectURL(uploadedFile);
  };

  const onContinueClick = async () => {
    const storageLink = mediaTemplate?.assets?.background_video?.storage_link;
    if (videoType === STATIC && uploadedFile === null && !storageLink) {
      toast.error(Strings.NO_FILE_SELECTED);
      return;
    }
    setLoading(true);
    try {
      if (videoType === STATIC) {
        if (uploadedFile) {
          let response = await UserServices.uploadBackgroundVideo(
            uploadedFile,
            {
              campaignId,
            }
          );
        }
      }
      await UserServices.updateMediaTemplate({
        campaignId,
        dynamic: videoType === DYNAMIC,
        round: avatarShape === ROUND,
      });
      if (isEdit) {
        return history.push("/dashboard");
      }
      await updateUsersSteps();
    } finally {
      setLoading(false);
    }
  };

  const updateUsersSteps = async () => {
    try {
      if (userData.steps) {
        let steps = userData.steps;
        steps.background_video = true;
        const result = await UserService.userSteps(steps);
        if (userData?.campaign_count > 1) {
          history.push(`/landing/${campaignId}`);
        } else {
          if (userData?.is_mic_available) {
            history.push(`/landing/${campaignId}`);
          } else {
            history.push(`/training-complete/${campaignId}`);
          }
        }
        return result;
      }
    } catch (e) {
      console.log("campaign not saved", e);
      return false;
    }
  };

  const getAvatarSrc = () => {
    return "../../assets/images/placeholderVideo.png";
  };

  const onTestClick = async () => {
    let url = document.getElementById("url-input").value;
    if (url != null && url != "") {
      setProgress(60);
    }

    url = Utils.urlValidation(url);
    if (!url) {
      toast.error(Strings.ENTER_VALID_URL);
      return;
    }

    try {
      setGeneratingMessage(
        "Generating your background video sample, this will take around 30 seconds"
      );
      setGenerating(true);
      await generateSampleBackground(campaignId, url)
      setGeneratingVedio(true);
      const interval = setInterval(async function () {
        const res = await getSampleBackground(campaignId);
        if (res.ready) {
          clearInterval(interval);
          setPreviewLink(res.url);
          setGenerating(false);
          setGeneratingVedio(false);
        }
      }, 5000);
    } catch (e) {
      setGenerating(false);
      toast.error(Strings.PREVIEW_FAILED);
    }
  };

  const onTrashClick = async () => {
    setUploadedFile(null);
    setProgress(30);
    setMediaTemplate({
      assets: {
        background_video: {},
      },
    });

    try {
      setLoading(true);
      await CampaignService.deleteBackgroundVideoData(campaignId);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const bigToggle = (
    <div className="big-toggle">
      <div
        className={
          videoType === STATIC ? "big-toggle-side active" : "big-toggle-side"
        }
        onClick={() => setVideoType(STATIC)}
      >
        Static Video
      </div>
      <div
        className={
          videoType === DYNAMIC ? "big-toggle-side active" : "big-toggle-side"
        }
        onClick={() => setVideoType(DYNAMIC)}
      >
        Dynamic Video
      </div>
    </div>
  );

  const storageLink = mediaTemplate?.assets?.background_video?.storage_link;
  const isContinueEnabled =
videoType === DYNAMIC || (videoType === STATIC && uploadedFile !== null) || getSrc();

  // (videoType === STATIC && uploadedFile === null);

  // const UpdateProgressbar=()=>{
  //     if(uploadedFile!=null){
  //         progress=  20
  //     }
  // }
  return (
    <div className={"background-video-main"}>
      <HeaderLanding userData={userData} />
      <Container maxWidth="xl" className="background-video-setup">
        <Grid container spacing={5}>
          <Grid item xs={4} className="left-panel">
            <Item className="position-relative">
              <div className="heading">Video Type</div>
              <div className="subheading">Let's add the main ingriedient</div>
              {bigToggle}
              {videoType === STATIC ? (
                <StaticBlock
                  onDrop={onFileDrop}
                  onClick={openFileDialog}
                  onDragOver={dragOverHandler}
                  onChange={onFileChange}
                  fileInputRef={fileInputRef}
                  uploadedFile={uploadedFile}
                  mediaTemplate={mediaTemplate}
                  onTrashClick={onTrashClick}
                ></StaticBlock>
              ) : (
                <DynamicBlock
                  onChange={(e) => setInputvalue(e.target.value)}
                  onClick={onTestClick}
                  setGeneratingVedio={isGeneratingVedio}
                ></DynamicBlock>
              )}
              <div className="bottom-section">
                <div className="choose">Choose the avatar shape.</div>
                <div className="switch-wrapper">
                  <ShapeToggle
                    avatarShape={avatarShape}
                    changeAvatarShape={changeAvatarShape}
                  ></ShapeToggle>
                </div>
                <div className="tips-tricks-wrapper">
                  <Button variant="contained" className="tips-tricks-button">
                    <AppImage name={"sparkles-icon-font.svg"} />
                    {"Tips & Tricks"}
                  </Button>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={8} className="right-panel">
            <Item>
              {
                <RightPanel
                  generatingMessage={generatingMessage}
                  isGenerating={isGenerating}
                  videoType={videoType}
                  uploadedFile={uploadedFile}
                  src={getSrc()}
                  previewLink={previewLink}
                ></RightPanel>
              }
            </Item>
            <div
              className={clsx("avatar-face", {
                ["avatar-face-round"]: avatarShape === AvatarShape.ROUND,
              })}
            >
              <img src={getAvatarSrc()} />
            </div>
          </Grid>
        </Grid>
        <AppFooter
          userData={userData}
          onClick={onContinueClick}
          disabled={!isContinueEnabled}
          onBack={() =>
            props.history.push(
              isEdit
                ? `/edit-campaign/landing/${params?.campaignId}`
                : `/template/${campaignId}`
            )
          }
          isBack={userData?.uuid && true}
          title={"Continue"}
          isLoading={isLoading}
          progress={progress}
          invite={true}
          step={"background-video-setup"}
        />
      </Container>
      <HelpModal open={open} onClose={handleClose}></HelpModal>
    </div>
  );
};

export default BackgroundVideoSetup;
