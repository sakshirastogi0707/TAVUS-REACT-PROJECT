import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { AppImage } from "../../$widgets/images/app-image";
import { Grid, Menu, ClickAwayListener, MenuItem, MenuList, } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {ToolTip} from './pie-chart'
import Utils from "../../../service/core/utils";


const templateDetailCard = (props) => {
    const { data , landing_variables} = props
    let deviceView = []
    data.totalViewByDevice && data.totalViewByDevice.length > 0 && data.totalViewByDevice.map((val) => {
        let color = ''
        if (val.field == 'desktop') {
            color = '#FC5A5A'
        } else {
            color = '#0062FF'
        }
        deviceView.push({ title:  val?.field.charAt(0).toUpperCase() + val?.field.slice(1), value: val.views, color: color })
    })
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} >
            <div className="top_bar pb-3">
                <h4 className="title"><ArrowBackIcon onClick={() => props.changeTab(1)} /> <span className="align-self">{data['Analytics.templateName']}</span></h4>
                <p>Sales teams new tactic for leads acquisition.</p>
            </div>
            <div className=" impressions-list d-flex d-flex-mobile justify-content-start">
                <div className="video_sec">
                    <AppImage src={data['Analytics.imageThumbnailUrl']} />
                </div>
                <div className="chart_list align-self">
                    <div className="d-flex d-flex-mobile justify-content-start pt-3">
                        <div className="views_list align-self">
                            <h6 className={'tag_line'}>Total<br /> impressions</h6>
                            <h5 className={'title'}>{Utils.formatNumber(data['Analytics.totalPageView'])}</h5>
                        </div>
                        <div className="views_list align-self">
                            <h6 className={'tag_line'}>Total  watch time<br/> (hh:mm:ss)
                            </h6>
                            <h5 className={'title'}>{data.totalWatchTime}</h5>
                        </div>
                        {/* <div className="views_list">
                            <h6 className={'tag_line'}>Average<br />  watch time</h6>
                            <h5 className={'title'}>{data.averageWatchTime}</h5>
                        </div> */}
                        {landing_variables?.cta_button_text && 
                            <div className="views_list">
                                <h6 className={'tag_line align-self-start'}>{landing_variables?.cta_button_text}</h6>
                                <h5 className={'title d-flex align-content-end flex-wrap'}>{Utils.formatNumber(data['Analytics.totalCountCta1'])}</h5>
                            </div>
                        }
                        {landing_variables?.cta2_button_text && 
                            <div className="views_list">
                                <h6 className={'tag_line align-self-start'}>{landing_variables?.cta2_button_text}</h6>
                                <h5 className={'title d-flex align-content-end flex-wrap'}>{Utils.formatNumber(data['Analytics.totalCountCta2'])}</h5>
                            </div>
                        }
                        
                    </div>
                </div>
                <div className="Views_sec align-self ">
                    <div className="d-flex justify-content-center position-relative">
                        <div className='view_totalDa' ><p className='text-center'>{Utils.formatNumber(data.totalViews)} <br /><span>Views</span></p></div>
                        <div className='piechart'>
                            <ToolTip
                                data={deviceView}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default templateDetailCard;