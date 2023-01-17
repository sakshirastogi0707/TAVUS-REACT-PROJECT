import React, {useEffect, useState, useCallback} from 'react';
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons'
import IconLabelButtonsBlack from '../../../$widgets/buttons/icon-label-buttons-black'
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import SingleDropdownIcon from "../../../$widgets/dropdown/single-dropdown-icon"
import TipsTricks from "../../landing/landing-frame/tips-tricks";
import { AppImage } from "../../../$widgets/images/app-image";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Grid, Paper, Popper, MenuList, Grow } from "@material-ui/core";
import './AudioAndVideo.scss';
import 'react-quill/dist/quill.snow.css';
const ariaLabel = { 'aria-label': 'description' };


const AudioAndVideo = (props) => {
    const {paragraphs} = props
    const startRecord = React.useRef(null)
    const stopRecord = React.useRef(null)
    
    const playRecord = React.useRef(null)
    const pauseRecord = React.useRef(null)
    const [openTips, setOpenTips] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [openModal, setModal] = useState(false)
    const [recordingStatus, setStatus] = useState(false)
   
    
    return (
        <>
        <div className='audio-video'>
            <HeaderLanding/>
            <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className={'audio-title'}>
                            <h3>Test audio</h3>
                            <p>Sometimes an issue can occur simply from a change in environment, or perhaps <br/> you’re using a different microphone. Use the tips below to troubleshoot.
                             </p>
                        </div>
                    </Grid>
                </Grid>
                <div className="script-box">
                    <div className='leftBox'>
                        <div className="scriptLeft">
                                <div className='topBox'>
                                    <div>
                                        <h4>Improve audio environment</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat aliquam quis nam maecenas nulla morbi. Laoreet tristique cras mauris, in lectus morbi eget cursus. Quam et amet, sed nunc risus ultrices sit tortor ut. Velit cras at proin ipsum. Leo etiam ultrices cu.
                                        </p>
                                    </div>
                                </div>
                                <IconLabelButtonsBlack title="Visit support" onClick={()=>setModal(true)}/>
                                   
                            </div>
                        </div>
                        <div className="scriptRight">
                            <div className='recordingBox'>
                                <h4>Audio and video</h4>
                                <div className="cameraBtn">
                                    <div className='d-flex'>
                                        <SingleDropdownIcon 
                                            placeholder="Shure MV7 (14ed:1012)" 
                                            label="Microphone"
                                            icon="microphone.svg"
                                            value={props.selectedAudio} 
                                            options={props.audioDevices}
                                            onChange={props.handleSelectAudio}
                                        />
                                        {/* <div className="musicSec align-self">
                                            <AppImage name={'music-icon.svg'}/>
                                        </div> */}
                                    </div>
                                    <SingleDropdownIcon 
                                        placeholder="Studio Display" 
                                        label="Camera"
                                        icon="meeting-camera.svg"
                                        value={props.selectedVideo} 
                                        options={props.videoDevices}
                                        onChange={props.handleSelectVideo}
                                    />
                                </div>
                                <IconLabelButtonsBlack title="Visit support" onClick={()=>setModal(true)}/>
                            </div>
                            <div className='retrain-box d-flex justify-content-between'>
                                <div className=''>
                                    <h4>Still not working?</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur.</p>
                                </div>
                                <div className='retrainBtn'>
                                    <IconLabelButtonsBlack title="Retrain" onClick={()=>setModal(true)}/>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default AudioAndVideo;