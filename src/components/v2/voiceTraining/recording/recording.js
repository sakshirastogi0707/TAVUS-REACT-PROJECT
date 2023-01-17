import React, { useEffect, useState, useCallback } from "react";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import TipsTricks from "../../landing/landing-frame/tips-tricks";
import parse from "html-react-parser";
import "./recording.scss";
import "react-quill/dist/quill.snow.css";
import ScriptRecording from "../../recording/ScriptRecording/ScriptRecording.component";
import {Script} from "../../recording/Script/Script.component"
import { ActionTextButton } from "../../../buttons";
import { SparklesIcon } from "../../../icons";

const ariaLabel = { "aria-label": "description" };

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

const Recording = (props) => {
  const { paragraphs, paragraphCount, videoTrainingData, videoStep, userData} = props;
  const [openTips, setOpenTips] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentText, setCurrentText] = useState('')

  useEffect(()=>{  
    let count = 0
    if(videoStep>0){
      count = videoStep-1
      props.setMedia(videoTrainingData[videoStep-1])
    } else {
      count = paragraphCount
    }
    if(count==0){
      setCurrentText(paragraphs[count]?.replace("{{Full Name}}", userData?.first_name+' '+userData?.last_name))
    } else {
      setCurrentText(paragraphs[count])
    }
  },[paragraphCount, videoTrainingData, videoStep])

  return (
    <>
      <div className="recording-main ">
        <HeaderLanding userData={userData}/>
        <div className="frame-box d-flex flex-column justify-content-center align-items-center">
          <div className="script-box">
            {/* <div style={{marginTop: '74px'}}> */}
            <div>
            {videoTrainingData.length>0 ?
              <ScriptRecording
                resetRecordingRef={props.recordAnother}
                resetWebCamRef={props.resetWebCam}
                currentRecordingStep={videoStep}
                totalRecordingSteps={3}
                setMediaBlob={props.setMedia}
                perviousRecordingUrl={videoTrainingData[videoStep-1]}
                isTraining={true}
              />
            :
              <ScriptRecording
                resetRecordingRef={props.recordAnother}
                resetWebCamRef={props.resetWebCam}
                currentRecordingStep={props.paragraphCount + 1}
                totalRecordingSteps={3}
                setMediaBlob={props.setMedia}
                isTraining={true}
              />
            }
            </div>
            
            <div className="scriptRight">
              <div className="TipsButton d-flex justify-content-end" >
                
                <ActionTextButton
                  styleOverwrites={{
                    padding: "14px 25px",
                    borderRadius: "8px",
                  }}
                  startIcon={<SparklesIcon />}
                >
                  {`Tips & Tricks`}
                </ActionTextButton>
              </div>
              <div className="scriptBox">
               <Script isEditable={false} text={currentText} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TipsTricks
        title={"Tips & Tricks"}
        subTitle={""}
        data={Tips_Tricks}
        open={openTips}
        setOpenModal={setOpenTips}
      />
    </>
  );
};

Recording.defaultProps = {
  showParagraphCount: true,
};

export default Recording;