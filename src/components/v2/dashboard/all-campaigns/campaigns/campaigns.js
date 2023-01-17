import React from 'react';
import { AppImage } from "../../../../$widgets/images/app-image";
import { useHistory } from "react-router-dom";
import { Grid, Menu, ClickAwayListener, MenuItem, MenuList, } from "@material-ui/core";

import './campaigns.scss';
import Utils from "../../../../../service/core/utils";

export default function CampaignsCards (props) {
    const {campaigns} = props;
    const history = useHistory()

    const handleCampaignCardClick = (campaign) => {
        if (campaign.video_count > 0) {
            history.push(`/dashboard/campaign/${campaign.id}`);
        }
    }

    return (
        <>
            {campaigns.map((c) => {
                return <div className="campaigns-list" onClick={() => handleCampaignCardClick(c)}>
                    <div className="d-lg-flex justify-content-lg-between">
                        <div className="chart_cont">
                            <AppImage src={c.thumbnail_url} />
                        </div>
                        <div className="chart_list ">
                            <div className='campaigns-nmae'>
                                <h6 className={'tag_line'}>{c.campaign_name}</h6>
                                <span>{Utils.getFormattedDate(c.created_at)}</span>
                            </div>
                            <div className="d-flex">
                                <div className="views_list">
                                    <h6 className={'tag_lineDev'}>Videos</h6>
                                    <h5 className={'titleDev'}>{c.video_count}</h5>
                                </div>
                                <span className='borderSec'></span>
                                <div className="views_list">
                                    <h6 className={'tag_lineDev'}>Impressions</h6>
                                    <h5 className={'titleDev'}>0</h5>
                                </div>
                                <span className='borderSec'></span>
                                <div className="views_list">
                                    <h6 className={'tag_lineDev'}>Views</h6>
                                    <h5 className={'titleDev'}>0</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        <div className="campaigns-list d-none">
            <div className="d-lg-flex justify-content-lg-between">
                <div className="chart_cont">
                <AppImage name={"img.svg"} />
                </div>
                <div className="chart_list ">
                    <div className='campaigns-nmae'>
                        <h6 className={'tag_line'}>Campaign A</h6>
                        <span>Jan 12, 2022 at 11:59pm</span>
                    </div>
                    <div className=''>
                        <div className='last-stap'> <h5>Last step: Landing Page Creation </h5></div>
                    </div>
                    
                </div>
            </div>
        </div>



    </>
    )
}
