import React from 'react';
import { Grid } from "@material-ui/core";
import { AppImage } from "../../$widgets/images/app-image";
import moment from 'moment';
import ReactPlayer from 'react-player'
import BasicTable from '../../$widgets/table/table'
import Loader from "../../$widgets/loader/loader"
import Utils from "../../../service/core/utils";


const leadTab = (props) => {
    const { tab, selected_lead,leadTab,activityLogs,video_url,landing_variables,isLoadingActivity } = props
    return (
        <>
            {leadTab=='first' &&
                <div className="views_data">
                    <ReactPlayer
                        controls={true}
                        className="img-fluid"
                        width="100%"
                        height="100%"
                        url={video_url}
                        config={{ file: { 
                            attributes: {
                                preload: "auto",
                            }
                        }}}
                    />
                    <div className="views_data_custom ">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="viewslist">
                                <h4>VIEWS</h4>
                                <h3>{Utils.formatNumber(selected_lead?.totalViews)}</h3>
                            </div>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div className="viewslist pt-2">
                                <h4>AVERAGE WATCH TIME</h4>
                                <h3>{selected_lead?.averageWatchTime}</h3>
                            </div>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            {landing_variables?.cta_button_text && 
                                <div className="viewslist">
                                    <h4>{landing_variables?.cta_button_text}</h4>
                                    <h3>{Utils.formatNumber(selected_lead['Analytics.totalCountCta1'])}</h3>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            {landing_variables?.cta2_button_text && 
                                <div className="viewslist">
                                    <h4>{landing_variables?.cta2_button_text}</h4>
                                    <h3>{Utils.formatNumber(selected_lead['Analytics.totalCountCta2'])}</h3>
                                </div>
                            }
                        </Grid>
                        </Grid>
                    </div>
                </div>
            }
            {leadTab=='second' &&
                <div className="views_data_tabel position-relative">
                    <div className="table-responsive">
                        <table className="table table-fixed ">
                            <thead>
                                <tr>
                                    <th width="50%">
                                        Activity
                                    </th>
                                    <th width="25%">
                                        Time (hh:mm:ss)
                                    </th>
                                    <th width="25%">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingActivity ? <Loader /> :
                                    <>
                                        {activityLogs && activityLogs.length>0 ?
                                            activityLogs.map((val)=>(
                                                <tr>
                                                    <td>{val['Analytics.event']}</td>
                                                    <td>{moment(val['Analytics.createdAt']).format("hh:mm:ss A")}</td>
                                                    <td>{moment(val['Analytics.createdAt']).format("MM-DD-YYYY")}</td>
                                                </tr>
                                            ))
                                            :
                                            null
                                        }
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {/* <BasicTable
                data={activityLogs}
            /> */}
            
        </>
    )
}
export default leadTab;