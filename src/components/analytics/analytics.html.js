import React from "react";
import { Grid, Menu, ClickAwayListener, MenuItem, MenuList, } from "@material-ui/core";
import { AppImage } from "../$widgets/images/app-image";
import SmallCards from "./analytics-components/small-cards";
import TemplateCards from "./analytics-components/template-card";
import Header from "./analytics-components/hearder";
import GraphView from "./analytics-components/graph-view";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TemplateDetailCard from "./analytics-components/template-detail-card";
import LeadTable from "./analytics-components/lead-table";
import LeadTab from "./analytics-components/lead-tab";
import moment from 'moment';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Loader from "../$widgets/loader/loader"
import Utils from "../../service/core/utils";


export function html() {
    const { totalImpression, allTemplateData,TemplateDetailData, cubeData, user, allTemplates, selectedTemplate, tab, allLeads, views_by, selected_lead,
        activePage, totalItemsCount, isLoadingTemplate, isLoadingLead, activityLogs, leadTab, video_url, isLoadingCube, selectedDate,
        landing_variables,default_video_url,isLoadingActivity, oneDate, otherData,selected_template,isLoadingLeadTable,isLoadingLeadTablePagination} = this.state;
    const { } = this.props;
    return (
        <div className={'analytics-main'}>
            <Header
                allTemplates={allTemplates}
                changeTemplate={this.changeTemplate}
                selectedTemplate={selectedTemplate}
                selected_lead={selected_lead}
                tab={tab}
                handleTabChange={this.handleTabChange}
            />
            {tab === 1 &&
                <>
                     {isLoadingTemplate ? <Loader /> :
                    <>
                    <div className={'alert-message'}>
                        <h2>Good Morning, <span className="text-capitalize">{user?.first_name ? user.first_name : user?.email}</span>!</h2>
                        <p>Here’s what’s happening with your campaings today.</p>
                    </div>
                    <Grid container className={'d-flex justify-content-start'}>
                        <SmallCards
                            title="TOTAL IMPRESSIONS"
                            count={totalImpression && totalImpression.length > 0 ? Utils.formatNumber(totalImpression[0]['Analytics.totalPageView']) : ''}
                        />
                        <SmallCards
                            title="TOTAL WATCH TIME"
                            count={totalImpression && totalImpression.length > 0 ? totalImpression[0]['totalWatchTime'] : ''}
                        />
                        {/* <SmallCards
                            title="AVERAGE WATCH TIME CARD"
                            count={totalImpression && totalImpression.length > 0 ? totalImpression[0]['averageWatchTime'] : ''}
                        />
                        <SmallCards
                            title="TIME SAVED"
                            count={totalImpression && totalImpression.length > 0 ? totalImpression[0]['timeSaved'] : ''}
                        /> */}
                    </Grid>
                    <div className={'create-campaign'}>
                        <h2>All Campaigns <AppImage name={'warning.svg'} /></h2>
                            <Grid container className="d-flex justify-content-between pt-3">
                                {allTemplateData && allTemplateData.length > 0 && allTemplateData.map((val) => {
                                    return <>
                                        <TemplateCards
                                            template_id={val['Analytics.templateId']}
                                            name={val['Analytics.templateName']}
                                            impressions={val['Analytics.totalPageView']}
                                            views={val['totalViews']}
                                            clicks={val['Analytics.totalCountCta']}
                                            image={val['Analytics.imageThumbnailUrl']}
                                            selectTemplate={this.selectTemplate}
                                        />
                                    </>
                                })}
                            </Grid>
                    </div>
                    </>}
                </>
            }
            {tab == 2 &&
                <>
                    {isLoadingLead ? <Loader /> :
                        <>
                        {TemplateDetailData && TemplateDetailData.length > 0 ?
                            <Grid container className="impressions pt-4 pb-4">
                                <TemplateDetailCard
                                    data={TemplateDetailData[0]}
                                    changeTab={this.changeTab}
                                    landing_variables={landing_variables}
                                />
                            </Grid>
                            :
                            <Grid container className="impressions pt-4 pb-4">
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <div className="top_bar pb-3">
                                        <h4 className="title"><ArrowBackIcon onClick={() => this.changeTab(1)}/> <span className="align-self">{selectedTemplate?.label}</span></h4>
                                        <p>Sales teams new tactic for leads acquisition.</p>
                                    </div>
                                    <div className=" impressions-list d-flex d-flex-mobile justify-content-start">
                                        {!isLoadingTemplate && TemplateDetailData.length==0 ? 
                                            <div>
                                                No Data Found
                                            </div>
                                            : 'Loading...'
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        }
                            <Grid container >
                                <Grid item xs={12} sm={12} md={12} lg={12} >

                                    <div className="graph-list">
                                    {isLoadingCube  ? 
                                                    <>
                                                    <div className="graph_view_list">
                                                    <Loader />
                                                    </div>
                                                    </>
                                                    
                                                   
                                                    :
                                        <>         
                                        <div className='d-flex justify-content-between'>
                                            <div className="header">
                                                <h4>Views</h4>
                                                {views_by=='day' 
                                                ?
                                                    <p>{ moment(oneDate).format("ddd DD")}
                                                    </p>
                                                :
                                                    <p> {moment(oneDate).format("ddd DD") +' - '+ moment(otherData).format("ddd DD")} </p>
                                                }
                                            </div>
                                            <div className="header">
                                               
                                                
                                            </div>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className={views_by == 'day' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => this.setViewFilter('day')} >Daily</button>
                                                <button type="button" className={views_by == 'week' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => this.setViewFilter('week')} >Weekly</button>
                                                {/* <button type="button" className={views_by == 'month' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => this.setViewFilter('month')}>Monthly</button> */}
                                            </div>
                                        </div>
                                
                                        {/* <AppImage name={'loader.gif'} width="50" /> */}
                                        {!isLoadingCube && cubeData && cubeData?.datasets?.length>0 ?
                                            <>
                                            <div className="graph_view_list">
                                                <GraphView
                                                    cubeData={cubeData}
                                                />
                                            </div>
                                            
                                            </>
                                            :
                                            <div className="noDataLoader">
                                                {isLoadingCube  ? 
                                                    <>
                                                    <div className="graph_view_list">
                                                    <Loader />
                                                    </div>
                                                    
                                                    
                                                    </>
                                                    :
                                                    <h4>No Data Found</h4>
                                                }
                                            </div>
                                        }

                                        

                                        <div className="bottomSec">
                                            <div className='d-flex justify-content-between'>
                                                <div className="bottomBack">
                                                <div className="back-box">
                                                    <ArrowBackIcon onClick={()=>this.cubeDataByAction('back')}/>
                                                </div>
                                                </div>
                                                <div className="bottomBack ">
                                                <div className="totalviewcont DivCenter text-center d-flex">
                                                    {cubeData && cubeData?.datasets?.length>0 &&
                                                        <div className=""><h3>{ Utils.formatNumber(cubeData?.totalViews)}</h3></div>
                                                    }
                                                    <div className="align-self pl-3 ">
                                                        {/* {(cubeData?.totalViews - cubeData?.lastViews) > 0
                                                            ? <span className={"view_cont"}><ArrowUpwardIcon />{cubeData?.totalViews - cubeData?.lastViews}</span>
                                                            : <span className={"view_cont_negative"}><ArrowDownwardIcon />{-1 * (cubeData?.totalViews - cubeData?.lastViews)}</span>
                                                        } */}
                                                        {cubeData?.totalViews && <span className="view_days">Views last 30 days</span>}
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="bottomBack d-flex flex-row-reverse">
                                                {selectedDate !== moment().format("YYYY-MM-DD") &&
                                                    // <div className="back-box">
                                                    //     {/* <ArrowForwardIcon disabled /> */}
                                                    // </div>
                                                    // :
                                                    <div className="back-box">
                                                        <ArrowForwardIcon onClick={()=>this.cubeDataByAction('forward')} />
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                        </>
                    }
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container className="tabel_list mt-4 pb-4">
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <div className="graph_table coman-tabel">
                                        <LeadTable
                                            allLeads={allLeads}
                                            changeTab={this.changeTab}
                                            copyText={this.copyText}
                                            type={1}
                                            selectLead={this.selectLead}
                                            activePage={activePage}
                                            totalItemsCount={totalItemsCount}
                                            pagination={this.pagination}
                                            getLeadsData={this.getLeadsData}
                                            landing_variables={landing_variables}
                                            default_video_url={default_video_url}
                                            selected_template={selected_template}
                                            isLoadingLeadTable={isLoadingLeadTable}
                                            isLoadingLeadTablePagination={isLoadingLeadTablePagination}
                                            height={500}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </>
                    }
                </>
            }
            {tab == 3 &&
                <>
                    <Grid container className=" mt-4 pb-4">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <div className="top_bar">
                                <h4 className="title"><ArrowBackIcon onClick={() => this.changeTab(2)} />
                                 {/* <span className="align-self">{selected_lead['Analytics.videoName']}</span> */}
                                 <span className="align-self">Leads</span>
                                </h4>
                                <p>Sales teams new tactic for leads acquisition.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className="pr-lg-2 pt-3" >
                            <div className="tabel_list graph_table tabelcustom">
                                <div className="table-responsive">
                                    <LeadTable
                                        allLeads={allLeads}
                                        changeTab={this.changeTab}
                                        copyText={this.copyText}
                                        type={2}
                                        selectLead={this.selectLead}
                                        activePage={activePage}
                                        totalItemsCount={totalItemsCount}
                                        landing_variables={landing_variables}
                                        default_video_url={default_video_url}
                                        getLeadsData={this.getLeadsData}
                                        selected_template={selected_template}
                                        isLoadingLeadTable={isLoadingLeadTable}
                                        isLoadingLeadTablePagination={isLoadingLeadTablePagination}
                                        height={600}
                                        // pagination={this.pagination}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} className="pl-lg-2 pt-3" >
                            <div className="ada-lovelance">
                                <div className="ada_top d-flex justify-content-between">
                                    <div className="back-box">
                                        <ArrowBackIcon onClick={() => this.selectLead('', 2, '', 'back')} />
                                    </div>
                                    <div className="titale">
                                        <h3>{selected_lead['Analytics.videoName']}</h3>
                                    </div>
                                    <div className="back-box">
                                        <ArrowForwardIcon onClick={() => this.selectLead('', 2, '', 'next')} />
                                    </div>
                                </div>
                                <div className="table-lovelance">
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" onClick={() => this.setState({ leadTab: 'first' })} className={leadTab == 'first' ? "btn btn-primary" : "btn btn-secondary"}>Metrics</button>
                                        <button type="button" onClick={() => this.setState({ leadTab: 'second' })} className={leadTab == 'second' ? "btn btn-primary" : "btn btn-secondary"}>Activity</button>
                                    </div>
                                    <LeadTab
                                        selected_lead={selected_lead}
                                        activityLogs={activityLogs}
                                        isLoadingActivity= {isLoadingActivity}
                                        leadTab={leadTab}
                                        getVideo={this.getVideo}
                                        video_url={video_url}
                                        landing_variables={landing_variables}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}