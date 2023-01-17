import React, { useEffect, useState } from "react";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import "./your-first-video.scss";
import shortUUID from "short-uuid";
import InputLabel from "@mui/material/InputLabel";
import { AppImage } from "../../../$widgets/images/app-image";
import OutlinedInputCustom from "../../../$widgets/input-fields/outlined-input";
import { CampaignService } from "../../../../service/api/campaign.service";
import { VideoService } from "../../../../service/api/video.service";
import {
  StorageService,
  StorageKeys,
} from "../../../../service/core/storage.service";
import { UserService } from "../../../../service/api/user-service";
import { CircularProgress, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import { urls } from "../../../../config/urlConfig";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import _, { set } from "lodash";
import PreviewTranscript from "../preview-transcript/PreviewTranscript.component";
import { SubstitutionProvider } from "../../../substitution/context/Substitution.context";
import { SegmentService } from "../../../../service/api/segment.service";
import AuthService from "../../../../service/core/auth.service";
import {useLocation, useParams, useHistory} from 'react-router-dom'
import Utils from "../../../../service/core/utils";
import Loader from "../../../$widgets/loader/loader"

const FirstVideo = (props) => {
  const [checked, setChecked] = useState(false);
  const [variables, setVaiable] = useState([]);
  const [allVariables, setAllVariables] = useState([]);
  const [campaignData, setCampaign] = useState({});
  const [data, setFormData] = useState({});
  const [custom_pronunciation, setCustomPronunciation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVideo, setIsVideo] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState({
    uploaded_url: "",
    background_url: "",
    uploaded_url_key: "",
    uploadedVideoName: "",
  });
  const [loading, setLoading] = useState(false);
  const [createVideo, setCreate] = useState(false);
  const [placeholderText, setPlaceholder] = useState(null);
  const [allVariableWithColor, setAllVariableWithColor] = useState([]);
  const [pronunciationAudio, setPunctuationAudio] = useState({});
  const [playingVariable, setPlayingVariable] = useState("");
  const [audio, setAudio] = useState(null);
  const [playingIndex, setIndex] = useState(null);
  const [userData, setUserData] = useState();
  const location = useLocation();
  const [campaignId, setCampaignId] = useState(null);
  const [editCampaignId, setEditCampaignId] = useState(null);
  const [errorString, setErrorString] = useState("");
  const [vidoeVariables, setVideoVaiable] = useState([]);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    getUserData();
    if(params?.campaignId && !params?.requestId){
      setCampaignId(params?.campaignId)
      getVariablesData(params?.campaignId);
    } else if(params?.requestId && params?.campaignId){
      setEditId(params?.requestId);
      getVideos(params?.requestId);
    }
    if (location.pathname.includes("/create-video") || location.pathname.includes("/edit-video")) {
      setCreate(true);
    }
  }, []);

  const getUserData = async ()=>{
    const userData = await AuthService.userData();
    let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
    if(!isValid){
        if(userData?.campaign_count>1){
            history.push(`/campaigns-list`)
        } else {
            history.push(`/dashboard`)
        }
    }
    setUserData(userData)
  }

  const getVideos = async (video_id) => {
    const response = await VideoService.getVideos(video_id);
    if (response.status) {
      if (response.data.input_data_json?.background_source_url) {
        let url = response.data.input_data_json?.background_source_url;
        let splitUrl = url.split("background-uploads/");
        if (splitUrl.length > 0) {
          setUploadedVideo({
            uploaded_url: url,
            background_url: url,
            uploaded_url_key: splitUrl[1],
            uploadedVideoName: splitUrl[1],
          });
        }
       
        setChecked(true);
      }
      if (response.data.campaign.id) {
        await getVariablesData(response.data.campaign.id);
        setEditCampaignId(response.data.campaign.id);
        setCampaignId(response.data.campaign.id)
      }
      setFormData(response.data.input_data_json);
      if(params?.requestId && params?.campaignId){
        let variablesData = [];
        Object.keys(response.data.input_data_json).forEach(function(key, index) {
            if (key != "background_url" && key !=  "background_source_url" && key !="override_heading1") {
              variablesData.push(key);
            }
        });
        setVaiable(variablesData)
      }
      if(response?.data?.pronunciation_json){
        setCustomPronunciation(response.data.pronunciation_json);
      }
    }
  };


  useEffect(() => {}, [data]);

  const getVariablesData = async (id) => {
    const response = await CampaignService.getVariables(id);
    if (response) {
      try {
        let objData = {};
        let variablesData = [];
        let allVariablesData = [];
        for (let i = 0; i < response.length; i++) {
          if (response[i].name != "background_url" || response[i].name != "background_source_url") {
            variablesData.push(response[i].name);
          }
          objData[response[i]?.name] = "";
          allVariablesData.push(response[i].name);
        }
        setFormData(objData);
        if(!params?.requestId && params?.campaignId){
          setVaiable(variablesData);
        }
        if (allVariablesData.includes("background_url")) {
          setIsVideo(true);
        }
        setAllVariableWithColor(response);
        setAllVariables(allVariablesData);
        await getCampaignById(id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCampaignById = async (id) => {
    const response = await CampaignService.getSingleCampaign(id);
    if (response) {
      try {
        setCampaign(response);
        if (response?.heading1) {
          let splitPlaceholder = response.heading1.split(" ");
          let placeholderText = "";
          for (let i = 0; i < splitPlaceholder.length; i++) {
            if (splitPlaceholder[i].includes("@")) {
              let trimText = splitPlaceholder[i].split("|");
              placeholderText += ` ${trimText[0]}`;
            } else {
              placeholderText += ` ${splitPlaceholder[i]}`;
            }
          }
          if (placeholderText) {
            setPlaceholder(placeholderText);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  function handleChangeData(event) {
    const { name, value } = event.target;
    const audioObj = { ...pronunciationAudio };
    audioObj[name] = "";
    const newObj = { ...data };
    newObj[name] = value;
    setFormData(newObj);
    setPunctuationAudio(audioObj);

  }

  function handleChangePunctuation(event) {
    const { name, value } = event.target;
    const newObj = { ...custom_pronunciation };
    const audioObj = { ...pronunciationAudio };
    audioObj[name] = "";
    newObj[name] = value;
    setCustomPronunciation(newObj);
    setPunctuationAudio(audioObj);
  }

  function validateForm() {
    const errors = {};
    if (data && Object.keys(data).length !== 0) {
      Object.keys(data).map(function (key, index) {
        if (key == "background_url" || key == "background_source_url") {
          let testBackgroundUrl = Utils.urlValidation(data[key])
          if(!testBackgroundUrl){
            errors[key] = `Please enter a valid ${[key]} URL`;
          } else {
            data[key] = testBackgroundUrl
          }
        }
        if (data[key].toLocaleLowerCase().trim() == "") {
          errors[key] = `Please enter a valid ${[key]}`;
        }
      });
    }
    setErrors(errors);
    return _.isEmpty(errors);
  }

  async function submit() {
    let isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      let user = await UserService.getUserProfile()
      let objData = {
        requested_by: user.id,
        campaign_id: campaignId,
        data: data,
        custom_pronunciation: custom_pronunciation,
      };
      const overrideTitleAdded = objData?.data?.override_heading1;
      if(location.pathname == "/first-video"&&userData.is_first_campaign===true){
        SegmentService.analyticsTrack("One Off Completed", {
          location: "onboarding",
          overrideTitleAdded: overrideTitleAdded?true: false,
          homedynamicBackground: objData.data.background_url,
          pronunciationAdded: Object.keys(custom_pronunciation).length,
          
        });
      }
      else if(location.pathname == "/first-video" && userData.is_first_campaign===false){
        SegmentService.analyticsTrack("One Off Completed", {
          location: "additional campaign",
          overrideTitleAdded: overrideTitleAdded?true: false,
          homedynamicBackground: objData.data.background_url,
          pronunciationAdded: Object.keys(custom_pronunciation).length,
          
        });
      }else if(location.pathname == "/create-video"){
        SegmentService.analyticsTrack("One Off Completed", {
          location: "Dashbord",
          overrideTitleAdded: overrideTitleAdded?true: false,
          homedynamicBackground: objData.data.background_url,
          pronunciationAdded: Object.keys(custom_pronunciation).length,
          
        });
      }
      
      let response = {};
      if (editId) {
        response = await VideoService.updateVideo(objData, editId);
      } else {
        response = await VideoService.saveVideo(objData);
      }
      if (response.status) {
        try {
          const userSteps = await UserService.getUserProfile();
          if (userSteps.steps) {
            let steps = userSteps.steps;
            steps.first_video = true;
            const result = await UserService.userSteps(steps);
          }
          setIsLoading(false);
            if (editId) {
              toast.success("Your video is regenerating");
            } else {
              toast.success("Your video is generating");
            }
            history.push("/dashboard");
        } catch (e) {
          setLoading(false);
          toast.error(e);
          console.log("campaign not saved", e);
          return false;
        }
      }
    }
  }

  const bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1000, i), 2) + " " + sizes[i];
  };

  const uploadVideo = async (event) => {
    if (event.target.files.length > 0) {
      let size = bytesToSize(event.target.files[0].size);
      let flag = true;
      if (size.includes("GB", "TB")) {
        flag = false;
      } else if (size.includes("MB")) {
        size = size.replace(/\D/g, "");
        if (size > 100) {
          flag = false;
          setUploadedVideo({
            uploaded_url: "",
            background_url: "",
            uploaded_url_key: "",
            uploadedVideoName: "",
          });
        }
      }
      if (flag == false){ 
        alert(`File should not be greater than 100 mb.`);
      }
      if (
        event.target.files[0].type == "video/mp4" ||
        event.target.files[0].type == "video/quicktime" ||
        event.target.files[0].type == "video/webm"
      ) {
        const newObj = { ...uploadedVideo };
        setLoading(true);
        newObj["uploadedVideoName"] = event.target.files[0].name;

        let formData = new FormData(); //formdata object
        formData.append("video", event.target.files[0]); //append the values with key, value pair
        const response = await VideoService.uploadVideos(formData);
        if (response.status) {
          newObj["uploaded_url"] = response.data.Location;
          newObj["background_url"] = response.data.Location;
          newObj["uploaded_url_key"] = response.data.key;
          let dataObj = { ...data };
          dataObj["background_source_url"] = response.data.Location;
          setFormData(dataObj);
        } else {
          alert(response.message);
        }
        setUploadedVideo(newObj);
        setLoading(false);
      } else {
        setLoading(false);
        alert(
          `Oops!  It looks like you are trying to upload a ${event.target.files[0].type} file. Supported Files: .webm, .mp4, .mov`
        );
      }
    }
  };

  const setVideoPrefrence = (choice) => {
    const newObj = { ...data };
    if (choice && allVariables.includes("background_url")) {
      delete newObj.background_url;
      newObj["background_source_url"] = "";
    } else if (!choice && allVariables.includes("background_url")) {
      delete newObj.background_source_url;
      newObj["background_url"] = "";
    }
    setFormData(newObj);
    setChecked(choice);
  };

  const getColor = (name) => {
    let color = "";
    Object.keys(allVariableWithColor).map(function (key, index) {
      if (allVariableWithColor[key]?.name == name) {
        color = allVariableWithColor[key]?.color;
      }
    });
    return color;
  };

  const playVariable = (mp3, name, index) => {
    var audioUrl = new Audio(mp3);
    if (playingVariable) {
      audioUrl.pause();
      setPlayingVariable("");
    }
    audioUrl.play();
    setAudio(mp3);
    setPlayingVariable(name);
    audioUrl.onended = function () {
      setPlayingVariable("");
      setAudio("");
    };
    return true;
  };

  const playAudio = async (val, index) => {

    let pronunciationText = {};
    if (!custom_pronunciation[val] && data[val]) {
      pronunciationText = data;
    } else if (custom_pronunciation[val] && !data[val]) {
      pronunciationText = custom_pronunciation;
    } else if (custom_pronunciation[val] && data[val]) {
      pronunciationText = custom_pronunciation;
    }
     else if (!custom_pronunciation[val] && !data[val]) {
      setErrorString("Please enter pronunciation.");
      return false;
    }

    if (
      !pronunciationText[val] ||
      pronunciationText[val] == "" ||
      pronunciationText[val] == undefined ||
      (pronunciationText[val] && !pronunciationText[val]?.trim())
    ) {
      setErrorString("Please enter pronunciation.");
      return false;
    }
    let value = pronunciationText[val];
    SegmentService.analyticsTrack("Sample Audio Requested", {
      variable: val,
      word: value,
      location: "one off",
    });
    const newObj = { ...pronunciationAudio };
    var previewData = {
      input_text: value,
      campaign_id: campaignId,
    };
    if (playingVariable || !value.trim()) {
      var audioUrl = new Audio(audio);
      audioUrl.pause();
      setPlayingVariable("");
      return;
    }
    if (newObj[val]) {
      playVariable(newObj[val], val);
    } else {
      setIndex(index);
      await axios
        .post(`${urls.variablePreview}`, previewData)
        .then((result) => {
          if (result == undefined) {
            return false;
          }
          if (result.data.status && result.data.data.final_audio_url) {
            newObj[val] = result.data.data.final_audio_url;
            setIndex(null);
            playVariable(result.data.data.final_audio_url, val);
          } else {
            toast.warning("Not getting any responce from preview api.");
          }
          setPunctuationAudio(newObj);
        })
        .catch((err) => {
          console.log(err, "err");
          toast.warning("Not getting any responce from preview api.");
        });
    }
  };

  const closeAlert = () => {
    setErrorString("");
  };
  if (
    window.location.search.split("?").length > 1 &&
    (editCampaignId === null ||
      editCampaignId != campaignId)
  ) {
    return (
      <div className="first-video-main" style={{ height: "90vh" }}>
        <HeaderLanding />
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <CircularProgress />
        </div>
      </div>
    );
  }
  return (
    campaignId && <SubstitutionProvider campaignId={campaignId}>
      <div className="first-video-main">
        <HeaderLanding userData={userData}/>
        <div className="frame-box d-flex flex-column justify-content-center align-items-center">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className={"video-title text-center"}>
                {createVideo && campaignData?.campaign_name ? (
                  <h3>Creating video for {campaignData?.campaign_name}</h3>
                ) : (
                  <h3>Great, let’s get your first video</h3>
                )}
              </div>
            </Grid>
          </Grid>
          <div className="script-box d-flex">
            <div className="creating-video-box ">
              <div className="creating-video">
                <div className="videoInput">
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Override video title
                  </InputLabel>
                  <OutlinedInputCustom
                    onChange={handleChangeData}
                    value={data.override_heading1}
                    name="override_heading1"
                    placeholder={placeholderText && placeholderText}
                  />
                </div>
                {isVideo && (
                  <>
                    <div className={"switchBtn text-left position-relative"}>
                      <div className="switch-field">
                        <input
                          type="radio"
                          checked={checked == true}
                          onClick={() => setVideoPrefrence(true)}
                          id="radio-one"
                          name="switch-one"
                        />
                        <label for="radio-one">Upload Background</label>
                        <input
                          type="radio"
                          checked={checked == false}
                          onClick={() => setVideoPrefrence(false)}
                          id="radio-two"
                          name="switch-one"
                        />
                        <label for="radio-two">Background URL</label>
                      </div>
                    </div>

                    {!checked ? (
                      <>
                        <div className="videoInput">
                          <label>Background video URL</label>
                          <OutlinedInputCustom
                            value={data.background_url}
                            onChange={handleChangeData}
                            name={"background_url"}
                            placeholder="http://www.apple.com"
                          />
                          {errors["background_url"] && (
                            <span className="error">
                              {errors["background_url"]}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="upload-main">
                        <div className="uploadLogo justify-content-center">
                          {uploadedVideo.uploaded_url ? (
                            <div className="position-relative close-video mt-3">
                              <label className="position-relative closeButton">
                                <AppImage
                                  name={"XMLID.svg"}
                                  className="cursor-pointer"
                                />
                                <span className="cross_icon_vid">
                                  <AppImage
                                    name={"cross_icon.svg"}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      setUploadedVideo({
                                        uploaded_url: "",
                                        background_url: "",
                                        uploaded_url_key: "",
                                        uploadedVideoName: "",
                                      })
                                    }
                                  />
                                </span>
                              </label>
                              <label>{uploadedVideo.uploadedVideoName}</label>
                            </div>
                          ) : (
                            <>
                            {loading ? (
                               <Loader />
                             ) : (
                            <div className="uploadSvg text-center">
                              <label
                                htmlFor="icon-button-file"
                                className="upload-button"
                              >
                                <AppImage
                                  name={"cloud-upload.svg"}
                                  width="43"
                                  className="cursor-pointer"
                                />
                              </label>
                              <h3>Upload Video</h3>
                              <p>
                                Drag in a video file or click to choose a file
                                <br />
                                Supported Files: .webm, .mp4, .mov
                              </p>
                              <form>
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={uploadVideo}
                                />
                              </form>
                              {errors["background_source_url"] && (
                                <span className="error">
                                  {errors["background_source_url"]}
                                </span>
                              )}
                            </div>
                             )}
                          </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="variableDev ">
                  <label>Video variables</label>
                  {variables && variables.length > 0 && variables.map((value, key) => {
                      return (
                        value!='background_url' &&
                        <div
                          key={key}
                          className="position-relative d-flex justify-content-start"
                        >
                          <div className="variableDevBox align-self">
                            <div
                              className="variable-box"
                              style={{
                                backgroundColor: "rgba(24, 242, 164, 0.1)",
                              }}
                            >
                              <span style={{ color: getColor(value) }}>
                                @{value}
                              </span>
                            </div>
                          </div>
                          <div className="variableInputBox d-flex justify-content-between">
                            <div className="boxDev d-flex justify-content-between">
                              <div className="variableInput ">
                                <OutlinedInputCustom
                                  name={value}
                                  value={data[value]}
                                  onChange={handleChangeData}
                                  placeholder={`Type ${value}`}
                                />
                                {errors[value] && (
                                  <span className="error">{errors[value]}</span>
                                )}
                              </div>
                              <div className="variableInput ">
                                <OutlinedInputCustom
                                  name={value}
                                  value={custom_pronunciation[value]}
                                  onChange={handleChangePunctuation}
                                  placeholder="Pronunciation (Optional)"
                                />
                              </div>
                            </div>
                            <div
                              className="align-self playSec"
                              onClick={() => playAudio(value, key)}
                            >
                              {playingIndex == key ? (
                                <div className="">
                                  <AppImage
                                    name={"loader-anim.png"}
                                    className="rotate"
                                    width="20"
                                  />
                                </div>
                              ) : playingVariable == value ? (
                                <AppImage
                                  name={"pause1.svg"}
                                  className="cursor-pointer"
                                  width="14"
                                />
                              ) : pronunciationAudio[value] ? (
                                <AppImage
                                  name={"retry_icon.svg"}
                                  className="cursor-pointer"
                                  width="16"
                                />
                              ) : (
                                <AppImage
                                  name={"sound.svg"}
                                  className="cursor-pointer"
                                  width="21"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* <div className="variableDev ">
                  <label>Video variables</label>
                  {variables &&
                    variables.length > 0 &&
                    variables.map((value, key) => {
                      return (
                        <div
                          key={key}
                          className="position-relative d-flex justify-content-start"
                        >
                          <div className="variableDevBox align-self">
                            <div
                              className="variable-box"
                              style={{
                                backgroundColor: "rgba(24, 242, 164, 0.1)",
                              }}
                            >
                              <span style={{ color: getColor(value) }}>
                                @{value}
                              </span>
                            </div>
                          </div>
                          <div className="variableInputBox d-flex justify-content-between">
                            <div className="boxDev d-flex justify-content-between">
                              <div className="variableInput ">
                                <OutlinedInputCustom
                                  name={value}
                                  value={data[value]}
                                  onChange={handleChangeData}
                                  placeholder={`Type ${value}`}
                                />
                                {errors[value] && (
                                  <span className="error">{errors[value]}</span>
                                )}
                              </div>
                              <div className="variableInput ">
                                <OutlinedInputCustom
                                  name={value}
                                  onChange={handleChangePunctuation}
                                  placeholder="Pronunciation (Optional)"
                                />
                              </div>
                            </div>
                            <div
                              className="align-self playSec"
                              onClick={() => playAudio(value, key)}
                            >
                              {playingIndex == key ? (
                                <div className="">
                                  <AppImage
                                    name={"loader-anim.png"}
                                    className="rotate"
                                    width="20"
                                  />
                                </div>
                              ) : playingVariable == value ? (
                                <AppImage
                                  name={"pause1.svg"}
                                  className="cursor-pointer"
                                  width="14"
                                />
                              ) : pronunciationAudio[value] ? (
                                <AppImage
                                  name={"retry_icon.svg"}
                                  className="cursor-pointer"
                                  width="16"
                                />
                              ) : (
                                <AppImage
                                  name={"sound.svg"}
                                  className="cursor-pointer"
                                  width="21"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div> */}
              </div>
            </div>
            <div className="devBoxRight">
              <div className="devBoxRightTop">
                <div className="topTitle">
                  <h3>Preview transcript</h3>
                </div>
                <div className="variablecont">
                  <PreviewTranscript />
                </div>
              </div>
            </div>
            {errorString && errorString != "" && (
              <div className="interaction">
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error" onClose={() => closeAlert()}>
                    {errorString}
                  </Alert>
                </Stack>
              </div>
            )}
          </div>
          <AppFooter
            userData={userData}
            onClick={() => submit()}
            isLoading={isLoading}
            onBack={() =>
              createVideo
                ? history.push("/dashboard")
                : history.push(`/set-variable/${params?.campaignId}`)
            }
            isBack={userData?.uuid && true}
            title={"Generate video"}
            invite={createVideo ? false : true}
            step={"first-video"}
          />
        </div>
      </div>
    </SubstitutionProvider>
  );
};

export default FirstVideo;
