import './script.scss';
import React, {useEffect, useState} from 'react';
import AppFooter from "../../app-frame/app-footer/app-footer";
import {connect, useDispatch, useSelector} from 'react-redux'
import Action from "../../../redux/action";
import {StorageKeys, StorageService, TempStorage} from "../../../service/core/storage.service";
import {ScriptService} from "../../../service/api/script.service";
import  AdminService  from "../../../service/api/admin.service";
import { UserService } from '../../../service/api/user-service';
import VideoCampaign from './video_campaign/video_campaign'
import Intro from './intro/intro'
import VideoScript from './create_script/createScript'
import { useParams, useHistory, useLocation } from "react-router-dom";
import { SegmentService } from '../../../service/api/segment.service';
import { CampaignService } from "../../../service/api/campaign.service";

const Landing = (props) => {
    const landingState = useSelector(s => s.landingState)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [step, createStep] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const [campaign_name, setCapaign] = useState('')
    const [script, setScript] = useState('')
    const [newCampaign, setNewCampaign] = useState(false)
    const [campaignId, setCampaignId] = useState(null)
    const [userData, setUserData] = useState({})

    const params = useParams();
    const history = useHistory();
    const location = useLocation()

   

    const createCampaign = async () => {
        try {
            let data = {
                campaign_name: campaign_name,
            }
            setLoading(true)
            if(!newCampaign){
                if(campaignId){
                    data.id = campaignId
                } 
            }
            
            const result = await ScriptService.createCampaign(data)
            if(result){
                setCampaignId(result.id)
                SegmentService.analyticsTrack("Script Started",{campaignId:result.id})
                StorageService.deletePerm(StorageKeys.LANDING_STATE)
                createStep('script')
            }
            setLoading(false)
            return result
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }
    const handleNext = async () => {
        if(step=='intro'){
            createStep('campaign')
        } else if(step=='campaign') {
            createCampaign()
        } else if(step=='script') {
            SegmentService.analyticsTrack("Script Completed",{ScriptTitle:campaign_name, WordCount: script.length})
            createScript()
        }
    }
    const createScript = async () => {
        try {
            let data = {
                script: script,
                campaign_id: campaignId
            }
            setLoading(true)
            const result = await ScriptService.createScripts(data)
            if(result){
                await updateUsersSteps()
                if(newCampaign){
                    return history.push(`/introducing-voices/${campaignId}`)
                }
                if(userData?.campaign_count>1){
                    history.push(`/introducing-voices/${campaignId}`)
                } else {
                  if (userData.is_mic_available) {
                    history.push(`/training/${campaignId}`);
                  } else {
                    history.push(`/landing/${campaignId}`);
                  }
                }
            }
            setLoading(false)
            return result
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }
     

    const updateUsersSteps = async () => {
        try {
            if(userData?.steps){
                let steps = userData.steps
                steps.script= true
                const result = await UserService.userSteps(steps)
                return result
            }
        } catch (e) {
            console.log('campaign not saved', e)
            return false
        }
    }

    useEffect(() => {
        if(props.match.path=='/script/:campaignId'){
            if(params?.campaignId){
                setCampaignId(params?.campaignId)
            }
        } else if(props.match.path== '/campaign/script/'){
            setNewCampaign(true)
            createStep('campaign')
        }
        userDetails()
    }, [])

    async function userDetails() {
        AdminService.userDetails().then(async (response) =>{
            if(response?.data){
                if(params?.campaignId){
                    let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
                    if(!isValid){
                        if(response?.data?.campaign_count>1){
                          history.push(`/campaigns-list`)
                        } else {
                          history.push(`/dashboard`)
                        }
                    }
                }
                setUserData(response?.data)
            }
            if(props.match.path == '/campaign/script/'){
                createStep('campaign')
            } else if(response?.data?.campaign?.id && response?.data?.campaign?.campaign_name) {
                setCapaign(response?.data?.campaign?.campaign_name)
                setScript(response?.data?.campaign?.scripts?.script_json?.script)
                createStep('script')
            } else {
                createStep('intro')
            }
        }).catch((error) => {
            console.log('error', error)
            createStep('intro')
        })
    }

    const backClick =async ()=>{
        if(step=='script'){
            createStep('campaign')
        } else {
            // console.log(userData,'navdeep/eng-2355-need-back-button-on-script-title-page')
            // return
            if(userData?.campaign_count > 1 || props.match.path == '/campaign/script/'){
                return history.push('/dashboard')
            }
            if(userData.is_mic_available){
                history.push('/invite')
            } else {
                history.push('/invite')
            }
        }
    }

    return (
        <div className={'landing-main'}>
            {step=='intro' &&
                <Intro userData={userData} setDisabled={setDisabled} />
            }
            {step=='campaign' &&
                <VideoCampaign userData={userData} newCampaign={newCampaign} handleNext={handleNext} setDisabled={setDisabled} setCapaign={setCapaign} campaign_name={campaign_name} />
            }
            {step=='script' &&
                <VideoScript userData={userData} setDisabled={setDisabled} script={script} setScript={setScript} campaignId={campaignId} />
            }
            <AppFooter
                userData={userData}
                title={'Continue'}
                disabled={isDisabled}
                progress={20}
                invite={true}
                isLoading={isLoading}
                onClick={handleNext}
                isBack={userData?.uuid && true}
                onBack={backClick}
                step={'script'}
            />
        </div>
    );
};

export default Landing;