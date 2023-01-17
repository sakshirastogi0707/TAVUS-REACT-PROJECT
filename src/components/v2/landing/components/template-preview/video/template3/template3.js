import React, {useState } from "react";
import "./template3.scss";
import BasicButtons from "../../../../../../$widgets/buttons/basic-buttons";
import { useSelector } from "react-redux";
import CalendlyModal from "../../calendlyModal";
import  {VideoPlayer}  from "../../videojs/video";
import { getVariableAndReplaceByValue } from "../../../../../../../utils/utils";

const Template3 = (props) => {
  const landingState = useSelector((s) => s.landingState);
  const template_id = landingState.template_id;
  const templatePreviewType = landingState.templatePreviewType;
  const [open, openModal] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState(null);

  const clickButon = (button,videoData) => {
    var variableValue = getVariableAndReplaceByValue(button.link,videoData)
    variableValue = variableValue.replace(/\s/g, "");
    if (button.type == "calendly_link") {
      openModal(true);
      setCalendlyLink(variableValue);
    } else {
      window.open(variableValue, "_blank");
    }
  }

  const getTitle =  (videoData='',CampaignData) =>{
    if(videoData && videoData.override_videoTitle && videoData.override_videoTitle !='' && videoData.override_videoTitle !=undefined){
      return videoData.override_videoTitle 
    }
    return getVariableAndReplaceByValue(CampaignData.heading1,videoData)
  }

  const getBody =  (videoData='',CampaignData) =>{
    if(videoData && videoData.override_body && videoData.override_body !='' && videoData.override_body !=undefined){
      return videoData.override_body 
    }
    return getVariableAndReplaceByValue(CampaignData.body,videoData)
  }

  const getSubHeading =  (videoData='',CampaignData) =>{
    if(videoData && videoData.heading2 && videoData.heading2 !='' && videoData.heading2 !=undefined){
      return videoData.heading2 
    }
    return getVariableAndReplaceByValue(CampaignData.heading2,videoData)
  }

  const getText = (videoData='',CampaignData,button) => {
    return getVariableAndReplaceByValue(CampaignData.CTA[button].text,videoData)
  }

  return (
    <div
      className={
        templatePreviewType == "web"
          ? "landing-pageThreeDesktop "
          : "landing-pageThreeMobile "
      }
      style={{ backgroundColor:  props?.requestData?.campaign?.landing_json?.color1 }}
    >
      
      <div className="mainBox">
      <div>
        <div
          className="landing-logo "
          style={{
            alignItems: "center",
            display: "flex",
            backgroundColor: props?.requestData?.campaign?.landing_json?.color2,
          }}
        >
          <img src={props?.requestData?.campaign?.landing_json?.logo } alt="TAVUS" />
        </div>

        <div className="d-flex justify-content-center">
          <div className="BoxDev">
            <div className="boxTop">
              <div className="templateImg">
              {props.requestData ? 
                  <VideoPlayer videoData={props.requestData} />
                  :
                  null
              }
              </div>
            </div>
            <div className="boxBottom text-center">
              <div className="templateText">
                <h2
                  className="templateTitle"
                  style={{color: props?.requestData?.campaign?.landing_json?.color5 }}
                >
                  {
                    getTitle(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json)
                  }  
                </h2>
                <p
                  style={{ color: props?.requestData?.campaign?.landing_json?.color5}}
                  className="templatePTitle"
                >
                  {
                    getBody(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json)
                  }
                </p>
                <h4
                  className="templateSubTitle"
                  style={{color: props?.requestData?.campaign?.landing_json?.color5}}
                >
                  {
                    getSubHeading(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json)
                  }
                </h4>
              </div>
            
                <div className="templateBtn d-flex justify-content-md-center">
                {props?.requestData?.campaign?.landing_json?.CTA?.button1 && 
                    <BasicButtons title={getText(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json, 'button1')}
                    backgroundColor={props?.requestData?.campaign?.landing_json?.color3} 
                    onClick={(e) => clickButon(props?.requestData?.campaign?.landing_json?.CTA?.button1,props?.requestData?.input_data_json)}/>
                  }

                  {props?.requestData?.campaign?.landing_json?.CTA?.button2 && 
                    <BasicButtons title={getText(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json, 'button2')}  
                    backgroundColor={props?.requestData?.campaign?.landing_json?.color4}
                    onClick={(e) => clickButon(props?.requestData?.campaign?.landing_json?.CTA?.button2,props?.requestData?.input_data_json)} />
                  }

                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <CalendlyModal
        open={open}
        openModal={openModal}
        calendlyLink={calendlyLink}
      />
    </div>
  );
};

export default Template3;
