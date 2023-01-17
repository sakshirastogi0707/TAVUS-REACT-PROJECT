import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import AppFooter from "../../app-frame/app-footer/app-footer";
import HeaderLanding from "../../app-frame/app-header-landing/app-header-landing";
import './introducing-voices.scss';
import { AppImage } from "../../$widgets/images/app-image";
import IconLabelButtons from "../../$widgets/buttons/icon-label-buttons"
import AdminService from "../../../service/api/admin.service";
import { UserService } from '../../../service/api/user-service';
import {CampaignService} from "../../../service/api/campaign.service";
import { useParams, useHistory } from "react-router-dom";


const IntroducingVoices = (props) => {
    const [userDetail, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [campaignId, setCampaignId] = useState(null);
    const [userData, setUserData] = useState({})
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            userDetails()
        })();
    }, []) 

    const getTrainings =async(user)=>{
        UserService.getTraining(params.campaignId).then(async (response) =>{
            if(response && response.data.training_data_json){
                if(response.data.training_data_json.audio3){
                    return history.push(`/script-recording/${params?.campaignId}`)
                }
                return history.push(`/training/${params?.campaignId}`)
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
            await getTrainings(response?.data)
            setUserData(response?.data)
        })
        .catch((error) => {
            console.log("error", error);
        })
    }
 
    return (
        <>
        <div className={'introducing-voices-main'}>
                <div className={'align-self-center w-100'} >
                    <HeaderLanding userData={userData}/>
                    <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                        <div className="done-box text-center">
                             <AppImage name={'introducing-voices.png'}  width="98"/>
                                <h2>Introducing Voices</h2>
                                <h5>You can now create additional voices for new locations or different tones.</h5>
                                <p>If you’re recording in the same environment or using the same tone, we recommend using an existing voice.</p>
                            
                        </div>
                    </div>
                    <AppFooter
                        onClick={()=>history.push(`/my-voices/${params?.campaignId}`)}
                        isLoading={isLoading}
                        onBack= {()=>history.push(`/script/${params?.campaignId}`)}
                        isBack={userData?.uuid && true}
                        title={'Continue'}
                        step={'introducing-voices'}
                        invite={true}
                    />
                </div>
        </div>
        </>
        
    );
};

export default IntroducingVoices;
