import React, {useEffect, useState, useCallback} from 'react';
import IconLabelButtons from '../../../$widgets/buttons/icon-label-buttons'
import Inputs from '../../../$widgets/input-fields/input-field';
import { AppImage } from "../../../$widgets/images/app-image";
import Box from '@mui/material/Box';
import _ from 'lodash';
import Loader from "../../../$widgets/loader/loader"
import Utils from "../../../../service/core/utils";
import './script.scss';
import TextArea from "../../../$widgets/input-fields/text-area"
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import TipsTricks from "../../landing/landing-frame/tips-tricks"
import {SegmentService} from '../../../../service/api/segment.service'
import {userData, UserService} from '../../../../service/api/user-service'
const ariaLabel = { 'aria-label': 'description' };



export const Tips_Tricks = [
    {Title: 'How long should my video be?  ',
    Paragraph: 'When creating a video you should aim to make it engaging and not bore people...',
    BtnTitle: "Try Script"
    },
    {Title: 'Should I cuss in my videos?',
    Paragraph: 'Generally, when making a personalized video you should aim to not offend someone,,,',
    BtnTitle: "Try Script"
    },
    {Title: 'What makes a script engaging?',
    Paragraph: 'Making a dope ass script takes no time if you’re good at writing scripts...',
    BtnTitle: "Try Script"
    },
    {Title: 'What parts of a video should I personalize?',
    Paragraph: 'Personalizing the right amount of content is key to making a video engaging... ',
    BtnTitle: "Try Script"
    },
]

const Script = (props) => {
    const [openTips, setOpenTips] = useState(false)
    const [openExaple, setOpenExaple] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if(props?.script?.trim()){
            return props.setDisabled(false)
        }
        props.setDisabled(true)
    },[props.script])
    
    return (
        <>
        <div className='script-frame-main '>
            <HeaderLanding userData={props?.userData}/>
            <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                <div className="script-box">
                        <div className="scriptLeft">
                            <div className='text-center'>
                                <h3>Let’s create your first script</h3>
                            </div>
                            <div className='timeline'>
                                <div className="vtl">
                                    <div className="event">
                                        <p className="txt"> 
                                            Write your script like it's a message you're sending a friend.
                                            You know what makes their ears perk and keeps their attention.
                                            Channel that here. Be engaging from start to finish and wrap it up with a clear call to action. 
                                            For this step, just write what you want to say.
                                            All the bells and whistles come later. 
                                            Lastly, draft a script that translates to more than 10 seconds of audio. 
                                            That's at least 21 words.
                                        </p>
                                    </div>
                                    <div className="event center">
                                        {/* <div className='navButton'>
                                            <IconLabelButtons title="Tips and Tricks" onClick={()=>setOpenTips(true)} startIcon="sparkles-icon-font.svg"/>
                                        </div> */}
                                        <div className='navButton'>
                                            <IconLabelButtons title="Tips and Tricks" startIcon="sparkles-icon-font.svg"/>
                                        </div>
                                        <TipsTricks 
                                            title={"Tips & Tricks"} 
                                            subTitle={''}
                                            data={Tips_Tricks} 
                                            open={openTips} 
                                            setOpenModal={setOpenTips} 
                                        />
                                    </div>
                                    <div className="event center">
                                        {/* <div className='navButton'>
                                            <IconLabelButtons  title="Example Script" onClick={()=>setOpenExaple(true)} startIcon="magicpen.svg"/>
                                        </div> */}
                                        <div className='navButton'>
                                            <IconLabelButtons  title="Example Script" onClick={()=>SegmentService.analyticsTrack('Example Script Clicked',{})} startIcon="magicpen.svg"/>
                                        </div>
                                        <TipsTricks 
                                            title={"Example Script"} 
                                            subTitle={''}
                                            data={Tips_Tricks} 
                                            open={openExaple} 
                                            setOpenModal={setOpenExaple} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="scriptRight">
                        <TextArea
                            value={props.script}
                            placeholder="Start typing your script here!"
                            onChange={(e)=>props.setScript(e.target.value)}
                            name="script"
                        />
                        </div>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default Script;