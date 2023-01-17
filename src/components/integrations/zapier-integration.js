
import React, { useEffect, useState, useCallback } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AuthService from "../../service/core/auth.service";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { StorageService, StorageKeys } from '../../service/core/storage.service';
import { toast } from "react-toastify";
import httpAdmin from '../../service/core/http-admin';
import { urls } from "../../config/urlConfig";
import UserService from "./../../service/api/user.service.js"
import Dialog from '@mui/material/Dialog';
import CopyIcon from '@mui/icons-material/ContentCopy';
import './modal.scss'
import TextField from '@mui/material/TextField';

const INVITE_LINK = "https://zapier.com/developer/public-invite/165451/360afc0dd60ffb84afbf9b02cbe42eed/";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    '& label': {
        color: 'white'
    }
    
});


async function sendSample() {
    let webhookUrl = document.getElementById("webhook-input").value;
    if (webhookUrl === "") {
        toast.error("Enter a URL");
        return;
    }
    try {
        let response = await UserService.sendSampleRecordToWebhook({
            webhook_url: webhookUrl
        });
        toast.success("Sample sent to Zapier webhook")
    } catch(e) {
        toast.error("Something went wrong")
        console.log(e)
    }
}



const ZapierModal = ({ open, onClose, campaignId }) => {

    let [apiKey, setApiKey] = useState("**** **** **** ****")
    let [apiKeyGenerated, setApiKeyGenerated] = useState(false)
    let [generating, setGenerating] = useState(false)

    useEffect(() => {
        const user = AuthService.userData()
    }, [])

    const copyCampaignId = () => {
        navigator.clipboard.writeText(campaignId)
    }
    const copyInviteLink = () => {
        navigator.clipboard.writeText(INVITE_LINK)
    }

    async function generateKey() {
        setGenerating(true)
        setApiKeyGenerated(true)
        
        const user = AuthService.userData()

        let params = `?user_id=${user.id}`

        let response = await httpAdmin.get(urls.generateAPIKey+params).catch((err) => console.log(err))
        if(response.status == 200) {
            setApiKey(response["data"]["api-key"])
        }
        else {
            toast.error("Something went wrong generating an API key")
        }

        setGenerating(false);
        return null
    }


    return <Dialog 
            open={open}
            disableEnforceFocus={true}
            onClose={onClose} className="zapier-dialog"
        >
            <Box className='api-key-dialog'>
                <div className='header-wrapper'>
                    <div className='header-text'>Zapier setup</div>
                    <div className='close-icon-wrapper'>
                        <img src={`../../assets/images/close_circle2.svg`} onClick={onClose}/>
                    </div>
                </div>
                <div className='content'>
                    {/* <h3>Follow the instructions in this guide to set up Zapier!</h3> */}
                    <h4>Test Webhook URL</h4>
                    <div className='api-key-box-wrapper'>
                        <div className='api-key-box'>
                            <div className='api-key'>
                                <CssTextField id="webhook-input" label="Enter Webhook URL" variant="outlined" />
                            </div>
                            <div className='generate-wrapper'>
                                <Button  size="large" variant="contained" onClick={sendSample}>Test Webhook</Button>
                            </div>
                        </div>
                    </div>
                    <h4>Add Tavus Integration to Zapier</h4>
                    <div className='api-key-box-wrapper'>
                        <div className='api-key-box'>
                            {/* <div className='api-key'>{INVITE_LINK}</div> */}
                            <div className='generate-wrapper' style={{ flex: 1 }}>
                                <a href={INVITE_LINK} target='_blank' style={{ flex: 1, display: 'flex' }}>
                                    <Button className='copy-link-button'  size="large" variant="contained" onClick={copyInviteLink}>
                                        Add Tavus Integration to Zapier
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <h4>Generate API key</h4>
                    <div className='api-key-box-wrapper'>
                        <div className='api-key-box'>
                            <div className='api-key'>{generating ? "Generating..." : apiKey}</div>
                            <div className='generate-wrapper'>
                                <Button disabled={apiKeyGenerated} size="large" variant="contained" onClick={generateKey}>Generate</Button>
                            </div>
                        </div>
                    </div>
                    {campaignId && <><h4>Tavus Campaign ID</h4>
                    <div className='api-key-box-wrapper'>
                        <div className='api-key-box'>
                            <div className='api-key'>{campaignId}</div>
                            <div className='generate-wrapper'>
                                <Button startIcon={<CopyIcon />} size="large" variant="contained" onClick={copyCampaignId}>Copy</Button>
                            </div>
                        </div>
                    </div></>}
                    
                    <div className='buttons-wrapper'>
                        {/* <Button  size="large" variant="contained">Copy</Button> */}
                        {/* <Button  size="large" variant="contained" onClick={sendSample}>Send</Button> */}
                    </div>
                </div>
            </Box>
        </Dialog>;
}

export default ZapierModal;