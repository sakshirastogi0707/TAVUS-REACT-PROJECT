import React, {useEffect, useState, useCallback} from 'react';
import Inputs from '../../../$widgets/input-fields/input-field';
import { AppImage } from "../../../$widgets/images/app-image";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import  AdminService  from "../../../../service/api/admin.service";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@mui/material/Box';
import _ from 'lodash';
import Loader from "../../../$widgets/loader/loader"
import Utils from "../../../../service/core/utils";
import Header from "../../../app-frame/app-header/app-header";
import AppFooter from "../../../app-frame/app-footer/app-footer";
import { StorageService } from '../../../../service/core/storage.service';
import { SegmentService } from '../../../../service/api/segment.service';
const ariaLabel = { 'aria-label': 'description' };


const Company = (props) => {

    const [isLoading, setLoading] = useState(false)
    const [campaign_name, setCapaign] = useState('')
    
    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
          if(props.campaign_name){
            props.handleNext()
          }
        }
    }

    useEffect(() => {
        if(props.campaign_name?.trim()){
            return props.setDisabled(false)
        }
        props.setDisabled(true)
    },[props.campaign_name])

    return (
        <div className={'signup-main'}>
            <div className={'container'}>  
                <div className={'align-self-center w-100'} >
                <>
                    <Header
                        title={props.newCampaign ? "What do you want to call your campaign?" : "What do you want to call your first video campaign?"}
                        subtitle="Don’t worry, only you’ll see this name. Name it something cool." 
                        userData={props.userData}
                        />
                        <div className="box box-company boxDev d-flex flex-column align-items-center justify-content-center">
                            <div className="DevBox m-auto w7">
                                <div className="DevBoxSec">
                                    <Inputs  
                                        onKeyDown={handleEnter} 
                                        autoFocus={true} 
                                        className={"campaign_name"} 
                                        variant="outlined" 
                                        placeholder={props.newCampaign ? "My AI powered video campaign!"  : "My first AI powered video campaign!"}
                                        value={props.campaign_name} onChange={(event)=>props.setCapaign(event.target.value)}
                                        autocomplete="false" inputProps={ariaLabel} 
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default Company;