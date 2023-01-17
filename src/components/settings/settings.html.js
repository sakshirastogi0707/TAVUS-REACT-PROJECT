import React from "react";
import { AppImage } from "../$widgets/images/app-image";
import { Grid, Paper, Popper, MenuList, Grow } from "@material-ui/core";
import "./settings.scss";
import _ from "lodash";
import CustomSelect from "../$widgets/input-fields/custom-select";
import Loader from "../$widgets/loader/loader";
import { ButtonGray } from "../$widgets/buttons/button-gray";
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import AppDialog from "../$widgets/AppDialog/AppDialog";
import TextFields from "../$widgets/input-fields/text-field";
import CheckboxLabels from "../$widgets/checkbox/checkbox";
import Success from "./success";
import Pending from "./pending";
import {SegmentService} from '../../service/api/segment.service'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import AddIcon from "@material-ui/icons/Add";
import LinearDeterminate from "../$widgets/app-progress/app-progress";
export function html() {
  const {
    isCSVModal,
    isVideoModal,
    isDeleteModal,
    isWaitingModal,
    domain_name,
    subdomain,
    userDomains,
    showScreen,
    userDomain,
    isLoading,
    isLoadingDomain,
    isLoadingValidate,
    msgValidate,
    templates,
    selected_template,
    errors,
    isDomainDeleteLoader,
  } = this.state;
  const {} = this.props;
  const { openModel, handleBackNavigation } = this;
  const self = this;
const configure=(id,domain,subDomain)=>{
  SegmentService.analyticsTrack('Configure Domain Accessed',{domain:domain,sub_domain:subDomain})
  this.props.history.push({
    pathname: "/settings/" +id,})
}
const OpenCsvModael = ()=>{
  this.setState({ isCSVModal: true })
  SegmentService.analyticsTrack('Add Domain Started',{})
}
const onclickNext = (sub_domain)=>{
  SegmentService.analyticsTrack('Subdomain Name Configured',{subdomain:sub_domain})
}
  return (
    <div className={"setting-main"}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {showScreen === "first" && (
            <>
              <Grid container className={"ds_setting"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className="d-flex justify-content-between">
                    <div className={"setting_title"}>Domains </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container className=" mt-4 pb-4">
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  {/* <div className="top_bar">
                      <h4 className="title"><ArrowBackIcon onClick={() => this.changeTab(2)} /> <span className="align-self">Leads</span></h4>
                      <p>Lorem ipsum dolor sit amet</p>
                  </div> */}
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} className="align-self">
                  <div className="d-flex d-flex-mobile justify-content-end ">
                    <div>
                      <ButtonGray
                        className="generateBtn"
                        onClick={() => OpenCsvModael()}
                      >
                        Add domain
                        <span className="pull-right">
                          <AddIcon />
                        </span>
                      </ButtonGray>
                    </div>
                  </div>
                </Grid>
              </Grid>
              {/* {
                _.isEmpty(userDomains)
                  ?
                  <Grid container className={''} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className={'text-center'}>
                        <div className={''}>
                          <AppImage name={'domain.svg'} />
                          <h3 className="main-title">You don’t have any domain yet!</h3>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  : */}
              <Grid container className={"ds"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div className={"card"}>
                    <div className={"card-body"}>
                      <div className="table-responsive">
                        <table className="table table-fixed">
                          <thead>
                            <tr>
                              <th Width="20%" className="table_title">
                                Domain
                              </th>
                              <th Width="20%">Subdomain</th>
                              <th Width="20%">Campaign Name</th>
                              <th Width="15%">Date Added</th>
                              <th Width="10%">Status</th>
                              <th Width="15%">DNS Config</th>
                              <th Width="10%">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userDomains &&
                              userDomains.length > 0 &&
                              userDomains.map((val, key) => {
                                return (
                                  <tr
                                    key={key}
                                    className={
                                      val.is_active === false
                                        ? "inactive"
                                        : "active"
                                    }
                                  >
                                    <td> {val.domain}</td>
                                    <td>{val.sub_domain}</td>
                                    <td>{val?.campaigns[0]?.campaign_name}</td>
                                    <td>{this.dateFormat(val.created_at)}</td>
                                    <td>
                                      <span
                                        className={
                                          val.is_active === false
                                            ? "status-inactive"
                                            : "status-active"
                                        }
                                      >
                                        {val.is_active === false
                                          ? "Inactive"
                                          : "Active"}
                                      </span>
                                    </td>
                                    {/* <td  >
                                      <AppImage  name={val.is_active === false ? 'configurations_inactive.svg' : 'eye_open_white.svg'} className="view_list" />
                                    </td> */}
                                    <td>
                                      {val.is_active === false ? (
                                        <ButtonLightBlue
                                          onClick={() =>
                                           configure(val.id,val.domain,val.sub_domain)
                                          
                                          }
                                          className="btn_custom"
                                        >
                                          Configure
                                        </ButtonLightBlue>
                                      ) : (
                                        <ButtonLightBlue
                                          onClick={() =>
                                            this.props.history.push({
                                              pathname: "/settings/" + val.id,
                                            })
                                          }
                                          className="btn_custom"
                                        >
                                          View
                                        </ButtonLightBlue>
                                      )}
                                    </td>

                                    <td>
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => this.confirmDelete(val)}
                                      >
                                        <AppImage
                                          name={"delete.svg"}
                                          Width="20"
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                          {userDomains &&
                            !isLoading &&
                            userDomains.length == 0 && (
                              <tr>
                                <td
                                  className=" cursor-pointer"
                                  colspan="6"
                                  style={{
                                    textAlign: "center",
                                    color: "white",
                                  }}
                                >
                                  No Data Found
                                </td>
                              </tr>
                            )}
                        </table>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              {/* } */}
            </>
          )}

          {showScreen === "second" && (
            <>
              {userDomain.is_active ? (
                <Success
                  userDomain={userDomain}
                  backToListing={this.backToListing}
                  history={this.props.history}
                />
              ) : (
                <Pending
                  msgValidate={msgValidate}
                  isLoadingValidate={isLoadingValidate}
                  validateDomain={this.validateDomain}
                  userDomain={userDomain}
                  backToListing={this.backToListing}
                  closeCollapse={this.closeCollapse}
                  makeDefault={this.makeDefault}
                />
              )}
            </>
          )}
        </>
      )}

      <AppDialog
        open={isDeleteModal}
        maxWidth={"sm"}
        onClose={() => this.openModel(false, "isDeleteModal")}
        modelTitle={" "}
        customClass={"custom"}
        content={
          <div className="setting-modalDiv text-center pt-4 pb-4">
            <div className="deleteDomain">
              <h3>Are you sure you want to delete this subdomain?</h3>
              <div className="settingbtn pt-4">
                <ButtonLightBlue
                  className="Btn mt-35 mb-2"
                  onClick={() => this.deleteDomain()}
                >
                  Yes
                </ButtonLightBlue>
                <ButtonLightBlue
                  className="Btn mt-35 mb-2"
                  onClick={() => this.openModel(false, "isDeleteModal")}
                >
                  No
                </ButtonLightBlue>
              </div>
            </div>
          </div>
        }
      />

      <AppDialog
        open={isWaitingModal}
        maxWidth={"sm"}
        modelTitle={" "}
        customClass={"custom"}
        customClassMain={"Waitingsec"}
        content={
          <div className="setting-modalDiv text-center">
            <div className="deleteDomain">
              <h3>
                Please wait, it will take a couple of mins for your domain to be
                deleted. Please do not refresh or close this window.
              </h3>
            </div>
            {isDomainDeleteLoader && <LinearDeterminate />}
          </div>
        }
      />

      <AppDialog
        open={isCSVModal}
        maxWidth={"sm"}
        onClose={() => this.openModel(false, "isCSVModal")}
        modelTitle={"Connect a domain name"}
        customClass={"custom"}
        content={
          <div className="setting-modalDiv">
            <div className="setting-modal">
              <p>
                Configure a domain name you already own to use as a branded
                domain for your videos. Please note that this is a technical
                procedure and DNS experience is recommended.
              </p>

              <div className="setting-text pt-4">
                <div className="mb-20">
                  <label className="text-left">
                    Choose a campaign<sup className="text-danger">*</sup>
                  </label>
                  <CustomSelect
                    onChange={this.handleChangeTemplate}
                    options={templates}
                    name="selected_template"
                    value={selected_template}
                  />
                </div>
                <label for="formGroupExampleInput">
                  What is your domain name
                </label>
                <TextFields
                  value={domain_name}
                  name="domain_name"
                  className="domain-name"
                  placeholder="tavus.io"
                  onChange={this.handleChange}
                />
                <ButtonLightBlue
                  className="Btn mt-35 mb-2"
                  onClick={() =>
                    this.nextStep(true, "isVideoModal", false, "isCSVModal",templates,selected_template)
                    // clickNext()

                  }
                >
                  Next
                </ButtonLightBlue>
              </div>
            </div>
          </div>
        }
      />

      <AppDialog
        open={isVideoModal}
        maxWidth={"sm"}
        className="video-modal"
        onClose={() =>
          !isLoadingDomain &&
          this.setState({ isVideoModal: false, domain_name: "", subdomain: "" })
        }
        modelTitle={"Subdomain"}
        customClass={"custom"}
        content={
          <div className="setting-modalDiv">
            <div className="setting-modal">
              <h3 className="sub-title">What would you like your subdomain to be?</h3>
              <div className="setting-text">
                <p>
                Your subdomain will be combined with your domain name to create the branded video URL. For example, if you'd like your branded video URL to be video.yourdomain.com, choose <b>video</b> as your subdomain. 
                </p>
                <div className="form-group mt-4">
                  <label for="formGroupExampleInput">Subdomain</label>
                </div>
                <div className="form-group">
                  <div className="d-flex justify-content-start">
                    <TextFields
                      value={subdomain}
                      name="subdomain"
                      placeholder="test"
                      onChange={this.handleChange}
                    />
                    <div className="align-self pl-1">
                      <span>.{domain_name}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  {isLoadingDomain ? (
                    <ButtonLightBlue
                      className={"Btn mb-2 mt-3 disabled-submit"}
                      onClick={onclickNext(subdomain)}
                    >
                      Next
                    </ButtonLightBlue>
                  ) : (
                    <>
                      <ButtonGray
                        className="Btn-white mt-35 mb-2 mr-2"
                        onClick={() =>
                          this.nextStep(
                            true,
                            "isCSVModal",
                            false,
                            "isVideoModal",
                            templates,selected_template
                          )
                        }
                      >
                        Back
                      </ButtonGray>
                      <ButtonLightBlue
                        className="Btn mt-35 mb-2 ml-2"
                        onClick={this.submit}
                      >
                        Next
                      </ButtonLightBlue>
                    </>
                  )}
                </div>
                <div className="d-flex loading-message">
                  {isLoadingDomain && <p>This may take a minute...</p>}
                </div>
              </div>
            </div>

            {isLoadingDomain && <LinearDeterminate />}
          </div>
        }
      />
    </div>
  );
}
