import React, { useEffect, useState } from "react";
import { Script } from "../../components/v2/recording/Script/Script.component";
import ScriptRecording from "../../components/v2/recording/ScriptRecording/ScriptRecording.component";
import {  Grid } from "@mui/material";
import AppFooter from "../../components/app-frame/app-footer/app-footer";
import HeaderLanding from "../../components/app-frame/app-header-landing/app-header-landing";
import {
  StorageService,
  StorageKeys,
} from "../../service/core/storage.service";
import { ScriptService } from "../../service/api/script.service";
import { getVideoDuration } from "../../utils/utils";
import { UserService } from "../../service/api/user-service";
import { useHistory, useParams } from "react-router-dom";
import { CampaignService } from "../../service/api/campaign.service";
import { SparklesIcon } from "../../components/icons";
import { ActionTextButton } from "../../components/buttons";
import {SegmentService} from "../../service/api/segment.service"
import TipsTricks from "../../components/v2/landing/landing-frame/tips-tricks";
import './AvatarVideoRecording.scss'

export const Tips_Tricks = [
  {
    Title: "How long should my video be?  ",
    Paragraph:
      "When creating a video you should aim to make it engaging and not bore people...",
    BtnTitle: "Read More",
  },
  {
    Title: "Should I cuss in my videos?",
    Paragraph:
      "Generally, when making a personalized video you should aim to not offend someone,,,",
    BtnTitle: "Read More",
  },
  {
    Title: "What makes a script engaging?",
    Paragraph:
      "Making a dope ass script takes no time if you’re good at writing scripts...",
    BtnTitle: "Read More",
  },
  {
    Title: "What parts of a video should I personalize?",
    Paragraph:
      "Personalizing the right amount of content is key to making a video engaging... ",
    BtnTitle: "Read More",
  },
];

const AvatarVideoRecording = (props) => {
  const [script, setScript] = useState("");
  const [mediaBlob, setMediaBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tipsAndTricksOpen, setTipsAndTricksOpen] = useState(false);
  const [perviousRecordingUrl, setPerviousRecordingUrl] = useState(undefined);
  const [userData, setUserData] = useState({});

  const history = useHistory();
  const params = useParams();
  
  const onScriptChange = (scriptChange) => {
    setScript(scriptChange);
  };

  const getVideoRecordingUrl = async (campaignId) => {
    try{
      const result = await CampaignService.getScriptRecording(campaignId)
      if(result?.url){
        await setPerviousRecordingUrl(result?.url)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
      let user = await UserService.getUserProfile()
      if(!isValid){
        if(user?.campaign_count>1){
          history.push(`/campaigns-list`)
        } else {
          history.push(`/dashboard`)
        }
      }
      setUserData(user)
      if(params?.campaignId){
        loadInitialScript( params?.campaignId);
        getVideoRecordingUrl( params?.campaignId)
      }
    })();
  }, []);

  const onForwardClick = async () => {
   
    try {
   
      if(mediaBlob != null){
        await uploadVideoAndScript();
      }
      if (userData.steps) {
        let steps = userData.steps;
        steps.script_recording = true;
        const result = await UserService.userSteps(steps);
        if (result) {
          let videoLength=await StorageService.getPerm('getVideoLength')
         await SegmentService.analyticsTrack("Video Recording Completed",{"videoLength":videoLength})
        }
        history.push(`/setting-up-your-template/${params?.campaignId}`);
        return result;
      }
    } catch (e) {
      console.log("step not saved", e);
      return false;
    }
  };

  const uploadVideoAndScript = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("video", mediaBlob);
    formData.append("script", script);
    const duration = await getVideoDuration(mediaBlob);
    formData.append("duration", duration);
    formData.append("campaignId", params?.campaignId);
    try {
      await UserService.uploadVideoRecording(formData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialScript = async (campaignId) => {
    try {
      const data = await ScriptService.getScript({
        campaignId: campaignId
      });
      setScript(data.script_json.script);
    } catch (e) {
      console.log("error", e);
    }
  };

  const onBackClick = async () => {
    if(userData.campaign_count > 1){
      return history.push(`/script/${params?.campaignId}`);
    }
    history.push(`/training/${params?.campaignId}`);
  };

  return (
    <>
      <div className="video-recording-main">
      <HeaderLanding userData={userData}/>
        <div className="frame-box d-flex flex-column justify-content-center align-items-center">
          <Grid item container justifyContent="space-between" className="video-recording-box" >
              <Grid item>
                <h1 className="title">Record Video</h1>
              </Grid>
              <Grid item
              >
                  <ActionTextButton
                      styleOverwrites={{
                        padding: "14px 25px",
                        borderRadius: "8px",
                      }}
                      startIcon={<SparklesIcon />}
                      // onClick={() => setTipsAndTricksOpen(true)}
                    >
                      {`Tips & Tricks`}
                    </ActionTextButton>
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={4}
              justifyContent="space-between"
              // style={{ marginBottom: 200 }}
            >
              <Grid item style={{height: "fit-content"}}>
                <ScriptRecording setMediaBlob={setMediaBlob} perviousRecordingUrl={perviousRecordingUrl}/>
              </Grid>
              <Grid item xs className="Script-Box">
                <Script
                  isEditable={true}
                  onTextChange={onScriptChange}
                  text={script}
                />
              </Grid>
            </Grid>
          </div>
      </div>
      <AppFooter
        userData={userData}
        onClick={onForwardClick}
        disabled={(mediaBlob === null || loading) && perviousRecordingUrl === undefined }
        onBack={onBackClick}
        isBack={userData?.uuid && true}
        title={"Continue"}
        isLoading={loading}
        progress={30}
        invite={true}
        step={"script-recording"}
      />
       <TipsTricks
              title={"Tips & Tricks"}
              subTitle={""}
              data={Tips_Tricks}
              open={tipsAndTricksOpen}
              setOpenModal={setTipsAndTricksOpen}
            />
    </>
  );
};

export default AvatarVideoRecording;