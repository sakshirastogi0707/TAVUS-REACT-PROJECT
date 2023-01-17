import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AppFooter from "../../../components/app-frame/app-footer/app-footer";
import TemplateTranscript from "../../../components/template-transcript/TemplatedTranscript/TemplateTranscript.component";
import { useHistory, useParams, useLocation } from "react-router-dom";
import RevertIcon from "../../../components/icons/RevertIcon/RevertIcon.component";
import {
  revertTemplate,
  submitTemplate,
} from "../../../service/api/substitution.service";
import { UserService } from "../../../service/api/user-service";
import {
  StorageService,
  StorageKeys,
} from "../../../service/core/storage.service";
import "./avatar-video-config-page.scss";
import AppDialogInvite from "../../../components/$widgets/AppDialogInvite/AppDialogInvite";
import { AppImage } from "../../../components/$widgets/images/app-image";
import IconLabelButtons from "../../../components/$widgets/buttons/icon-label-buttons";
import { CampaignService } from "../../../service/api/campaign.service";
import {
  SubstitutionProvider,
  useSubstitutions,
} from "../../../components/substitution/context/Substitution.context";

const AvatarVideoConfigPage = ({ campaignId }) => {
  const [openTips, setOpenTips] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { revertTemplateToOriginal, submitATemplate, substitutions } = useSubstitutions();
  const [userData, setUserDetail] = React.useState({});
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [loadingRevertToOriginal, setLoadingRevertToOriginal] = useState(false);


  useEffect(() => {
    if (location.pathname.includes('edit-campaign/template')) {
      setIsEdit(true)
    }
  }, []);

  const handleRevertTemplate = async () => {
    setLoading(true);
    setLoadingRevertToOriginal(true)
    await revertTemplateToOriginal();
    setLoading(false);
    setLoadingRevertToOriginal(false)
  };

  useEffect(() => {
    (async () => {
      let isValid = await CampaignService.validateUserCampaignAccess(params?.campaignId)
      let user = await UserService.getUserProfile()
      if (!isValid) {
        if (user?.campaign_count > 1) {
          history.push(`/campaigns-list`)
        } else {
          history.push(`/dashboard`)
        }
      }
      setUserDetail(user)
    })();
  }, [])

  const isContinueDisabled = () => {
    return !(substitutions && Object.keys(substitutions).length != 0)

  }

  const onForwardClick = async () => {
    setSubmitting(true);
    try {
      await submitATemplate({ isEdit });
      if (userData.steps) {
        let steps = userData.steps;
        steps.template = true;
        const result = await UserService.userSteps(steps);
        if (isEdit) {
          return history.push(`/edit-campaign/landing/${params?.campaignId}`);
        }
        history.push(`/background-video-setup/${campaignId}`);
        setSubmitting(false);
        return result;
      }
    } catch (e) {
      console.log("step not saved", e);
      return false;
    }
  };


  return (
    <>
      <Grid className="d-flex">
        <div className="supercharge">
          <div className={"logo"}>
            <AppImage name={"logo.svg"} width={"122"} />
          </div>
          <div className="scriptLeft">
            <div className="timeline">
              <div className="vtl">
                <div className="event">
                  <h3>How to create variables </h3>
                  <p className="txt">
                    To make a word in your script a variable, type “@” followed by the name for the type of variable you want to create. This creates a placeholder in your script that’s filled with the data you provide us. For example, type “@” followed by “first_name” to make that part of your video match the name of the recipient. If you don’t use “@” to make a variable, any changes you make to your script will instead update the audio for every video in the campaign

                  </p>
                </div>
                <div className="event center">
                  <div className="navButton">
                    <IconLabelButtons
                      title="See Example"
                      onClick={() => setOpenTips(true)}
                      startIcon="magicpen.svg"
                    />
                  </div>
                </div>
                <div className="event center">
                  <div className="navButton">
                    <IconLabelButtons
                      title="Tips and Tricks"
                      startIcon="sparkles-icon-font.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edit-transcript">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className="edit-transcript-top"
          >
            <Grid item>
              <Typography variant="h5">
                Personalize Video
              </Typography>
            </Grid>
            <Grid item className="">
              <span
                onClick={handleRevertTemplate}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body1" >
                  <RevertIcon style={{ color: "#1877F2" }} /> Revert to Original
                </Typography>
              </span>
            </Grid>
          </Grid>
          <Grid className="RightBoxDev">
            <TemplateTranscript isLoading={loading} />
          </Grid>
        </div>
      </Grid>
      <AppDialogInvite
        setOpenModal={setOpenTips}
        open={openTips}
        maxWidth={"lg"}
        className="video-modal"
        customClassMain=""
        onClose={() => setOpenTips(false)}
        modelTitle={"Learn how to supercharge your video with substitutions! "}
        content={
          <div className="contentModal">
            <div className="DevSection">
              <Grid
                item
                container
                spacing={2}
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid md={4} className="p-3">
                  <AppImage
                    name={"highlight-text.png"}
                    width={"222"}
                    height={"198"}
                  />
                  <p
                    style={{
                      maxWidth: "280px",
                      marginTop: "20px",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    From the transcript of the video you recorded, highlight the
                    words that you’d like to replace. A popup will appear,
                    allowing you to type in the words you’d like to put in place
                    of your selection.
                  </p>
                </Grid>
                <Grid md={4} className="p-3">
                  <AppImage
                    name={"transcript-gen-2-static.png"}
                    width={"222"}
                    height={"198"}
                  />
                  <p
                    style={{
                      maxWidth: "280px",
                      marginTop: "20px",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Type @ to insert a variable, this will allow you to
                    personalize your video so that the variable text is
                    different for each video. Make sure to click “Create new
                    variable” if you want to insert a new variable that doesn’t
                    exist yet.
                  </p>
                </Grid>
                <Grid md={4} className="p-3">
                  <AppImage
                    name={"transcript-gen-3-dynamic.png"}
                    width={"222"}
                    height={"198"}
                  />
                  <p
                    style={{
                      maxWidth: "280px",
                      marginTop: "20px",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    Any words you type that are not variables will be the same
                    for every video. In this case{" "}
                    <span className="varDev">first_name</span> will be
                    personalized for each video. For example, a video for
                    “Raymond” would create a video with you saying “Howdy
                    Raymond! How’s it goin?”
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
        }
      />
      <AppFooter
        userData={userData}
        onClick={onForwardClick}
        isLoading={submitting}
        disabled={isContinueDisabled() || loadingRevertToOriginal}
        title={"Continue"}
        isBack={userData?.uuid && true}
        onBack={() => history.push(isEdit ? `/campaigns-list` : `/script-recording/${campaignId}`)}
        progress={85}
        invite={true}
        step={"template"}
      />
    </>
  );
};

export default (props) => (
  <SubstitutionProvider campaignId={props?.match?.params?.campaignId}>
    <AvatarVideoConfigPage campaignId={props?.match?.params?.campaignId} />
  </SubstitutionProvider>
);
