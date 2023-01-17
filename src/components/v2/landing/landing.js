import './landing.scss';
import React, { useEffect, useState } from 'react';
import LandingFrame from "./landing-frame";
import TemplateSelector from "./components/template-selector/template-selector";
import AppFooter from "../../app-frame/app-footer/app-footer";
import { connect, useDispatch, useSelector } from 'react-redux'
import Action from "../../../redux/action";
import { StorageKeys, StorageService, TempStorage } from "../../../service/core/storage.service";
import AdminService from "../../../service/api/admin.service";
import { CampaignService } from "../../../service/api/campaign.service";
import { UserService } from '../../../service/api/user-service';
import { SIDEBAR_NAV_ITEMS } from "./landing-frame/sidebar";
import LinearDeterminate from "../../$widgets/app-progress/app-progress"
import Snackbar from "../../$widgets/snackbar/Snackbar"
import { useHistory, useParams, useLocation } from "react-router-dom";
import { SegmentService } from '../../../service/api/segment.service'
import { template } from 'lodash';
import AppDialogInvite from "../../$widgets/AppDialogInvite/AppDialogInvite";
import { ButtonOutlined } from "../../$widgets/buttons/button-outlined";
import { toast } from "react-toastify";
const Landing = (props) => {
    const params = useParams();
    const history = useHistory();
    const location = useLocation();
    const landingState = useSelector(s => s.landingState)
    const [template_id, setSelectedTemplate] = useState(1)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [campaignId, setCampaignId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedTemplateName, setSelectedTemplateName] = useState("Modern")
    const [userDetail, setUserDetail] = React.useState({});
    const [editLanding, setEditLanding] = useState(false);

    const getCampaignById = async (id) => {
        const response = await CampaignService.getSingleCampaign(id);
        if (response) {
            try {
                return response
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        (async () => {
            let isValid = await CampaignService.validateUserCampaignAccess(params?.campaignId)
            await AdminService.userDetails().then(async (response) => {
                if (response?.data) {
                    if (!isValid) {
                        if (response?.data?.campaign_count > 1) {
                            history.push(`/campaigns-list`)
                        } else {
                            history.push(`/dashboard`)
                        }
                    }
                    setUserDetail(response?.data)
                }
            }).catch((error) => {
                console.log('error', error)
            })
        })();
    }, [template_id])


    const submit = async () => {
        try {
            const result = await CampaignService.saveCampaign(landingState, campaignId)
            let steps = landingState.completed_steps
            if (!steps.includes(landingState.selectedNavItemId)) {
                steps.push(landingState.selectedNavItemId)
            }
            setLoading(false)
            dispatch({
                type: Action.UpdateLandingState,
                payload: {
                    id: result.id,
                    template_id: landingState.template_id,
                    completed_steps: steps
                },
                origin: 'id.dispatchid'
            })
            return result
        } catch (e) {
            setLoading(false)
            console.log('campaign not saved', e)
            return false
        }
    }

    const progressSideBar = () => {
        if (landingState.selectedNavItemId === 'buttons') {
            // TODO: exit campaign flow, and redirect to some route
            return
        }
        const navItem = SIDEBAR_NAV_ITEMS.find(x => x.id === landingState.selectedNavItemId);
        const nextNavItem = SIDEBAR_NAV_ITEMS.find(x => x.index === navItem.index + 1)
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                selectedNavItemId: nextNavItem.id
            },
            origin: 'landing.progressSideBar'
        })
    }

    const handleNext = async () => {
        if (
            landingState?.template_id == 4 &&
            !landingState?.CTA?.button1?.link.includes('calendly') &&
            footerButtonTitle === "Save"
          ) {
            return toast.error("Please enter a calendly URL");
        }else{
        if (landingState.template_selected) {
            // SegmentService.analyticsTrack("abcg",{})
            setServerError('')
            if (!landingState.heading1) {
                return setServerError('Title cannot be blank.')
            }
            await submit()
            await updateUsersSteps()
            progressSideBar()
            if (isEdit && landingState.selectedNavItemId == 'buttons') {
                StorageService.deletePerm(StorageKeys.LANDING_STATE);
                history.push(`/edit-campaign/background-video/${campaignId}`)
            } else if (userDetail?.campaign_count > 1 && landingState.selectedNavItemId == 'buttons') {
                StorageService.deletePerm(StorageKeys.LANDING_STATE);
                history.push(`/training-complete/${campaignId}`)
            } else if (!userDetail.is_mic_available && landingState.selectedNavItemId == 'buttons') {
                StorageService.deletePerm(StorageKeys.LANDING_STATE);
                history.push(`/congratulation/${campaignId}`)
            } else if (userDetail.is_mic_available && landingState.selectedNavItemId == 'buttons') {
                StorageService.deletePerm(StorageKeys.LANDING_STATE);
                history.push(`/training-complete/${campaignId}`)
            }
        } else {
            getTemplateData()
            SegmentService.analyticsTrack('Landing Page Creation Started', { layoutNumber: selectedTemplateName })
        }
    }
    }

    const updateUsersSteps = async () => {
        try {
            if (userDetail.steps) {
                let steps = userDetail.steps
                steps.landing = true
                const result = await UserService.userSteps(steps)
                return result
            }
        } catch (e) {
            console.log('campaign not saved', e)
            return false
        }
    }

    useEffect(() => {
        (async () => {
            if (params?.campaignId) {
                setCampaignId(params?.campaignId)
            }
            if (!params?.campaignId) {
                history.push('/dashboard')
                return;
            }
            let landingState = {}
            if (location.pathname.includes('edit-campaign/landing')) {
                landingState = await getCampaignById(params?.campaignId)
                landingState.isEdit = true
                setIsEdit(true)
                setEditLanding(true)
                setSelectedTemplate(landingState.template_id)
            } else {
                landingState = StorageService.getLocalData(StorageKeys.LANDING_STATE)
                //landingState.isEdit = false
            }
            if (!landingState) {
                return
            }
            TempStorage.landingState = landingState
            dispatch({
                type: Action.UpdateLandingState,
                payload: landingState,
                origin: 'landing.mounted'
            })
        })();
    }, []);


    const getTemplateData = async () => {
        setLoading(true)
        CampaignService.getCampaignById(campaignId, template_id)
            .then((data) => {
                setLoading(false)
                if (!data.completed_steps) {
                    data.completed_steps = ['layout']
                }
                data.selectedNavItemId = 'colors';
                data.template_selected = true
                dispatch({
                    type: Action.UpdateLandingState,
                    payload: data,
                    origin: 'landing.getTemplateData'
                })
            }).catch((error) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (Boolean(landingState.template_name) && !Boolean(landingState.initial_submit)) {
            setLoading(true)
            submit().then((status) => {
                if (!status) {
                    setLoading(false)
                } else {
                    setLoading(false)
                    dispatch({
                        type: Action.UpdateLandingState,
                        payload: {
                            initial_submit: true
                        },
                        origin: 'landing.useEffect.landingState.template_name'
                    })
                }
            })
        }
    }, [landingState.template_name])

    const getProgressValue = () => {
        let progress = 20
        if (landingState && landingState?.completed_steps) {
            switch (landingState?.completed_steps.length) {
                case 1:
                    progress = 20
                    break;
                case 2:
                    progress = 40
                    break;
                case 3:
                    progress = 60
                    break;
                case 4:
                    progress = 80
                    break;
                case 5:
                    progress = 100
                    break;
                default:
                    progress = 20
            }

        }
        return progress
    }

    const backClick = () => {
        if (isEdit) {
            return history.push(`/edit-campaign/template/${campaignId}`)
        }
        if (userDetail.is_first_campaign) {
            if (userDetail?.is_mic_available) {
                history.push(`/background-video-setup/${campaignId}`)
            } else {
                history.push(`/script/${campaignId}`)
            }
        } else {
            history.push(`/background-video-setup/${campaignId}`)
        }
        return
    }

    const footerButtonTitle = landingState.selectedNavItemId !== 'buttons' ? 'Continue' : 'Save'

    return (
        <div className={'landing-main'}>
            {
                (landingState.template_selected && landingState.template_id > 0) ?
                    <LandingFrame campaignId={campaignId} userDetail={userDetail} /> :
                    <TemplateSelector userDetail={userDetail} onTemplateChange={setSelectedTemplate} layoutName={setSelectedTemplateName} />
            }
            {serverError &&
                <Snackbar
                    onClose={() => setServerError('')}
                    serverError={serverError}
                />
            }
            <AppFooter
                userData={userDetail}
                title={footerButtonTitle}
                progress={getProgressValue()}
                invite={true}
                onClick={handleNext}
                disabled={!userDetail?.uuid}
                onBack={backClick}
                isBack={userDetail?.uuid && true}
                step={'landing'}
                isLoading={loading}
            />
            <AppDialogInvite open={editLanding}
                maxWidth={'md'}
                className="video-modal"
                customClassMain="microphoneDev edit-campaigns edit-landing"
                content={
                    <div className='contentModal'>
                        <div className="topsection">
                            <h1>Editing landing pages will impact your old videos. Do you wish to continue? </h1>

                        </div>
                        <div className='continue-button'>
                            <ButtonOutlined className={"selected"} onClick={() => setEditLanding(false)}> Edit </ButtonOutlined>
                            <ButtonOutlined onClick={() => history.push(`/edit-campaign/background-video/${campaignId}`)}> Skip </ButtonOutlined>
                        </div>
                    </div>
                }
            />

        </div>
    );
};

export default Landing;
