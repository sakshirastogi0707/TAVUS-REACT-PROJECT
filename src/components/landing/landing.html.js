import React from "react";
import './landing.scss';
import { AppImage } from "../$widgets/images/app-image";
import {ButtonGray} from "../$widgets/buttons/button-gray";
import Loader from "../$widgets/loader/loader"
import ReactPlayer from 'react-player'



export function html() {
    const {videoData,isLoading,videoJsOptions,cta_button_link,cta2_button_link} = this.state;
    const {} = this.props;
    return (
        <>{isLoading? <Loader /> :
        <div className={'landing-main container-fluid'}>
            <div className="header">
                <AppImage width="240" src={videoData?.template?.landing?.logo_url} className="cursor-pointer" />
            </div>
            <div className="main-content">
                <div className="ContentEditor text-center">
                    <h2>{videoData?.template?.landing?.landing_title}</h2>
                </div>
                <div className="VideoPlayer">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-9 col-xl-7">
                            <div className="vptVideoPlayer">
                                
                                <ReactPlayer 
                                    controls 
                                    playing
                                    muted={true}
                                    config={{ file: { 
                                        attributes: {
                                            preload: "auto",
                                        }
                                    }}}
                                    className="img-fluid" 
                                    url={videoData?.final_video_asset_url} 
                                    playing={true}
                                />
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3 mb-3">
                    <ButtonGray style={{backgroundColor:videoData?.template?.landing?.cta_button_color}} 
                        onClick={()=> window.open(cta_button_link, "_blank")}   >{videoData?.template?.landing?.cta_button_text}</ButtonGray>
                    <ButtonGray style={{backgroundColor:videoData?.template?.landing?.cta2_button_color}}
                        onClick={()=> window.open(cta2_button_link, "_blank")} className="ml-2">{videoData?.template?.landing?.cta2_button_text}</ButtonGray>
                </div>
            </div>
        </div>
        }
        </>
    );
}