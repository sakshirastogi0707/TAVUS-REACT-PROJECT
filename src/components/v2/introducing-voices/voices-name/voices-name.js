import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import './voices-name.scss';
import { AppImage } from "../../../$widgets/images/app-image";
import OutlinedInputCustom from "../../../$widgets/input-fields/outlined-input"
import {StorageService,StorageKeys} from "../../../../service/core/storage.service";
import AdminService from "../../../../service/api/admin.service";
import {CampaignService} from "../../../../service/api/campaign.service";
import { UserService } from '../../../../service/api/user-service';
import { useParams, useHistory } from "react-router-dom";

const VoicesName = (props) => {
    const [userDetail, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [voiceName, setVoiceName] = useState('')
    const [voiceData, setVoiceData] = useState(null)
    const [userData, setUserData] = useState({})
    const [campaignId, setCampaignId] = useState(null);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            userDetails()
            await getTrainings(params.campaignId)
        })();
    }, []) 

    const getTrainings =async(id)=>{
        UserService.getTraining(id).then(async (response) =>{
          if(response && response.data.training_data_json){
            setVoiceName(response.data.name)
            setVoiceData(response.data)
          }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    async function userDetails() {
        let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
        AdminService.userDetails()
        .then(async (response) => {
            if(!isValid){
                if(response?.data?.campaign_count>1){
                  history.push(`/campaigns-list`)
                } else {
                  history.push(`/dashboard`)
                }
            }
            setUserData(response?.data)
        })
        .catch((error) => {
            console.log("error", error);
        })
    }

    const submit = async () => {
        if(voiceName){
            StorageService.setPerm('voiceName', voiceName);
            props.history.push(`/training/${params?.campaignId}`)
        }
    };
 
    return (
        <>
        <div className={'voices-name-main'}>
                <div className={'align-self-center w-100'} >
                    <HeaderLanding  userData={userData}/>
                    <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                        <div className="done-box text-center">
                             <AppImage name={'introducing-voices.png'}  width="98"/>
                                <h2>Name your voice</h2>
                                <h5>We recommend naming your voice with a combination of where you’re recording and what tone you’re going for. For example: “office-excited: would be a good name.

                                </h5>
                                <div className='voice-name'>
                                    <OutlinedInputCustom
                                        disabled={voiceData}
                                        onChange={(e)=>setVoiceName(e.target.value)}
                                        value={voiceName}
                                        // name="override_heading1"
                                        placeholder={"Name"}
                                    />
                                </div>
                            
                        </div>
                    </div>
                    <AppFooter
                        userData={userData}
                        onClick={()=>submit()}
                        disabled={!voiceName.trim()}
                        isLoading={isLoading}
                        onBack= {()=>props.history.push(`/my-voices/${params?.campaignId}`)}
                        isBack={userData?.uuid && true}
                        title={'Continue'}
                        step={'voices-name'}
                        invite={true}
                    />
                </div>
        </div>
        </>
        
    );
};

export default VoicesName;
