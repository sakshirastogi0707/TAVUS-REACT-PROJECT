import React, {useEffect, useState, useRef, useCallback} from 'react';
import Inputs from '../../$widgets/input-fields/input-field';
import Header from "../../app-frame/app-header/app-header";
import AppFooter from "../../app-frame/app-footer/app-footer";
import {StorageKeys, StorageService } from '../../../service/core/storage.service';
import { ButtonOutlined } from "../../$widgets/buttons/button-outlined";
import MicriohoneModal from './microphone-popup';
import { UserService } from '../../../service/api/user-service';
import AuthService from "../../../service/core/auth.service";
import {SegmentService} from '../../../service/api/segment.service';
import {CampaignService} from "../../../service/api/campaign.service";
import './microphone.scss';
import { useParams, useHistory } from "react-router-dom";
const ariaLabel = { 'aria-label': 'description' };

const Microphone = (props) => {
    
    const params = useParams();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false)
    const [isMicrophone, setMicrophone] = useState(null)
    const [openMicModal, setModal] = useState(false)
    const [userSteps, setUserSteps] = useState(null)
    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            let user = await UserService.getUserProfile()
            let validateUser = AuthService.getUserCurrentRoute(user)
            if(validateUser!=true){
                history.push(validateUser)
            }
            
            setUserSteps(user?.steps)
            setUserData(user)
            setMicrophone(user?.is_mic_available)
            SegmentService.analyticsTrack('Microphone Wait Started',{});
        })();
    }, []);
    
    const handdleOnClick=()=>{
        if(isMicrophone===true){
            SegmentService.analyticsTrack('Microphone Selected',{hasMicrophone:"Yes"})
        }
        else{
            SegmentService.analyticsTrack('Microphone Selected',{hasMicrophone:"No"})

        }
        setModal(true)
        SegmentService.analyticsTrack('Microphone Wait Completed',{})
    }

    const submit = async () => {
        try {
            setLoading(true)
            let data = {
                is_mic_available: isMicrophone
            }
            const result = await CampaignService.micAvail(data)
            setModal(false)
            await updateUsersSteps(isMicrophone)
            // if(isMicrophone && result.status){
            //     history.push('/script')
            // } else {
            //     history.push('/script')
            // }
            if(params?.campaignId){
                return history.push(`/script/${params?.campaignId}`)
            }
            history.push('/script')
            setLoading(false)
            return result
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }

    const updateUsersSteps = async (mic) => {
        try {
            if(userData?.steps){
                let steps = userData.steps
                userData.is_mic_available = isMicrophone
                steps.microphone = true
                if(mic){
                    steps.script= false
                    steps.training= false
                    steps.script_recording= false
                    steps.template= false
                    steps.background_video= false
                    steps.landing= false
                    steps.training_complete= false
                    steps.set_variable= false
                    steps.first_video= false
                } else {
                    steps.script= false
                    steps.landing= false
                    steps.congratulation= false
                    steps.training= false
                    steps.script_recording= false
                    steps.template= false
                    steps.background_video= false
                    steps.training_complete= false
                    steps.set_variable= false
                    steps.first_video= false
                }
                if(!isMicrophone){
                    steps.is_mic_available = isMicrophone
                }
                const result = await UserService.userSteps(steps)
                return result
            }
        } catch (e) {
            console.log('campaign not saved', e)
            return false
        }
    }
    return (
        <div className={'signup-main microphone'}>
            <div className={'container'}>  
                <div className={'align-self-center w-100'} >
                    <>
                    <Header
                        userData={userData}
                        title="Ready to use your microphone?"
                        subtitle={["No worries if not! We just mailed you a Tavus welcome kit, equipped with a microphone, T-shirt,  and note from us."]} />
                        <div className="box box-address boxDev d-flex flex-column align-items-center justify-content-center">
                            <div className="DevBox">
                                <div className="DevBoxSec">
                                    <div className="wrong-video">
                                        <div>
                                            <ButtonOutlined
                                                onClick={()=>setMicrophone(true)}
                                                className={ isMicrophone==true ? "Btn selected" : "Btn " }
                                            >Yes</ButtonOutlined>
                                            <ButtonOutlined
                                                onClick={()=>setMicrophone(false)}
                                                className={ isMicrophone==false ? "Btn selected" : "Btn " }
                                            > No </ButtonOutlined>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <MicriohoneModal 
                                openMicModal={openMicModal}
                                isLoading={isLoading}
                                setModal={setModal}
                                isMicrophone={isMicrophone}
                                title={isMicrophone ? 'Nice!': 'No worries!'}
                                subTitle={isMicrophone ? 'Let’s create your voice model.' : "We've got some setup to do while you wait"}
                                onClick={submit}
                            />
                        </div>
                        <AppFooter 
                            userData={userData}
                            onClick={()=>handdleOnClick()} 
                            isLoading={isLoading}
                            disabled={(isMicrophone==null) ? true : false} 
                            onBack= {()=>history.push('/invite')}
                            isBack={userData?.uuid && true}
                            title={'Continue'}
                            invite={true}
                            step={'microphone'}
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

export default Microphone;