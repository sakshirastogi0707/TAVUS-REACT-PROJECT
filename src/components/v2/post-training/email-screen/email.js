import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import '../post-training.scss';
import { AppImage } from "../../../$widgets/images/app-image";
import {StorageKeys, StorageService } from '../../../../service/core/storage.service';
import { UserService } from '../../../../service/api/user-service';
import IconLabelButtons from "../../../$widgets/buttons/icon-label-buttons"
import { submit } from 'redux-form';
import  AdminService  from "../../../../service/api/admin.service";
import { CampaignService } from "../../../../service/api/campaign.service";
import { HTTP } from "../../../../service/core/http.service";
import { urls } from "../../../../config/urlConfig";
import { useParams, useHistory,useLocation } from "react-router-dom";

const Email = (props) => {
    const [userDetail, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [campaignId, setCampaignId] = useState(null)
    const location = useLocation();

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if(params?.campaignId){
                setCampaignId(params?.campaignId)
            }
            let isValid  = await CampaignService.validateUserCampaignAccess(params?.campaignId)
            let user = await UserService.getUserProfile()
            if(!isValid){
                if(user?.campaign_count>1){
                  history.push(`/campaigns-list`)
                } else {
                  history.push(`/dashboard`)
                }
            }
            setUser(user)
            //checking()
        })();
    }, []);

    const checking =async()=>{
        setIsLoading(true)
        HTTP.get(`${urls.userRoleUpdate}checking-training-flow/${campaignId}` ).then((result) => {
            setIsLoading(false)
            if (result.status == 200) {
                submit()
            }else{
                toast.error(result.message)
                if(userDetail.campaign_count>1){
                    return history.push(`/campaigns-list`)
                }
                
            }
        }).catch((err) => {
            setIsLoading(false)
            toast.error('Something went wrong')
        })
    }
    const submit = async()=>{
        try {
            if(userDetail.steps){
                let steps = userDetail.steps
                steps.training_complete= true
                const result = await UserService.userSteps(steps)
                history.push(`/set-variable/${campaignId}`)
                return result
            }
        } catch (e) {
            console.log('campaign not saved', e)
            return false
        }
        
    }

    const onBackClick = async () => {
        if(userDetail.is_mic_available || userDetail.campaign_count>1) {
            history.push(`/landing/${campaignId}`)
        } else {
            history.push(`/background-video-setup/${campaignId}`)
        }
    }
 
    return (
        <>
        <div className={'post-training-main'}>
            <div className={'container'}>  
                <div className={'align-self-center w-100'} >
                    <HeaderLanding userData={userDetail}/>
                    <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                        <div className="done-box text-center">
                             <AppImage name={'done.svg'}  width="98"/>
                                <h2>You’re done</h2>
                                <p> Your training is in progress and can take up to 48 hours to complete. We’ll <br/> email you at <span> {userDetail?.email} </span> once it’s done. In the meantime, check out some of our resources on best practices for sending a Tavus video.   
                                    </p>
                            <div className='head-start'>
                               <IconLabelButtons title="Get A Head Start"  />
                            </div>
                        </div>
                    </div>
                    <AppFooter
                        userData={userDetail}
                        onClick={()=>checking()}
                        isLoading={isLoading}
                        onBack= {onBackClick}
                        isBack={userDetail?.uuid && true}
                        title={'Continue'}
                        invite={true}
                        step={'training-complete'}
                    />
                </div>
            </div>
        </div>
        </>
        
    );
};

export default Email;
