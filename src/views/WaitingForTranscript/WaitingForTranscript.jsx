import React, { useEffect, useState } from "react";
import { getTranscript } from "../../service/api/substitution.service";
import {
  StorageService,
  StorageKeys,
} from "./../../service/core/storage.service";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AppFooter from "../../components/app-frame/app-footer/app-footer";
import { useHistory, useParams } from "react-router-dom";
import DismissModal from "../../components/v2/modals/DismissModal/DismissModal.component";
import './waiting-for-transcript.scss';
import { AppImage } from '../../components/$widgets/images/app-image';

const POLLING_TIMEOUT = 30000

const images = [
  {
    src: "highlight-text.png",
    title:"Highlight text",
    text: "From the transcript of the video you recorded, highlight the words that you’d like to replace. A popup will appear, allowing you to type in the words you’d like to put in place of your selection.  ",
  },
  {
    src: "transcript-gen-2-static.png",
    title:"Create variables",
    text: `Type @ to insert a dynamic variable. This will allow you to personalize your video so that the variable text is different for each video. Make sure to click “Create new variable” if you want to insert a new variable that doesn’t exist yet.`,
  },
  
  {
    src: "transcript-gen-3-dynamic.png",
    title:"Confirm your transcript",
    text:["Any words you type that are not variables will be the same for every video. In this case ",<span className="varDev"> first_name </span>,  " will be personalized for each video. For example, a video for “Raymond” would create a video with you saying “Howdy Raymond! How’s it goin?” "],
  },
];

const useStyles = makeStyles({
  images: {
    maxHeight: "280px",
    width: "auto",
    margin: "auto",
  },
  imageContainer: {
    maxWidth: "310px",
  },
});

const WaitingForTranscript = () => {
  const [isTranscriptError, setIsTranscriptError] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  //const [campaignId, setCampaignId] = useState(null);
  const [pollTimeout, setPollTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex , setActiveIndex] = useState(0);
  
  const pollForTranscript = async (endTime) => {
    if (Number(new Date()) > endTime) {
      setIsLoading(false);
      setIsTranscriptError(true);
      clearTimeout(pollTimeout)
      return;
    }
    try {
      const { success, transcriptError } = await getTranscript(params?.campaignId);
      if (success === true && transcriptError === undefined) {
        setIsLoading(false)
      }
      if (success === true && transcriptError === true) {
        setIsLoading(false)
        setIsTranscriptError(true);
      }
      if (success === false) {
        const timeout = setTimeout(() => pollForTranscript(endTime, params?.campaignId), 3000);
        setPollTimeout(timeout);
      }
    } catch (error) {
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
    }
  };

  const onForwardClick = () => {
   if (activeIndex >= 2) 
   {
    history.push(`/template/${params?.campaignId}`);
   }
   else {
   let Index = activeIndex +1
   setActiveIndex(Index)
   }
  };

  useEffect(() => {
    (async () => {
      if(params?.campaignId){
        const endTime = Number(new Date()) + POLLING_TIMEOUT
        pollForTranscript(endTime);
        return () => {
          if (pollTimeout) {
            clearTimeout(pollTimeout);
          }
        };
      }
    })();
  }, []);

  return (
    <>
    <div className="transcript-box-main">
      <Container>
        <Grid container>
          <Grid item md={12} className="transcript-title">
            <h3> Your transcript is being generated.</h3>
            <h5>Learn how to create substitutions while you wait.</h5>
          </Grid>
          <div className="box-dev d-flex flex-column align-items-center justify-content-center ">
          <Grid
            item
            container
          >
            {images.map((varImgs, idx) => (
              <Grid item md={4} sm={12} key={`varImgs-${idx}`}>
                <div className={`box-item ${idx == activeIndex ? "active" : "inactive"}`}>
                  <AppImage name={varImgs.src} />
                  <div className="number-box">{idx +1}</div>
                  <h4>{varImgs.title}</h4>
                    <p>
                      {varImgs.text}
                    </p>
                </div>
               
              </Grid>
            ))}
          </Grid>
            </div>
        </Grid>
        <DismissModal
          open={isTranscriptError}
          title={"Whoops, there was an error processing your transcript"}
          content={
            "Please attempt to rerecord and ensure that audio is being detected"
          }
        />
      </Container>
    </div>
      <AppFooter
        onClick={onForwardClick}
        title={"Continue"}
        disabled={isTranscriptError}
        isLoading={isLoading}
        progress={45}
        invite={true}
        onBack={()=>history.push(`/script-recording/${params?.campaignId}`)}
        isBack={true}
        step={"script-recording"}
      />
    </>
  );
};

export default WaitingForTranscript;
