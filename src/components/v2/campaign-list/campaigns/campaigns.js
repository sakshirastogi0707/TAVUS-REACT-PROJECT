import React, { useEffect, useState } from "react";
import { AppImage } from "../../../$widgets/images/app-image";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Menu,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import AppDialogInvite from "../../../$widgets/AppDialogInvite/AppDialogInvite";
import "./campaigns.scss";
import Utils from "../../../../service/core/utils";
import IconLabelButton from "../../../$widgets/buttons/icon-label-buttons";
import {SegmentService} from '../../../../service/api/segment.service'
import { UserService } from "../../../../service/api/user-service";
import { CampaignService } from "../../../../service/api/campaign.service";
import { toast } from "react-toastify";
import Searchbar from "../../../$widgets/search-bar/search";
import { ButtonOutlined } from "../../../$widgets/buttons/button-outlined";

export default function CampaignsCards(props) {
  const { campaigns } = props;
  const history = useHistory();
  const [userDetail, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setModal] = useState(false);
  const [editCampaigns, setEditCampaigns] = useState(null);
  const [getSearch, setSearch] = useState(null);
  const [listUsers, setListUsers] = useState();
  const [selectedCampaignId, setSelectedCampaignId] = useState();
  const [isAssign, setIsAssign] = useState(1);
  const [assignData, setAssignData] = useState();
  const [email, setEmail] = useState("");
  const [userSelected, setUserSelected] = useState(0);
  const [userSelectedID, setUserSelectedID] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  const handleCampaignCardClick = async (campaign) => {
    if (campaign.video_count > 0) {
       history.push(`/dashboard/campaign/${campaign.id}`);
    } else {
      let lastStep = await UserService.getCampaignRoute(campaign.steps)
      history.push(`${lastStep}/${campaign.id}`);
    }
  };

  useEffect(() => {
    (async () => {
        setLoggedInUser(await UserService.getUserProfile())
    })();
  }, []);

  const getCampaignRoute = (steps) => {
      let footerSteps = "";
      if (loggedInUser?.role == "user") {
        if (!steps?.script || steps?.script == "false") {
          footerSteps = "Script";
        } else if (!steps?.voice || steps?.voice == "false") {
          footerSteps = "Voices";
        }  else if (!steps?.script_recording || steps?.script_recording == "false") {
          footerSteps = "Script Recording";
        } else if (!steps?.template || steps?.template == "false") {
          footerSteps = "Template";
        } else if (!steps?.background_video || steps?.background_video == "false") {
          footerSteps = "Background Video";
        } else if (!steps?.landing || steps?.landing == "false") {
          footerSteps = "Landing";
        } else if (
          !steps?.training_complete ||
          steps?.training_complete == "false"
        ) {
          footerSteps = "Training Complete";
        } else if (!steps?.set_variable || steps?.set_variable == "false") {
          footerSteps = "Set Variables";
        } else if (!steps?.first_video || steps?.first_video == "false") {
          footerSteps = "First Video";
        }
      return footerSteps;
    };
  }
  const getListData = async (
    campaign_id = false,
    search = false,
    assign = 1
  ) => {
    setSelectedCampaignId(campaign_id);
    SegmentService.analyticsTrack('Share Campaign Started',{campaignId:campaign_id})
    const response = await CampaignService.listUsersCampaign(
      campaign_id,
      search,
      assign
    );
    const res = response.rows;
    if (response) {
      try {
        if (assign === 0) {
          setAssignData(res);
          
        }
        if (assign == 1) {
          setListUsers(res);
        }
      } catch (err) {
        console.log(err);
      }
    }

    setModal(true);
  };
  const shareUsersCompaign = async (userID) => {
    const requestParams = {
      user_ids: [userID],
      campaign_ids: [selectedCampaignId],
    };
    const response = await CampaignService.assignUsersCampaign(requestParams);
    if (response) {
      try {
        toast.success(response.message);
        setEmail("");
        setSearch(null);
        setUserSelected(0);
        getListData(selectedCampaignId, getSearch);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getInitials = function (string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  const unassignCampaigns = async (userID,email) => {
    const response = await CampaignService.unassignUsersCampaign(
      selectedCampaignId,
      userID
    );
    if (response) {
      try {
        SegmentService.analyticsTrack('User Unassigned',{campaignId:userID,email:email})
        toast.success(response.message);
      } catch (err) {
        console.log(err);
      }
    }
    getListData(selectedCampaignId, getSearch);
  };

  const listAssignedCampaigns = async (event) => {
    setUserSelected(0);
    const inputValue = event.target.value;
    setSearch(inputValue);
    if (inputValue !== "") {
      setIsAssign(0);
    }
    setEmail(inputValue);
    if (inputValue === null || inputValue === "") {
      setAssignData(null);
    } else {
      getListData(selectedCampaignId, inputValue, isAssign);
    }
  };

  const closeAssignPopUp = async () => {
    setModal(false);
    setSearch("");
    setSelectedCampaignId();
    setListUsers();
    setAssignData();
    setUserSelected();
    setEmail();
  };
  const onselectCampaign = async (email, campaign_id) => {
    
    setEmail(email);
    SegmentService.analyticsTrack('User Assigned',{CampaignId:selectedCampaignId,inviteeEmail:email})

    setUserSelected(1);
    setAssignData();
    setUserSelectedID(campaign_id);
  };

  const getStringToDisplay = (campaigns) =>{
    const findQa = campaigns['campaign_access'].filter((item) =>{
                  return item.user_info?.role == 'qa'
    })
    return findQa && findQa.length >0 ? 'QA assigned' : 'Assign QA';
  }

  const disableIntegrations = async () =>{
    const res = await CampaignService.disableIntegrations(editCampaigns);
    if(res){
      history.push(`edit-campaign/template/${editCampaigns}`)
    }
  }

  return (
    <>
      {campaigns.map((c) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <div className="campaigns-list-main">
            <div className="d-lg-flex justify-content-lg-between">
              <div className="chart_cont">
                <AppImage
                  src={
                    c.thumbnail_url
                      ? c.thumbnail_url
                      :`${process.env.REACT_APP_IMAGE_URL}/assets/images/megaphone-free-icon-font.png`
                  }
                />
              </div>
              <div className="chart_list ">
                <div className="campaigns-nmae d-flex justify-content-between">
                  <div>
                    <h6
                      className={"tag_line cursor-pointer"}
                      onClick={() => handleCampaignCardClick(c)}
                    >
                      {c.campaign_name}
                    </h6>
                    <span>{Utils.getFormattedDate(c.created_at)}</span>
                  </div>
                    <div className="share-edit-box">
                      {/* {c?.steps?.first_video==='true' &&
                        <div className="share cursor-pointer">
                        <AppImage
                          onClick={()=> setEditCampaigns(c.id)}
                          name="pencil3.svg"
                          width="18"
                        />
                      </div>
                      } */}
                      
                      {c?.steps?.background_video == "true" && (
                        <div className="">
                          <div className="share cursor-pointer">
                            <AppImage
                              onClick={() => getListData(c.id)}
                              name="share-3-alternate.svg"
                              width="20"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="views_list pr-2">
                    <h6 className={"tag_lineDev"}>Videos</h6>
                    <h5 className={"titleDev"}>{c.video_count}</h5>
                  </div>
                  {c.video_count == 0 && (
                    <div className="views_list pr-2">
                      <h6 className={"tag_lineDev"}>Last Step</h6>
                      <h5 className={"titleDev"}>
                        {getCampaignRoute(c.steps)}
                      </h5>
                    </div>
                  )}
                  {/* <div className="views_list">
                                    <h6 className={'tag_lineDev'}>Impressions</h6>
                                    <h5 className={'titleDev'}>0</h5>
                                </div>
                                <span className='borderSec'></span>
                                <div className="views_list">
                                    <h6 className={'tag_lineDev'}>Views</h6>
                                    <h5 className={'titleDev'}>0</h5>
                                </div> */}
                  <div className="views_list">
                    <h6 className={"tag_lineDev"}>
                      {c.video_count > 0 ? "" : "Unpublished"}
                     
                    </h6>
                    {loggedInUser && loggedInUser.role === 'admin' ?
                        <h6 className={"tag_lineDev"}>
                        {c.video_count > 0 ? 
                          <span>{getStringToDisplay(c)}</span>
                          : 
                          null
                        }
                      </h6>
                      :
                      null
                    }
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        );
      })}
      {/* <div className="campaigns-list ">
            <div className="d-lg-flex justify-content-lg-between">
                <div className="chart_cont">
                <AppImage name={"img.svg"} />
                </div>
                <div className="chart_list ">
                    <div className='campaigns-nmae'>
                    <div className='campaigns-nmae d-flex justify-content-between'>
                        <div className=''>
                            <h6 className={'tag_line'}>Campaign A</h6>
                            <span>Jan 12, 2022 at 11:59pm</span>
                        </div>
                            <div className=''> 
                                    <div className='share'>
                                        <AppImage name="share-3-alternate.svg" /> 
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='last-stap pr-2'> <h5>Last step: Landing Page Creation </h5></div>
                        <div className='last-stap align-self'> <h5>Unpublished </h5></div>
                    </div>
                    
                </div>
            </div>
        </div> */}
      <AppDialogInvite open={editCampaigns}
          maxWidth={'md'}
          className="video-modal"
          customClassMain="microphoneDev edit-campaigns"
          onClose={() => setEditCampaigns(false)}
          content={
            <div className='contentModal'>
              <div className="topsection">
                <h1>Any integrations for this campaign will be disabled</h1>
                <h6>You can reconfigure your integrations once you finish editing</h6>
              </div>
              <div className='continue-button'>
                <ButtonOutlined className={"selected"} onClick={()=> disableIntegrations()}> Continue </ButtonOutlined>
                <ButtonOutlined onClick={() => setEditCampaigns(false)}> Cancel </ButtonOutlined>
              </div>
            </div>
          }
      />
      <AppDialogInvite
        open={openModal}
        maxWidth={"md"}
        onClose={() => closeAssignPopUp()}
        customClassMain="assign-user"
        modelTitle={"Add Collaborators"}
        content={
          // <>{this.state.isLoadingPopup ? <Loader /> :
          <div className="contentModal assign_user">
            <div className="search-section">
              <div className={"searchDiv align-self p-0"}>
                <div className={"search-icon assignUser1"}>
                  <div className="fixedDrop md-form mt-0">
                    <label>Search by first name, email address</label>
                    <div className="d-flex justify-content-between">
                      <div className="position-relative SearchBox">
                        <Searchbar
                          className="customInput"
                          variant="outlined"
                          placeholder="Search Collaborator"
                          id="input"
                          handdleOnchange={(e) => listAssignedCampaigns(e)}
                          value={email}
                          autoComplete="off"
                          type="text"
                        />
                        <ul className="listAddress">
                          {assignData?.map((data) => {
                            return (
                              <li
                                onClick={() =>
                                  onselectCampaign(data.email, data.id)
                                }
                                className={"li-active"}
                                style={{ cursor: "pointer" }}
                              >
                                {data.email}
                                {/* <AppImage
                                  name={"check-gray.svg"}
                                  width={"16"}
                                  className="pull-right pt-1"
                                /> */}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="AssignButton align-self">
                        <IconLabelButton
                          title="Assign"
                          className={userSelected == 1 ? "" : "disabled"}
                          onClick={() => shareUsersCompaign(userSelectedID)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invite-user-list">
                  <table className="table table-fixed">
                    <tbody>
                      {listUsers?.map((temp) => {
                        return (
                          <tr
                            className={
                              temp.user_campaigns.length > 0
                                ? "active-assign-user"
                                : ""
                            }
                          >
                            {/* className= {temp.id === selectedUserId ? "active": ""} */}
                            <td width="60px">
                              <div className="userbox">
                                <span
                                  className={"user-circle"}
                                  style={{ background: temp?.avatar_color }}
                                >
                                  {temp.fullName
                                    ? getInitials(temp.fullName)
                                    : getInitials(
                                        temp.first_name,
                                        temp.last_name
                                      )}
                                </span>
                              </div>
                            </td>
                            <td className="align-self">
                              <span
                                className={
                                  temp.user_campaigns.length > 0
                                    ? "disabled"
                                    : "list-user cursor-pointer"
                                }
                              >
                                {temp.email}
                              </span>
                            </td>
                            <td className="text-right">
                              {temp.user_campaigns.length > 0 ? (
                                <IconLabelButton
                                  title="Un-assign"
                                  onClick={() => unassignCampaigns(temp.id,temp.email)}
                                />
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
        //   </>
        // }
      />
    </>
  );
}
