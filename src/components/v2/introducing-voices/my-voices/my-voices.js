import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import './my-voices.scss';
import { AppImage } from "../../../$widgets/images/app-image";
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons";
import EndIconLabelButtons from "../../../$widgets/buttons/end-icon-button";
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import { CampaignService } from "../../../../service/api/campaign.service";
import {StorageService,StorageKeys} from "../../../../service/core/storage.service";
import { UserService } from '../../../../service/api/user-service';
import AdminService from "../../../../service/api/admin.service";
import { useHistory, useParams } from "react-router-dom";

const MyVoices = (props) => {
    const [userDetail, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [openModal, setModal] = useState(false)
    const [voices, setMyVoices] = useState([])
    const [selectedVoice, setVoice] = useState({})
    const [userData, setUserData] = useState({})
    const [campaignId, setCampaignId] = useState(null);
    const params = useParams();
    const history = useHistory()
    useEffect(() => {
        if(params?.campaignId){
            setCampaignId(params?.campaignId)
        }
        getMyVoices()
        userDetails()
    }, [])

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

    const getMyVoices = async () => {
        const response = await CampaignService.myVoices();
        if (response) {
           setMyVoices(response)
        }
    };
    
    const setMyVoice = async (val) => {
       if(selectedVoice.id==val.id){
        setVoice({})
       } else {
        setVoice(val)
       }
    };

    const submit = async () => {
        if(selectedVoice.id){
            let formData = new FormData();    //formdata object
            StorageService.setPerm('selectedVoice', selectedVoice);
            formData.append('campaign_id', campaignId);
            formData.append('name', selectedVoice.name); 
            formData.append('voice_id', selectedVoice.id); 
            UserService.uploadVoices(formData).then(async (response) =>{
            if(response){
                props.history.push(`/script-recording/${campaignId}`)
            }
            }).catch((error) => {
                
            })
        }
    };
 
    return (
        <>
            <div className={'my-voices-main'}>
                <div className={'align-self-center w-100'} >
                    <HeaderLanding  userData={userData}/>
                    <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                        <div className="done-box text-center">
                             <AppImage name={'introducing-voices.png'}  width="98"/>
                                <h2>My Voices</h2>
                                <h5>Select the existing voice you'd like to use for this campaign, or train a new voice. This takes 15 minutes</h5>
                                <div className='voice-list'>
                                    {voices && voices.length>0 && voices.map((val, key)=>{
                                        return <EndIconLabelButtons  
                                        className={ selectedVoice.id==val.id &&  'active'} 
                                        onClick={()=>setMyVoice(val)} key={key} title={val?.name? val?.name : "First Voice"} endIcon="check-icon0.svg"  />
                                    })}
                                </div>
                            <div className='head-start'>
                               <IconLabelButtons disabled={selectedVoice.id && true} title="Or, create a new voice" onClick={()=>setModal(true)}  />
                            </div>
                            
                        </div>
                    </div>
                    <AppFooter
                        userData={userData}
                        onClick={()=>submit()}
                        disabled={!selectedVoice.id}
                        isLoading={isLoading}
                        onBack= {()=>props.history.push(`/script/${campaignId}`)}
                        isBack={userData?.uuid && true}
                        title={'Continue'}
                        step={'my-voices'}
                        invite={true}
                    />
                </div>
            </div>
            <AppDialogInvite
                open={openModal}
                maxWidth={"md"}
                onClose={() => setModal(false)}
                customClassMain="create-voice"
                content={
                <div className="contentModal">
                    <h2>To create a new voice, you'll have to go through voice training again, and it will take about 48 hours to process.</h2>
                    <h4>Do you want to create a new voice?</h4>
                    <div className='btnGrup'>
                            <div className='d-flex justify-content-between'>
                                <IconLabelButtons title="Yes" onClick={() => props.history.push(`/voices-name/${campaignId}`)} />
                                <IconLabelButtons title="No" onClick={() => setModal(false)} />
                            </div>
                    </div>
                </div>
                }
            />
        </>
        
    );
};

export default MyVoices;
