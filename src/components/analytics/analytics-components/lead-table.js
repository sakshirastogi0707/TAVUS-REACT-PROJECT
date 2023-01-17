import React from 'react';
import { Grid } from "@material-ui/core";
import { AppImage } from "../../$widgets/images/app-image";
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from "react-js-pagination";
import { Autocomplete } from '@mui/material';
import Utils from "../../../service/core/utils";
import Loader from "../../$widgets/loader/loader"

const leadTable = (props) => {
    const { type, activePage, totalItemsCount, landing_variables,default_video_url,selected_template,isLoadingLeadTable,height,
        isLoadingLeadTablePagination } = props
    
    function getNameItials (val) {
        let name = ''
        let initials = ''
        if (val) {
            name = val.split(' ')
            name && name.length>0 && name.map((val1,key)=>{
                if(key<2){
                    initials+= val1.charAt(0)
                }
            })
        }
        return initials.toUpperCase()
    }

    return (
        <div className="table-responsive">
        <InfiniteScroll
            dataLength={props.allLeads.length}
            next={()=>props.getLeadsData(selected_template,'',true)}
            hasMore={totalItemsCount==props.allLeads.length ? false : true}
            height={height}
            loader={isLoadingLeadTablePagination ? <Loader className="infiniteLoader" /> :''}
        >
            <table className="table table-fixed">
                <thead>
                    <tr>
                        <th width="30%" className="table_leads">Leads</th>
                        {/* <th width="90px">Average watch time</th> */}
                        {type == 1 && <th width="15%">Total Watch time<br/><span className='text-center'>(hh:mm:ss)</span> </th>}
                        {type == 1 && <th width="10%">Views</th>}
                        {type == 1 && landing_variables?.cta_button_text && <th width="15%">{landing_variables?.cta_button_text}</th>}
                        {type == 1 && landing_variables?.cta2_button_text && <th width="15%">{landing_variables?.cta2_button_text}</th>}
                        <th width="10%">URL</th>
                    </tr>
                </thead>
                {isLoadingLeadTable ? <Loader /> :
                <tbody>
                    
                        {props.allLeads && props.allLeads.length > 0 ?  props.allLeads.map((val, key) => (
                            <tr >
                                <td className=" cursor-pointer" onClick={() => props.selectLead(val, type, key,'')}>
                                    <span className="userbox">
                                        <span className="user-circle">
                                            {getNameItials(val['Analytics.videoName'])}
                                        </span>
                                    </span>
                                    <span className="align-self user_title vertical-middle pl-2">{val['Analytics.videoName']}</span>
                                </td>
                                {/* <td>{val.averageWatchTime}</td> */}
                                {type == 1 && <td>{val.totalWatchTime}</td>}
                                {type == 1 && <td>{Utils.formatNumber(val.totalViews)}</td>}
                                {type == 1 && landing_variables?.cta_button_text && <td>{Utils.formatNumber(val['Analytics.totalCountCta1'])}</td>}
                                {type == 1 && landing_variables?.cta2_button_text && <td>{Utils.formatNumber(val['Analytics.totalCountCta2'])}</td>}
                                <td className="table_url cursor-pointer" ><AppImage onClick={(e) => props.copyText(e, default_video_url+'/video?id='+ val['Analytics.videoId'])} name={'copy-icon.svg'} /></td>
                            </tr>
                        ))
                        :
                        !isLoadingLeadTable && <tr >
                            <td className=" cursor-pointer" colspan="6"  style={{textAlign: 'center'}}>
                                No Data Found
                            </td>
                        </tr>
                    }
                    
                </tbody> 
                }
            </table>

            </InfiniteScroll>
        </div>
    )
}

export default leadTable;