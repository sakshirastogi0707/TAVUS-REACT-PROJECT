import React, {useEffect, useState, useCallback} from 'react';
import Button from '@mui/material/Button';
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import _ from 'lodash';
import Alert from '@mui/material/Alert';
import './recording.scss';
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons'
import Snackbar from "../../../$widgets/snackbar/Snackbar"
import SingleDropdownIcon from "../../../$widgets/dropdown/single-dropdown-icon"
import Recorder from '../recoder/recoder';

let occupiedSeats=0;
const Settings = (props) => {
    return (
        <div>
            <AppDialogInvite open={props.openModal}
                maxWidth={'lg'}
                customClassMain="video-modal-box"
                onClose={() => props.setModal(false)}
                content={
                <div className='contentModal'>
                    <div className='videoSection'>
                            {props.allowdAccess &&
                                <Recorder />
                            }
                    </div>
                    <div className="cameraBtn d-flex justify-content-between">
                        <SingleDropdownIcon 
                            placeholder="Shure MV7 (14ed:1012)" 
                            label="Microphone"
                            icon="microphone.svg"
                            value={props.selectedAudio} 
                            onChange={props.handleSelectAudio}
                            options={props.audioDevices}
                        />
                         <SingleDropdownIcon 
                            placeholder="Studio Display" 
                            label="Camera"
                            icon="meeting-camera.svg"
                            value={props.selectedVideo} 
                            options={props.videoDevices}
                            onChange={props.handleSelectVideo}
                        />
                    </div>
                        <div className="text-center">
                            <IconLabelButtons onClick={()=>props.setModal(false)} className="Close"  title="Close" />
                        </div>
                </div>
                }
            />
            
        </div>
    );
}

export default Settings;