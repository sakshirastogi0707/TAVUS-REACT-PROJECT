import React, {useEffect, useState, useCallback} from 'react';
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons';
import IconLabelButtonsBlack from '../../../$widgets/buttons/icon-label-buttons-black'
import IconLabelButtonsTransparent from '../../../$widgets/buttons/icon-label-buttons-transparent'
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import TipsTricks from "../../landing/landing-frame/tips-tricks";
import { AppImage } from "../../../$widgets/images/app-image";
import Settings from "./Settings"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Recorder from '../recoder/recoder';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import './recording.scss';
import 'react-quill/dist/quill.snow.css';
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
const ariaLabel = { 'aria-label': 'description' };


export const Tips_Tricks = [
    {Title: 'How long should my video be?  ',
    Paragraph: 'When creating a video you should aim to make it engaging and not bore people...',
    BtnTitle: "Read More"
    },
    {Title: 'Should I cuss in my videos?',
    Paragraph: 'Generally, when making a personalized video you should aim to not offend someone,,,',
    BtnTitle: "Read More"
    },
    {Title: 'What makes a script engaging?',
    Paragraph: 'Making a dope ass script takes no time if you’re good at writing scripts...',
    BtnTitle: "Read More"
    },
    {Title: 'What parts of a video should I personalize?',
    Paragraph: 'Personalizing the right amount of content is key to making a video engaging... ',
    BtnTitle: "Read More"
    },
]

const Recording = (props) => {
    const startRecord = React.useRef(null)
    const stopRecord = React.useRef(null)
    const [openTips, setOpenTips] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [openModal, setModal] = useState(false)
    const [recordingStatus, setStatus] = useState(false)
    const [openModal1, setModal1] = useState(false)
    const [isRecording, setRecording] = useState(false)
    
    return (
        <>
        <div className='recording-test-main '>
            <HeaderLanding/>
            <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                <div className="script-box">
                    <div className='leftBox'>
                    <h3>Test audio</h3>
                        <div className="scriptLeft">
                                <div className='topBox'>
                                    <div>
                                        <p>Let’s start by testing your audio to ensure our AI is matching it properly.</p>
                                    </div>
                                    <div className='recordingButton'>
                                        {props.mediaUrl ?
                                            <div className='record-again'>
                                                <IconLabelButtons title="Record again"  onClick={() => props.recordAnother.current()}  startIcon="record-again.svg"/>
                                            </div> 
                                            :
                                            <div className='Start-recording'>
                                                {recordingStatus 
                                                    ? <div className='stop-recording'><IconLabelButtons onClick={() => stopRecord.current()} title="Stop recording" startIcon="stop-recording.svg"/>
                                                    </div>
                                                    : <IconLabelButtons onClick={() => startRecord.current()} title="Start recording" startIcon="Start-recording.svg"/>
                                                }
                                            </div>
                                        }
                                    </div>
                                   
                                </div>
                                <div className='bottamBox'>
                                    
                                    <div className="videoBox">
                                        {props.allowdAccess &&
                                            <Recorder 
                                                setStatus={setStatus} 
                                                startRecord={startRecord} 
                                                stopRecord={stopRecord}
                                                setMedia={props.setMedia}
                                                recordAnother={props.recordAnother}
                                                setRecording={setRecording}
                                                setModal1={setModal1}
                                            />
                                        }
                                        <div className="musicSec">
                                        </div>
                                    </div>
                                    <div className='Audiovideo'>
                                        <IconLabelButtons title="Audio and video" onClick={()=>setModal(true)} startIcon="Audio-video.svg"/>
                                    </div>
                                    <Settings 
                                        openModal={openModal}
                                        isLoading={isLoading}
                                        setModal={setModal}
                                        audioDevices={props.audioDevices} 
                                        handleSelectAudio={props.handleSelectAudio}
                                        selectedAudio={props.selectedAudio}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="scriptRight">
                            <div className='TipsButton d-flex justify-content-end'>
                                <IconLabelButtons title="Tips & Tricks" startIcon="sparkles-icon-font.svg"/>
                                    <TipsTricks 
                                        title={"Tips & Tricks"} 
                                        subTitle={''}
                                        data={Tips_Tricks} 
                                        open={openTips} 
                                        setOpenModal={setOpenTips} 
                                    />
                            </div>
                           
                            <div className='recordingBox'>
                                <div className='script-text'>
                                </div> 
                                <div className='interaction'>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert icon={<AppImage name={'iconone.svg'} width="12"/>} severity="error">
                                        The highlighted word will be substituted with another word by our AI.
                                        </Alert>
                                    </Stack>
                                </div>
                                {isRecording &&
                                    <div className='loader-box'>
                                        <div className='loader'>
                                            <AppImage name={'loader-anim.png'} className="rotate" width="88"/>
                                            <p>Lorem ipsum dolor sit amet, consectetur <br/> adipiscing elit.
                                            </p>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        </div>
                </div>
            </div>
        </div>
            <AppDialogInvite
                    open={openModal1}
                    maxWidth={"lg"}
                    onClose={() => setModal1(false)}
                    customClassMain="sounds-box"
                    content={
                    <div className="contentModal">
                        <div className="contDiv">
                            <h3>Hey there <span>Alice</span>, how’s it <br/>going?</h3>
                        </div>
                        <div className='btnGrup'>
                                <div className='d-flex'>
                                    <IconLabelButtonsBlack title="Troubleshoot" />
                                    <IconLabelButtons title="Sounds good" />
                                    <IconLabelButtonsTransparent startIcon="record-again.svg" title="Record again" />
                                </div>
                        </div>
                    </div>
                    }
                />
        </>
    );
}

export default Recording;