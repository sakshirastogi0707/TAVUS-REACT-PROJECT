import React, {useEffect, useState, useCallback} from 'react';
import HeaderLanding from "../app-frame/app-header-landing/app-header-landing";
import { Grid } from "@material-ui/core";
import Button from '@mui/material/Button';
import {ConfigWizard} from "./tray/ConfigWizard";
import { getAvailableConnectors, getIframeSrc, enableSolutionInstance } from './tray/api/integrations_api';
import AuthService from "../../service/core/auth.service";
import AppDialogInvite from '../$widgets/AppDialogInvite/AppDialogInvite';
import CustomSelect from "../$widgets/input-fields/custom-select";
import IconLabelButtons from "../$widgets/buttons/icon-label-buttons";
import IconLabelButtonsBlack from "../$widgets/buttons/icon-label-buttons-black";
import IconLabelButtonsTransparent from "../$widgets/buttons/icon-label-buttons-transparent"
import './integrations.scss';
import {SegmentService} from '../../service/api/segment.service'
import ZapierModal from './zapier-integration';

const Integrations = (props) => {
    
    const [errors, setErrors] = useState(null); // {"message": 'error message'}

    const [iframeData, setIframeData] = useState(null);
    const [iframeReady, setIframeReady] = useState(true);

    const [availableIntegrations, setAvailableIntegrations] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [campaignId, setCampaignId] = useState(false);

    // Zapier
    const [zapierModalOpen, setZapierModalOpen] = useState(false);

    const onZapierModalClose = () => setZapierModalOpen(false);

    useEffect(() => {
        if(!props?.match?.params?.campaignId){
            props.history.push('/dashboard')
        }
        setCampaignId(props?.match?.params?.campaignId)
        async function getConnectors() {
            let available_integrations = await getAvailableConnectors()
            setAvailableIntegrations(available_integrations) 
            SegmentService.analyticsTrack('Integrations Accessed',{})
        }
        getConnectors()
    },[])

    function onConfigWizardReady() {
        setIframeReady(true);
    }
    
    async function onConfigWizardClose(finished, err=null) {
        if(err) {
            setErrors({"message": "Something went wrong setting up the integration"})
            return
        }

        if(finished) {
            let success = enableSolutionInstance(iframeData["user_token"], iframeData["solution_instance_id"])
            if(success) {
                // Next screen!
                setErrors({"message": "Integration enabled.  Move to next screen"})
            }
            else {
                setErrors({"message": "Something went wrong trying to activate the integration"})
            }
            setIframeData(null)
            
        }
        else {
            setErrors({"message": "Set up was cancelled, please try again"})
            setIframeData(null)
        }
        
    }

    async function getIntegrationsIframe (integration) {
        const user = await AuthService.userData()
        try {
            let iframe_data = await getIframeSrc(integration["id"], integration["name"], user, campaignId)
            setIframeData(iframe_data)
        }
        catch(e) {
            console.log(e)
            setErrors("There was a problem connecting to the third-party for integration")
        }

    }

    function getIntegrationsScreen() {
        if(iframeData && iframeReady) {
            return <><HeaderLanding
            title=""
            subtitle="" />{(iframeData && iframeData["tray_iframe_url"]) && <ConfigWizard src={iframeData["tray_iframe_url"]} onReady={onConfigWizardReady} onClose={onConfigWizardClose} />}</>
        }
        else if(iframeData) {
            // loading iframe
            return <><HeaderLanding
            title="Choose how you want to generate"
            subtitle="" /><h4>Loading...</h4></>
        }
        else if(availableIntegrations) {
            // loaded availableIntegrations
            return <><HeaderLanding
            // title="Choose how you want to generate"
            subtitle="" />
              <div className="SectionBox d-flex flex-column justify-content-center align-items-center">
                <div className='mainBoxDev'>
                <Grid item xs={12}>
                        <h2 className="title">Choose how you want to generate</h2>
                 </Grid>
                    <Grid container spacing={2} className="main-Div">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="ListBox">
                                <div className='DevSec'>
                                    <h4 className="">Manual</h4>
                                </div>
                                <div className='BtnSec'>
                                    <IconLabelButtonsBlack onClick={()=>props.history.push('/csv-request')} title="CSV" startIcon="task-list-text-alternate.svg" />
                                    {/* <IconLabelButtonsBlack onClick={()=>{return}} title="API" startIcon="api-icon.svg" /> */}
                                    {/* <Button style={{"fontWeight": "400"}} className='btn-white m-3' onClick={()=>props.history.push('/csv-request')}>CSV</Button>
                                    <Button style={{"fontWeight": "400"}} className='btn-white m-3' onClick={()=>{return}}>API</Button> */}
                                </div>
                                
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <div className={'ListBoxOne'}>
                                <div className='DevSec'>
                                    <h4 className="">Choose an integration</h4>
                                </div>
                                <div className='BtnSec'>
                                    {availableIntegrations.map((integration) => {
                                        return  <IconLabelButtonsBlack key={integration["id"]} onClick = {() => getIntegrationsIframe(integration)} title={integration["name"]} startIcon="hubspot-icon.svg" />
                                    })} 
                                    <IconLabelButtonsBlack onClick = {() => setZapierModalOpen(true)} title={"Zapier"} startIcon="api-icon.svg" />
                                    <IconLabelButtonsTransparent onClick={()=>window.open('https://tavus.stonly.com/kb/guide/en/integrations-8KyTmy96Ff/Steps/1589290', '_blank')} title="Learn about our other integrations" startIcon="api-icon.svg" />
                                </div>
                            </div>
                        </Grid>
                        <div className='nextDev'>
                        <div className='ordev'><p>or</p></div>
                        
                    </div>
                    </Grid>
                    </div>
                   
                    {errors && <span className='error'>{errors.message}</span>}
                </div>
            </>
        }
        else {
            return <><HeaderLanding
            subtitle="" />
            
                <div className="SectionBox d-flex flex-column justify-content-center align-items-center">
                <div className='mainBoxDev'>
                <Grid item xs={12}>
                        <h className="title">Choose how you want to generate</h>
                 </Grid>
                    <Grid container spacing={2} className="main-Div">
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="ListBox">
                                <div className='DevSec'>
                                    <h4 className="">Manual</h4>
                                </div>
                                <div className='BtnSec'>
                                            <IconLabelButtonsBlack onClick={()=>{return}} title="CSV" startIcon="task-list-text-alternate.svg" />
                                            
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <div className={'ListBoxOne'}>
                                
                                <div className='BtnSec'>
                                    <div className={' boxBg listBoxOne mb-3 align-items-center justify-content-center'}>
                                        <h4 className="">Loading available integrations...</h4>
                                                
                                    </div>
                                </div>
                            </div>
                             
                        </Grid>
                                {errors && <span className='error'>{errors.message}</span>}
                        
                    </Grid>
                </div>
            </div>
            </>
        }
    }

    return (
        
            
            <div className="integrations-main ">
                    <div className={'align-self-center w-100'} >
                        {getIntegrationsScreen()} 
                    </div>
                <AppDialogInvite
                    open={openModal}
                    maxWidth={"md"}
                    customClassMain="configureInt"
                    modelTitle={"Configure Integrations"}
                    content={
                        <div className="contentModal parentContentModal">
                            <div className="">
                                <div className="mb-20">
                                    <label className="text-left">Choose a campaign<sup className="text-danger">*</sup></label>
                                    <CustomSelect 
                                        
                                        name='selected_template' 
                                    />
                                </div>
                                <div className='text-center pt-4 pb-1'>
                                    <IconLabelButtons title="Next" /> 
                                </div>
                            </div>
                        </div>
                    }
                />
                <ZapierModal campaignId={campaignId} open={zapierModalOpen} onClose={onZapierModalClose}/>
            </div>
    );
}

export default Integrations;