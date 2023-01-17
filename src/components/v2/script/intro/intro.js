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
import { StorageKeys, StorageService } from '../../../../service/core/storage.service';
import './intro.scss';
import ReactPlayer from 'react-player'
import HeaderLanding from "../../../app-frame/app-header-landing/app-header-landing";
import { SegmentService } from '../../../../service/api/segment.service';
const ariaLabel = { 'aria-label': 'description' };


const Company = (props) => {
    useEffect(() => {
        props.setDisabled(false)
    },[])

    return (
        <>
        <div className='script-frame-main '>
            <HeaderLanding userData={props.userData} />
            <div className='frame-box d-flex flex-column justify-content-center align-items-center'>
                <div className="script-frame-box">
                    <div className="sidebar-image align-self">
                        <ReactPlayer 
                            controls 
                            playing
                            muted={true}
                            width="100%"
                            className="img-fluid" 
                            url={"https://campaign-slider-image.s3.us-east-2.amazonaws.com/2022-06-18_11-44-26.mp4"} 
                        />
                    </div>
                    <div className="scriptBox align-self">
                        <h3>It’s now time to create your first video campaign!</h3>
                        <p> How exciting! You’re one step closer to creating your first AI-generated video campaign. Next, we’re going to take out our pens and draft a script. Then, we’re going to personalize it.</p>
                        <p>Not a wordsmith? No problem. We have examples of great scripts and templates you can rework! We estimate this will take about 10 minutes.</p>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default Company;