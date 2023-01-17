import React, { useState, useEffect, useCallback } from "react";
import "./campaigns-list.scss";
import { Grid } from "@material-ui/core";
import CampaignsCards from "./campaigns/campaigns";
import { AppImage } from "../../$widgets/images/app-image";
import { CampaignService } from "../../../service/api/campaign.service";
import { useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SearchBar from "../../$widgets/search-bar/search";
import AllCampaigns from "../dashboard/all-campaigns/all-campaigns";
import { SegmentService } from "../../../service/api/segment.service";
import Pagination from "react-js-pagination";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Utils from '../../../service/core/utils'

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getSearch, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);

  const history = useHistory();

  const callApiToGetCampaigns = async (search,is_active=0,page=1) => {
    setSearch(search);
    setLoading(true);
    const campaigns = await CampaignService.getCampaignList(is_active,search,page);
    setLoading(false);
    setActivePage(page)
    setCampaigns(campaigns);
  };

  const createCampaign = () => {
    history.push("/campaign/script");
    SegmentService.analyticsTrack("Create New Campaign Started", {
      location: "all campaigns",
    });
  };
 
  useEffect(() => {
    callApiToGetCampaigns(getSearch,0, 1);
    SegmentService.analyticsTrack("Campaigns Accessed", {});
  }, []);
  
  const  pagination = (e) => {
    if(loading){
      return
    }
    setActivePage(e)
    callApiToGetCampaigns(getSearch,0, e)
  }
  
  const searchUsingDebounce = useCallback(Utils.debounce(callApiToGetCampaigns),[]);

  return (
    <div className="campaign-main-box">
      <h2>All Campaigns</h2>
      <Grid container className="Campaigns-search d-flex justify-content-end">
         <SearchBar placeholder="Search by campaign name" handdleOnchange={(e) => searchUsingDebounce(e.target.value)} />
      </Grid>
      <Grid container spacing={4} className="compaigns-box d-flex justify-content-start">
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        <div className="create-campaign" onClick={() => createCampaign()}>
          <div className="create-campaignDev">
            <h3>
              <AppImage name={"add-icon.svg"} />
              Create new campaign
            </h3>
          </div>
        </div>
        </Grid>
        {campaigns && campaigns?.rows ? (
          <CampaignsCards campaigns={campaigns?.rows} />
        ) : (
          loading && (
            <>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                  <div className="campaigns-list-main">
                    <div className="d-lg-flex justify-content-lg-between">
                      <div className="chart_cont">
                        <Skeleton variant="rounded" width={110} height={60} />
                      </div>
                      <div className="chart_list ">
                        <div className="campaigns-nmae d-flex justify-content-between">
                          <div style={{ width: "90%" }}>
                            <h6>
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                              />
                            </h6>
                            <span>
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                              />
                            </span>
                          </div>
                          <div className="">
                            <div className="share cursor-pointer">
                              <Skeleton
                                variant="rounded"
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div
                            className="views_list pr-2 "
                            style={{ width: "50%" }}
                          >
                            <h6 className={"tag_lineDev"}>
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                              />
                            </h6>
                            <h5 className={"titleDev"}>
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                              />
                            </h5>
                          </div>
                          <div className="views_list" style={{ width: "30%" }}>
                            <h5 className={"titleDev"}>
                              <Skeleton
                                variant="text"
                                sx={{ fontSize: "1rem" }}
                              />
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                );
              })}
            </>
          )
        )}
        
      </Grid>
      {campaigns?.count ? <> <BrowserView>
              <div className="text-right pagination-dev px-3 pb-3">
                <Pagination
                  activePage={activePage}
                  totalItemsCount={campaigns?.count}
                  itemsCountPerPage={11}
                  onChange={(e) => pagination(e)}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  pageRangeDisplayed={3}
                />
              </div>
            </BrowserView>
            <MobileView>
              <div className="text-right pagination-dev px-3 pb-3">
                <Pagination
                  activePage={activePage}
                  totalItemsCount={campaigns?.count}
                  itemsCountPerPage={11}
                  onChange={(e) => pagination(e)}
                  prevPageText={"Prev"}
                  nextPageText={"Next"}
                  pageRangeDisplayed={3}
                />
              </div>
            </MobileView> </>:""}
      
    </div>
  );
}
