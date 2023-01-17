import React, { useEffect, useState } from "react";
import "./voiceTraining.scss";
import AppFooter from "../../app-frame/app-footer/app-footer";
import { UserService } from "../../../service/api/user-service";
import {
  StorageKeys,
  StorageService,
} from "../../../service/core/storage.service";
import AdminService from "../../../service/api/admin.service";
import { UserDevicesProvider ,useUserDevices} from "../recording/context/UserDevices.context";
import Recording from "./recording/recording";
import { SegmentService } from "../../../service/api/segment.service";
import { CampaignService } from "../../../service/api/campaign.service";
import Access from "./access/access";
import { useParams, useHistory } from "react-router-dom";



const VoiceTraining = (props) => {
  const recordAnother = React.useRef(null);
  const resetWebCam = React.useRef(null);
  const [allowedAccess, setAccess] = useState(true);
  const [step, setStep] = useState(1);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedAudio, setDefaultAudio] = useState([]);
  const [selectedVideo, setDefaultVideo] = useState([]);
  const [paragraphs, createParagraph] = useState([]);
  const [voiceData, setVoiceData] = useState(null);
  const [mediaUrl, setMedia] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [videoDevice, setVideoDevice] = React.useState({});
  const [audioDevice, setAudioDevice] = React.useState({});
  const [videoTrainingData, setVideoTrainingData] = React.useState([]);
  const [videoStep, setVideoStep] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [userDetail, setUserDetail] = React.useState({});
  const [campaignId, setCampaignId] = useState(null);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let isValid = await CampaignService.validateUserCampaignAccess(
        params?.campaignId
      );
      if (params?.campaignId) {
        setCampaignId(params?.campaignId);
        await getParagraphs(params?.campaignId);
      }
      await AdminService.userDetails()
        .then(async (response) => {
          if (response?.data) {
            if (!isValid) {
              if (response?.data?.campaign_count > 1) {
                history.push(`/campaigns-list`);
              } else {
                history.push(`/dashboard`);
              }
            }
            setUserDetail(response?.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    })();
  }, []);

  const next = async () => {
    if (step == 1) {
      SegmentService.analyticsTrack('Audio and Video Configured',{audioInput:audioDevice,videoInput:videoDevice})
      SegmentService.analyticsTrack("Training Started", {});

      setStep(2);
    } else if (step == 2) {
      let countPage = videoStep ? videoStep - 1 : paragraphCount;
      if (countPage <= 2) {
        setLoading(true);
        if (!(mediaUrl instanceof Blob)) {
          if (videoTrainingData.length > 0 && videoStep && videoStep < 3) {
            setLoading(false);
            resetWebCam.current();
            return setVideoStep(videoStep + 1);
          } else if (videoStep > 2) {
            return history.push(`/script-recording/${campaignId}`);
          }
        }
        let formData = new FormData(); //formdata object
        let recordingFile = new File(
          [mediaUrl],
          `${Math.floor(Date.now() / 1000)}.mp4`
        );
        formData.append("video", recordingFile); //append the values with key, value pair
        formData.append("step", countPage + 1);
        formData.append("campaign_id", campaignId);
        formData.append("name", StorageService.getLocalData("voiceName"));

        if (countPage > 1) {
          await SegmentService.analyticsTrack("3rd Training Completed", {});
        }
        UserService.uploadVoices(formData)
          .then(async (response) => {
            let count = countPage + 1;
            if (response) {
              if (countPage < 2) {
                resetWebCam.current();
                setMedia();
                setParagraphCount(count);
                if (countPage == 0) {
                  SegmentService.analyticsTrack("1st Training Completed", {});
                } else if (countPage == 1) {
                  SegmentService.analyticsTrack("2nd Training Completed", {});
                }
              } else {
                await updateUsersSteps();
                if (userDetail.is_mic_available) {
                  history.push(`/script-recording/${campaignId}`);
                } else {
                  history.push(`/script-recording/${campaignId}`);
                }
              }
              if (videoTrainingData.length > 0 && videoStep && videoStep < 3) {
                setVideoStep(videoStep + 1);
              }
              await getTrainings(countPage + 2, campaignId);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setLoading(false);
          });
      }
    }
  };

  const updateUsersSteps = async () => {
    try {
      const userSteps = await UserService.getUserProfile();
      if (userSteps.steps) {
        let steps = userSteps.steps;
        steps.training = true;
        const result = await UserService.userSteps(steps);
        return result;
      }
    } catch (e) {
      console.log("campaign not saved", e);
      return false;
    }
  };

  // get paragraph script
  const getParagraphs = (id) => {
    UserService.paragraphs()
      .then(async (response) => {
        if (response.status) {
          createParagraph(response.data);
          await getTrainings(null, id);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // get user training according to campaign
  const getTrainings = async (step = null, id = null) => {
    UserService.getTraining(id)
      .then(async (response) => {
        if (response && response.data.training_data_json) {
          let videoJson = response.data.training_data_json;
          let videoData = [];
          if (videoJson.video1) {
            videoData.push(videoJson.video1);
          }
          if (videoJson.video2) {
            videoData.push(videoJson.video2);
          }
          if (videoJson.video3) {
            videoData.push(videoJson.video3);
          }
          if (videoData.length > 0) {
            setStep(2);
            setVideoStep(
              step
                ? step
                : videoData.length == 3
                ? videoData.length
                : videoData.length + 1
            );
          }
          setVoiceData(response.data);
          setVideoTrainingData(videoData);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {}, [videoTrainingData]);

  const isDisabled = () => {
    if (step == 1) {
      if (allowedAccess) {
        return false;
      }
      return true;
    } else if (step == 2) {
      if (!mediaUrl) {
        return true;
      }
      return false;
    }
  };

  const backClick = async () => {
    if (videoTrainingData.length > 0 && videoStep && videoStep > 1) {
      setVideoStep(videoStep - 1);
    } else {
      if (userDetail.is_first_campaign) {
        if (userDetail?.is_mic_available || userDetail?.campaign_count > 1) {
          history.push(`/script/${params?.campaignId}`);
        } else {
          history.push(`/landing/${params?.campaignId}`);
        }
      } else {
        if (voiceData?.training_data_json?.audio3) {
          history.push(`/script/${params?.campaignId}`);
        } else {
          history.push(`/my-voices/${params?.campaignId}`);
        }
      }
    }
  };

  return (
    <UserDevicesProvider>
      {step == 1 && (
        <Access
          userData={userDetail}
          audioDevices={audioDevices}
          videoDevices={videoDevices}
          allowedAccess={allowedAccess}
          audioDevice={audioDevice}
          videoDevice={videoDevice}
          setAudioDevice={setAudioDevice}
          setVideoDevice={setVideoDevice}
        />
      )}
      {step == 2 && (
        <Recording
          userData={userDetail}
          audioDevices={audioDevices}
          videoDevices={videoDevices}
          paragraphCount={paragraphCount}
          setMedia={setMedia}
          mediaUrl={mediaUrl}
          paragraphs={paragraphs}
          allowedAccess={allowedAccess}
          recordAnother={recordAnother}
          resetWebCam={resetWebCam}
          selectedAudio={selectedAudio}
          selectedVideo={selectedVideo}
          user={userData}
          videoTrainingData={videoTrainingData}
          videoStep={videoStep}
        />
      )}

      <AppFooter
        userData={userDetail}
        title={step == 1 ? "Begin" : "Approve"}
        invite={true}
        isBack={userDetail?.uuid && true}
        step={"training"}
        isLoading={isLoading}
        disabled={isDisabled()}
        onClick={next}
        progress={20}
        onBack={backClick}
      />
    </UserDevicesProvider>
  );
};

export default VoiceTraining;
