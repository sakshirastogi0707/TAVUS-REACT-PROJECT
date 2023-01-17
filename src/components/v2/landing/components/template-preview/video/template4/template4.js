import React, {useEffect, useState, useCallback} from 'react';
import './template4.scss';
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import { InlineWidget } from "react-calendly";
import  {VideoPlayer}  from "../../videojs/video";
import { getVariableAndReplaceByValue } from "../../../../../../../utils/utils";

const Template4 = (props) => {

    const landingState = useSelector(s => s.landingState)
    const templatePreviewType = landingState.templatePreviewType;

    useEffect(() => {
    }, [props])

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

    return (
        <div className={templatePreviewType == 'web' ? 'landing-page-fore-desktop' : 'landing-page-fore-mobile'}
            style={{backgroundColor: props?.requestData?.campaign?.landing_json?.color1  }}
            >
            <div className='mainBox'>
                <Grid container >
                    <Grid item xs={12}>
                        <div className='landing-logo'
                            style={{backgroundColor: props?.requestData?.campaign?.landing_json?.color2}}
                            >
                            <div className='LogoImg'>
                                <img src={props?.requestData?.campaign?.landing_json?.logo } alt="TAVUS"/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className="mainDevBox">
                        <div className='boxLeft'>
                            <div className='templateImg'>
                               
                                {props.requestData ? 
                                    <VideoPlayer videoData={props.requestData} />
                                    :
                                    null
                                }
                                 
                            </div>
                        </div>
                        <div className="boxRight">
                            <InlineWidget url={
                                props?.requestData?.campaign?.landing_json?.CTA?.button1?.link
                               } />
                           
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='templateText'>
                           <h2 className='templateTitle'
                                style={{color: props?.requestData?.campaign?.landing_json?.color5}}
                                >
                                {
                                    getTitle(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json)
                                }
                            </h2>
                            <p className='templatePTitle'
                            style={{color: props?.requestData?.campaign?.landing_json?.color5}}
                            >
                                {
                                    getBody(props?.requestData?.input_data_json, props?.requestData?.campaign?.landing_json)
                                }
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Template4;
