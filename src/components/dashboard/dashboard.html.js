import React, { useState } from "react";
import { AppImage } from "../$widgets/images/app-image";
import {
  Grid,
  Paper,
  Popper,
  Menu,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Grow,
} from "@material-ui/core";
import { TextareaAutosize, TextField } from "@material-ui/core";
import "./dashboard.scss";
import _ from "lodash";
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import { ButtonGray } from "../$widgets/buttons/button-gray";

import AppDialog from "../$widgets/AppDialog/AppDialog";
import CustomSelect from "../$widgets/input-fields/custom-select";
import Loader from "../$widgets/loader/loader";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "react-js-pagination";
import ReactPlayer from "react-player";
import { CSVLink, CSVDownload } from "react-csv";
import { Link } from "@material-ui/core";
import SingleDropdown from "../$widgets/dropdown/singledropdown";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import AppMenu from "../$widgets/app-menu/app-menu";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import Utils from "../../service/core/utils";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { SegmentService } from "../../service/api/segment.service";
import Searchbar from "../$widgets/search-bar/search";
import AppDialogInvite from "../$widgets/AppDialogInvite/AppDialogInvite";
import DateTimeRangePickers from "../$widgets/daterangepicker/date-time-range-picker";
import DateRangePickers from "../$widgets/date-range-picker/date-range-picker";
import SearchBar from "../$widgets/search-bar/search";
import IconLabelButton from "../$widgets/buttons/icon-label-buttons";
import DatePicker from "../$widgets/date-range-picker/date-range-picker";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const options = [
  { value: "blues sdadad", label: "Blues dsdada" },
  { value: "rock", label: "Rock adadad" },
  { value: "jazz", label: "Jazz dadad dada" },
];
let validQaUsers = [];
export default function UploadVideo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <AppImage name={"upload_icon.svg"} className="cursor-pointer" />
      </label>
    </div>
  );
}

export function html() {
  const {
    isRequestModal,
    isCSVModal,
    isLoading,
    allVideos,
    isShareModal,
    errors,
    templates,
    selected_template,
    dynamicVariables,
    gif_thumbnail_url,
    custom_cta,
    still_image_thumbnail_url,
    hosted_url,
    open,
    isVideoModal,
    isLoadingCsv,
    isLoadingRequest,
    generated,
    openSearch,
    filter_column,
    filter_status,
    isSuccessModel,
    totalItemsCount,
    default_video_url,
    other_data,
    isVideoError,
    errorBtns,
    openPoper,
    editData,
    isRequestModalUpdate,
    userData,
    anchorEl,
    menuOpen,
    novideoMessage,
    requestType,
    selectedUser,
    videoLoad,
    selectedTemp,
    next_cursor,
    isTemplateModal,
    templateForVideo,
    other_custom_value,
    qa_status,
    qaFilter,
    selectedVideoStatus,
    csvDownloadData,
    isDownload,
    isDialogOpenFilter,
    searchById,
    searchByTitle,
    startDate,
    endDate,
  } = this.state;
  const { openModel, handleBackNavigation } = this;
  const self = this;
  const model = () => {
    this.openModel(true, "isTemplateModal");
    SegmentService.analyticsTrack("One Off Started", {});
  };
  const createCampaign = () => {
    SegmentService.analyticsTrack("Create New Campaign Started", {
      location: "home screen",
    });

    this.props.history.push("/campaign/script");
  };
  const openModel2 = () => {
    this.setState({ isDialogOpenFilter: true });
  };
  return (
    <div className={"dashboard-main"}>
      <Grid container className={"ds"}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="d-flex justify-content-between">
            <div className={"title"}>
              Videos{" "}
              {totalItemsCount ? (
                <span style={{ color: "#f67272" }}>
                  {totalItemsCount && "(" + totalItemsCount + ")"}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className=" mt-4 pb-4">
        <Grid item xs={12} sm={12} md={12} lg={12} className="align-self">
          <div className="d-flex d-flex-mobile justify-content-end ">
            <div className="search-filter downloadBtn pr-2 ">
              <ButtonLightBlue
                className="generateBtn"
                onClick={() => openModel2()}
              >
                <span className="pull-right">
                  <AppImage name={"filter.svg"} width="15" />
                </span>
              </ButtonLightBlue>
            </div>
            <div className="search-filter downloadBtn pr-2 ">
              <ButtonLightBlue
                disabled={isDownload}
                type="button"
                onClick={this.Downloadcsv}
                className="generateBtn"
              >
                <span className="pull-right">
                  <AppImage name={"download-icon.svg"} />
                </span>
              </ButtonLightBlue>
              <CSVLink
                filename={"videos-list.csv"}
                data={csvDownloadData}
                ref={this.csvLink}
                className="hidden"
                target="_blank"
              />
            </div>
            <div className="pr-2">
              <ButtonLightBlue
                className="generateBtn"
                onClick={() => createCampaign()}
              >
                {" "}
                Create New Campaign{" "}
              </ButtonLightBlue>
            </div>
            <div className="Generatevideo  pr-2">
              <ButtonLightBlue className="generateBtn" onClick={() => model()}>
                {" "}
                Generate{" "}
                <span className="pull-right">
                  <AddIcon />
                </span>
              </ButtonLightBlue>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={"card"}>
        <div className={"card-body"}>
          <div className="table-responsive">
            <table className="table table-fixed">
              <thead>
                <tr>
                  <th width="11%" className="table_title">
                    Videos
                  </th>
                  <th width="18%">Video Title</th>
                  <th width="9%">Request ID</th>
                  <th width="12%">Date</th>
                  <th width="10%">
                    <span
                      onClick={() => this.filterTable("campaign_id")}
                      className={filter_column == "campaign_id" ? "enble" : " "}
                    >
                      Campaign{" "}
                      <AppImage
                        className={
                          filter_column == "campaign_id" &&
                            filter_status == "DESC"
                            ? "arrowSelect showDivClick"
                            : "showDivClick"
                        }
                        name="filter_down.svg"
                      />
                      <AppImage
                        className={
                          filter_column == "campaign_id" &&
                            filter_status == "ASC"
                            ? "arrowSelect showDiv"
                            : "showDiv"
                        }
                        name={"filter_down.svg"}
                      />
                    </span>
                  </th>
                  <th width="16%">
                    <span
                      onClick={() => this.filterTable("Status")}
                      className={filter_column == "Status" ? "enble" : " "}
                    >
                      Status{" "}
                      <AppImage
                        className={
                          filter_column == "Status" && filter_status == "DESC"
                            ? "arrowSelect showDivClick"
                            : "showDivClick"
                        }
                        name="filter_down.svg"
                      />
                      <AppImage
                        className={
                          filter_column == "Status" && filter_status == "ASC"
                            ? "arrowSelect showDiv"
                            : "showDiv"
                        }
                        name={"filter_down.svg"}
                      />
                    </span>
                  </th>
                  <th width="15%" className="videoUL">
                    URL
                  </th>

                  {userData &&
                    (userData.role !== "user" ||
                      validQaUsers.includes(userData.id)) && (
                      <th width="6%">
                        <span
                          onClick={() => this.filterTable("qa_status")}
                          className={
                            filter_column == "qa_status" ? "enble" : " "
                          }
                        >
                          QA{" "}
                          <AppImage
                            className={
                              filter_column == "qa_status" &&
                                filter_status == "DESC"
                                ? "arrowSelect showDivClick"
                                : "showDivClick"
                            }
                            name="filter_down.svg"
                          />
                          <AppImage
                            className={
                              filter_column == "qa_status" &&
                                filter_status == "ASC"
                                ? "arrowSelect showDiv"
                                : "showDiv"
                            }
                            name={"filter_down.svg"}
                          />
                        </span>
                      </th>
                    )}
                  <th width="2%"></th>
                  <th width="1%"></th>
                </tr>
              </thead>
              {isLoading ? (
                <Loader />
              ) : (
                <tbody>
                  {allVideos.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          userData &&
                          (userData.role !== "user" ||
                            validQaUsers.includes(userData.id)) &&
                          "tr-" + item.qa_status
                        }
                      >
                        <td>
                          {item?.hosted_url && item.status == "ready" ? (
                            <AppImage
                              className="video-thumb"
                              onClick={() => this.openVideo(item?.stream_url)}
                              src={item.still_image_thumbnail_url}
                            />
                          ) : item.status.includes("error") ? (
                            <AppImage
                              className="video-thumb"
                              name={"Error.png"}
                            />
                          ) : (
                            <AppImage
                              className="video-thumb"
                              name={"Generating.png"}
                            />
                          )}
                          &ensp;
                        </td>
                        <td>
                          {item?.edit ? (
                            <textarea
                              onKeyPress={(event) =>
                                this.submitNameChange(0, event, item)
                              }
                              onBlur={(event) =>
                                this.submitNameChange(1, event, item)
                              }
                              onChange={(e) => this.updateName(e, index)}
                              className="table_header_name form-control"
                              type="text"
                              value={item?.video_title}
                            />
                          ) : (
                            <span>
                              {item?.data?.override_heading1
                                ? item?.data?.override_heading1
                                : item?.landing_page_strings?.heading1}
                            </span>
                          )}
                        </td>
                        <td>{item?.id}</td>
                        <td>
                          <p>{this.getDate(item?.created_at, "date")}</p>
                          <p>{this.getDate(item?.created_at, "time")}</p>
                        </td>
                        <td>{item?.campaign_name}</td>
                        <td>{this.getStatus(item)}</td>
                        {item?.hosted_url && item?.status == "ready" ? (
                          <td className="videoUL">
                            <span className="url_video">
                              <Link
                                onClick={() =>
                                  window.open(item?.hosted_url, "_blank")
                                }
                              >
                                {" "}
                                {Utils.trimCharacterLength(
                                  item?.hosted_url,
                                  25
                                )}
                              </Link>
                            </span>
                            <span
                              className="copytext align-self"
                              onClick={(e) =>
                                this.copyText(e, item?.hosted_url)
                              }
                            >
                              {" "}
                              <AppImage name={"copy-icon.svg"} />
                            </span>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        <td className="text-end">
                          {userData &&
                            (userData.role !== "user" ||
                              validQaUsers.includes(userData.id)) && this.getStatus(item) != "Generating 🚀" && this.getStatus(item) != "Regenerating 🚀" && (<>
                                {(item.qa_status === null ||
                                  item.qa_status === "unreviewed") && (
                                    <span className="close_btn d-flex justify-content-between">
                                      {item.status.includes("error") ? (
                                        <></>
                                      ) : (
                                        <>
                                          <AppImage
                                            onClick={() =>
                                              this.submitQaStatus("Pass", item.id)
                                            }
                                            name={"circle-check-icon.svg"}
                                          />
                                          <AppImage
                                            onClick={() =>
                                              this.setState({
                                                isVideoError: true,
                                                qaVideoID: item.id,
                                              })
                                            }
                                            name={"close-circle-icon.svg"}
                                          />
                                        </>
                                      )}
                                    </span>
                                  )}

                                {item.qa_status === "Pass" && (
                                  <span
                                    className="close_btn"
                                    style={{ color: "#219653" }}
                                  >
                                    Pass
                                  </span>
                                )}
                                {item.qa_status === "Fail" && (
                                  <span
                                    className="close_btn"
                                    style={{ color: "#eb5757" }}
                                  >
                                    Fail
                                  </span>
                                )}
                              </>
                            )}
                        </td>
                        {userData &&
                          (userData.role !== "user" ||
                            validQaUsers.includes(userData.id)) ? (
                          item.qa_status === "Fail" ? (
                            <td>
                              {this.getIssue(
                                item?.issue_types,
                                item?.qa_status
                              )}
                            </td>
                          ) : (
                            <td></td>
                          )
                        ) : (
                          ""
                        )}
                        <td>
                          <span
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? "true" : undefined}
                            onClick={(e) => this.handleToggle(e, item?.id)}
                            //onClick={this.handleClickMenu}
                            className="dotteds"
                          >
                            <AppImage name={"dote.png"} />
                          </span>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={this.state.toggleId === item?.id && menuOpen}
                            onClose={this.handleCloseMenu}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            {this.getStatus(item) != "Generating 🚀" && (
                              <MenuItem
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Do you want to delete this video?"
                                    )
                                  ) {
                                    this.deleteVideo(item?.id);
                                  }
                                }}
                              >
                                Delete
                              </MenuItem>
                            )}
                            <MenuItem onClick={() => this.retry(item)}>
                              Regenerate
                            </MenuItem>
                            {/* } */}
                            <MenuItem
                              onClick={() =>
                                this.openShareModel(true, "isShareModal", item)
                              }
                            >
                              Share
                            </MenuItem>
                            <MenuItem onClick={() => this.editVideo(item)}>
                              Edit
                            </MenuItem>
                            {userData && userData.role !== "user" && this.getStatus(item) != "Generating 🚀" && (item.qa_status == 'Pass' || item.qa_status == 'Fail') && (
                              <MenuItem onClick={() => this.resetQaStatus(item)}>
                                Reset Qa Status
                              </MenuItem>
                            )}
                          </Menu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              {!videoLoad && !isLoading && allVideos.length == 0 && (
                <tr>
                  <td
                    className="not_found cursor-pointer"
                    colspan="9"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    <h4>No Data Found</h4>
                  </td>
                </tr>
              )}
            </table>
          </div>

          <BrowserView>
            <div className="text-right pagination-dev px-3 pb-3">
              <Pagination
                activePage={this.state.activePage}
                totalItemsCount={this.state.totalItemsCount}
                itemsCountPerPage={20}
                pageRangeDisplayed={3}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                onChange={(e) => this.pagination(e)}
              />
            </div>
          </BrowserView>

          <MobileView>
            <div className="text-right pagination-dev px-3 pb-3">
              <Pagination
                activePage={this.state.activePage}
                totalItemsCount={this.state.totalItemsCount}
                itemsCountPerPage={20}
                pageRangeDisplayed={3}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                onChange={(e) => this.pagination(e)}
              />
            </div>
          </MobileView>
        </div>
      </div>
      {/* } */}

      <AppDialog
        open={isTemplateModal}
        maxWidth={"xs"}
        customClassMain="csv-upload-modal"
        onClose={() => this.openModel(false, "isTemplateModal")}
        modelTitle={"Select Campaign"}
        content={
          <div className="">
            <div className="contentModal">
              <div className="">
                <div className="mb-20">
                  <label className="text-left">
                    Campaign<sup className="text-danger">*</sup>
                  </label>
                  <CustomSelect
                    onChange={this.handleChangeTemplate}
                    options={templates}
                    name="templateForVideo"
                    value={templateForVideo}
                  />
                  {errors["templateForVideo"] && (
                    <span className="error">{errors.templateForVideo}</span>
                  )}
                </div>
                {/* </div> */}
                <div className="uploadbtn">
                  <ButtonLightBlue
                    className=" mt-35 mb-2"
                    onClick={() => this.gottoVideo(templateForVideo, templates)}
                  >
                    Next
                  </ButtonLightBlue>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <AppDialog
        open={isRequestModal}
        maxWidth={"sm"}
        className="request-modal model_basics"
        onClose={() => this.openModel(false, "isRequestModal")}
        modelTitle={"Create a video 🍿"}
        content={
          <div className="contentModal">
            {isLoadingRequest ? (
              <Loader />
            ) : (
              <>
                <div className="model-sec">
                  <h5 className="text-left">Video Basics</h5>
                  <div className="select_templateMd mb-20">
                    <label className="text-left">
                      Select Campaign<sup className="text-danger">*</sup>
                    </label>
                    <SingleDropdown
                      onChange={this.handleChange}
                      options={this.state.tempData}
                      name="selected_template"
                      value={selected_template}
                    />
                    {errors["selected_template"] && (
                      <span className="error">{errors.selected_template}</span>
                    )}
                  </div>
                  {generated ? (
                    <div className={"switchBtn text-left position-relative"}>
                      <div className="switch-field">
                        <input
                          type="radio"
                          onChange={() => this.handleChangeSwitch(true)}
                          id="radio-one"
                          name="switch-one"
                          value="true"
                          checked={this.state.switchUrl == true}
                        />
                        <label for="radio-one">Upload Background File</label>
                        <input
                          type="radio"
                          onChange={() => this.handleChangeSwitch(false)}
                          id="radio-two"
                          name="switch-one"
                          value="false"
                          checked={this.state.switchUrl == false}
                        />
                        <label for="radio-two">Autorecord URL</label>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.switchUrl && generated && (
                    <>
                      {this.state.uploaded_url ? (
                        <div className="position-relative close-video mt-3">
                          <label>
                            <AppImage
                              name={"XMLID.svg"}
                              className="cursor-pointer"
                            />
                            <span className="cross_icon_vid">
                              <AppImage
                                name={"cross_icon.svg"}
                                onClick={() => this.deleteVideoS3()}
                                className="cursor-pointer"
                              />
                            </span>
                          </label>
                          <label>{this.state.uploadedVideoName}</label>
                        </div>
                      ) : (
                        <div className="uploaVideo">
                          <div className="uploadmain justify-content-center">
                            <div className="uploadSvg">
                              <label
                                htmlFor="icon-button-file"
                                className="upload-button"
                              >
                                <AppImage
                                  name={"upload.svg"}
                                  width="50"
                                  className="cursor-pointer"
                                />
                              </label>
                              <h5>Upload Video</h5>
                              <p>
                                Drag in a video file or click to choose a file
                                <br />
                                Supported Files: .webm, .mp4, .mov
                              </p>
                              <form>
                                <input
                                  type="file"
                                  accept="video/*"
                                  onChange={this.uploadVideo}
                                />
                              </form>
                              <span className="upload-button">
                                {this.state.uploadedCsvName}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {generated && !this.state.switchUrl ? (
                    <div className="mb-20">
                      <label className="text-left" for="videoname">
                        Background Video URL<sup className="text-danger">*</sup>
                      </label>
                      <input
                        className="input"
                        value={this.state.background_url}
                        onChange={this.handleChangeName}
                        name="background_url"
                        id="background_url"
                        placeholder="http://www.apple.com"
                      />
                      {errors["background_url"] && (
                        <span className="error">{errors.background_url}</span>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {custom_cta ? (
                    <div className="mb-20">
                      <label className="text-left" for="videoname">
                        CTA URL<sup className="text-danger">*</sup>
                      </label>
                      <input
                        className="input"
                        onChange={this.handleChangeName}
                        name="custom_cta_url"
                        id="custom_cta_url"
                        placeholder="http://www.apple.com"
                      />
                      {errors["custom_cta_url"] && (
                        <span className="error">{errors.custom_cta_url}</span>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  {Object.keys(other_data).map(function (key, index) {
                    return (
                      <div className="mb-20">
                        <label className="text-left" for="videoname">
                          {key}
                          <sup className="text-danger">*</sup>
                        </label>
                        <input
                          className="input"
                          onChange={self.handleChangeLink}
                          name={key}
                          id={key}
                          placeholder="http://www.apple.com"
                        />
                        {errors[key] && (
                          <span className="error">{errors[key]}</span>
                        )}
                      </div>
                    );
                  })}
                  <div className="mb-20">
                    <label className="text-left" for="videoname">
                      Override Video Title
                    </label>
                    <div>
                      {" "}
                      <input
                        className="input"
                        onChange={this.handleChangeName}
                        name="video_name"
                        id="video_name"
                        placeholder={this.state.title_script}
                      />
                    </div>{" "}
                    {errors["customfield"] && (
                      <span className="error">{errors.video_name}</span>
                    )}
                  </div>

                  {dynamicVariables && dynamicVariables.length > 0 && (
                    <h5 className="text-left">Video Variables</h5>
                  )}
                  {dynamicVariables &&
                    dynamicVariables.length > 0 &&
                    dynamicVariables.map((val, key) => {
                      return (
                        <div cButtonLightBluelassName="mb-20 d-flex justify-content-between">
                          <div className="VariablMain">
                            <label className="text-left" for="Variables2">
                              {val?.label}
                              <sup className="text-danger">*</sup>
                            </label>
                            <div className=" d-flex justify-content-between">
                              <div className="Variable-input">
                                <input
                                  className="input"
                                  onChange={this.handleVariables}
                                  name={val?.label}
                                  value={val?.value}
                                  id={val?.label}
                                  placeholder={val?.placeHolderText}
                                />
                              </div>
                              <div className="pl-2 roundBg position-relative">
                                {selected_template.value && (
                                  <span
                                    onClick={() =>
                                      this.playAudio(
                                        val?.value,
                                        val?.label,
                                        key
                                      )
                                    }
                                  >
                                    {!this.state.variablePlaying &&
                                      this.state.playVariable &&
                                      this.state.playIndex == key ? (
                                      <div className="loading-overlay-fixed">
                                        <AppImage
                                          name={"loader.gif"}
                                          width="60"
                                        />
                                      </div>
                                    ) : this.state.playIndex == key &&
                                      this.state.variablePlaying ? (
                                      <AppImage
                                        name={"pause.svg"}
                                        width="20"
                                        className="cursor-pointer polygon"
                                      />
                                    ) : val?.mp3 ? (
                                      <AppImage
                                        name={"retry_icon.svg"}
                                        width="20"
                                        className="cursor-pointer polygon"
                                      />
                                    ) : (
                                      <AppImage
                                        name={"polygon.svg"}
                                        width="20"
                                        className="cursor-pointer Playicon polygon"
                                      />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                            {errors[val?.label] && (
                              <span className="error text-left">
                                {errors[val?.label]}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  <ButtonLightBlue onClick={this.submit} className="mt-35 mb-2">
                    Generate 🚀
                  </ButtonLightBlue>
                </div>
              </>
            )}
          </div>
        }
      />

      <AppDialog
        open={isCSVModal}
        maxWidth={"xs"}
        className="csv-upload-modal"
        onClose={() => this.openModel(false, "isCSVModal")}
        modelTitle={"Upload CSV"}
        content={
          <div className="">
            {!this.state.csvData.length > 0 && (
              <div className="text-left">
                <Link>
                  <AppImage
                    name={"download_icon.svg"}
                    width="16"
                    className="cursor-pointer"
                  />
                </Link>
              </div>
            )}

            <div className="contentModal">
              {isLoadingCsv ? (
                <Loader />
              ) : (
                <div className="">
                  <p className="mb-5">Upload a file</p>
                  {this.state.csvData.length > 0 ? (
                    <div className="position-relative">
                      <label>
                        <AppImage name={"csv.svg"} className="cursor-pointer" />
                        <span className="cross_icon">
                          <AppImage
                            name={"cross_icon.svg"}
                            onClick={() =>
                              this.setState({
                                csvData: [],
                                uploadedCsvName: "",
                              })
                            }
                            className="cursor-pointer"
                          />
                        </span>
                      </label>
                      <label>{this.state.uploadedCsvName}</label>
                    </div>
                  ) : (
                    <div className="position-relative justify-content-center">
                      <div className="uploadDiv">
                        <label
                          htmlFor="icon-button-file"
                          className="upload-button"
                        >
                          <AppImage
                            name={"upload_icon.svg"}
                            className="cursor-pointer"
                          />

                          <input
                            id="icon-button-file"
                            type="file"
                            onChange={this.confirmFunction}
                          />
                        </label>
                      </div>
                      <span className="upload-button">
                        {this.state.uploadedCsvName}
                      </span>
                    </div>
                  )}
                  <ButtonLightBlue
                    className="Btn mt-35 mb-2"
                    onClick={() => this.handleCsvUpload()}
                  >
                    Submit
                  </ButtonLightBlue>
                </div>
              )}
            </div>
          </div>
        }
      />

      <AppDialog
        open={isShareModal}
        maxWidth={"sm"}
        className="share-modal"
        onClose={() => this.openShareModel(false, "isShareModal", "")}
        modelTitle={"Share Video"}
        content={
          <div className="contentModal">
            <div>
              <ReactPlayer
                controls={true}
                className="img-fluid"
                url={this.state.stream_url}
                config={{
                  file: {
                    forceHLS: true,
                  },
                }}
              />
              <div className="d-flex mt-4 mb-4">
                <input
                  type="text"
                  className="copytext"
                  value={this.state.landingPageUrl}
                  id="vehicle-url"
                  readOnly={true}
                  placeholder="Share URL"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => this.copyText(e, this.state.landingPageUrl)}
                >
                  Copy
                </button>
              </div>
              {this.state.mux_id && (
                <ButtonLightBlue
                  onClick={() => this.downloadVideo()}
                  className="Btn mb-3"
                >
                  Download Video
                </ButtonLightBlue>
              )}

              <ButtonLightBlue
                onClick={(e) =>
                  this.clickOnDiv2(
                    e,
                    gif_thumbnail_url,
                    this.state.landingPageUrl
                  )
                }
                className="Btn mb-3"
              >
                Copy GIF Thumbnail & Link
              </ButtonLightBlue>
              <ButtonLightBlue
                onClick={(e) =>
                  this.clickOnDiv2(
                    e,
                    still_image_thumbnail_url,
                    this.state.landingPageUrl
                  )
                }
                className="Btn mb-2"
              >
                Copy Static Image & Link
              </ButtonLightBlue>
            </div>
          </div>
        }
      />

      <AppDialog
        open={isVideoModal}
        maxWidth={"md"}
        className="video-modal"
        onClose={() => this.setState({ isVideoModal: false })}
        content={
          <div className="contentModal">
            <div>
              <ReactPlayer
                controls
                className="img-fluid"
                url={this.state.videoPlayUrl}
              />
            </div>
          </div>
        }
      />
      <AppDialog
        open={isSuccessModel}
        maxWidth={"xs"}
        className="csv-upload-modal success-model "
        onClose={() => this.openModel(false, "isSuccessModel")}
        content={
          <div className="">
            <div className="contentModal">
              <div className="submission">
                <Alert
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  Thank you for your submission!
                </Alert>
                <p>
                  Tavus will process these videos, test for quality, and
                  <br /> return the CSV to you shortly.
                </p>
              </div>
              <div className="submission-btn">
                <ButtonLightBlue
                  className="success-btn mb-2"
                  onClick={() => this.openModel(false, "isSuccessModel")}
                >
                  Back to home
                </ButtonLightBlue>
              </div>
            </div>
          </div>
        }
      />

      <AppDialog
        open={isVideoError}
        maxWidth={"sm"}
        className="request-modal"
        onClose={() => this.resetErrorButtons()}
        modelTitle={"What's wrong with the video?"}
        customClassMain="request-modalQA"
        content={
          <div className="contentModal">
            <div className="form-group wrong-video-multi pt-2">
              {errorBtns &&
                errorBtns.map((val, key) => {
                  return (
                    <>
                      <div className="wrong-video">
                        <ButtonLightBlue
                          name={val.key}
                          onClick={() =>
                            this.updateError(val.value ? false : true, val.key)
                          }
                          value={val.value}
                          className={
                            val.value
                              ? "Btn error-btns-selected"
                              : "Btn error-btns"
                          }
                        >
                          {val.label}
                        </ButtonLightBlue>
                      </div>
                      {val.key === "other" && val.value === true && (
                        <input
                          name="other"
                          onChange={(e) => this.updateOther(e)}
                          value={other_custom_value}
                          type="text"
                          className="form-control"
                          id="vehicle-url"
                          placeholder="Type here"
                        />
                      )}
                    </>
                  );
                })}
            </div>
            <div className="NiceBtnone">
              <ButtonLightBlue
                onClick={() =>
                  this.submitQaStatus("Fail", this.state.qaVideoID)
                }
                className="mt-35 mb-2"
              >
                Submit
              </ButtonLightBlue>
            </div>
          </div>
        }
      />
      {/* EDIT VIDEO MODEL */}
      <AppDialog
        open={isRequestModalUpdate}
        maxWidth={"sm"}
        className="request-modal model_basics"
        onClose={() => this.openModel(false, "isRequestModalUpdate")}
        modelTitle={"Update video 🍿"}
        content={
          isRequestModalUpdate && (
            <div className="contentModal">
              {isLoadingRequest ? (
                <Loader />
              ) : (
                <>
                  <div className="model-sec">
                    <h5 className="text-left">Video Basics</h5>
                    <div className="select_templateMd mb-20">
                      <label className="text-left">
                        Selected template<sup className="text-danger">*</sup>
                      </label>

                      <SingleDropdown
                        isDisabled={true}
                        options={this.state.tempData}
                        name="selected_template"
                        className={"disable"}
                        value={selected_template}
                      />
                    </div>
                    {isRequestModalUpdate && generated ? (
                      <div className={"switchBtn text-left position-relative"}>
                        <div className="switch-field">
                          <input
                            type="radio"
                            onChange={() => this.handleChangeSwitch(true)}
                            id="radio-one"
                            name="switch-one"
                            value="true"
                            checked={this.state.switchUrl == true}
                          />
                          <label for="radio-one">Upload Background File</label>
                          <input
                            type="radio"
                            onChange={() => this.handleChangeSwitch(false)}
                            id="radio-two"
                            name="switch-one"
                            value="false"
                            checked={this.state.switchUrl == false}
                          />
                          <label for="radio-two">Autorecord URL</label>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {isRequestModalUpdate && this.state.switchUrl && generated && (
                      <>
                        {this.state.uploaded_url ? (
                          <div className="position-relative close-video mt-3">
                            <label>
                              <AppImage
                                name={"XMLID.svg"}
                                className="cursor-pointer"
                              />
                              <span className="cross_icon_vid">
                                <AppImage
                                  name={"cross_icon.svg"}
                                  onClick={() => this.deleteVideoS3()}
                                  className="cursor-pointer"
                                />
                              </span>
                            </label>
                            <label>{this.state.uploadedVideoName}</label>
                          </div>
                        ) : (
                          <>
                            <div className="uploaVideo">
                              <div className="uploadmain justify-content-center">
                                <div className="uploadSvg text-center">
                                  <label
                                    htmlFor="icon-button-file"
                                    className="upload-button"
                                  >
                                    <AppImage
                                      name={"upload.svg"}
                                      width="50"
                                      className="cursor-pointer"
                                    />
                                  </label>
                                  <h5>Upload Video</h5>
                                  <p>
                                    Drag in a video file or click to choose a
                                    file
                                    <br />
                                    Supported Files: .webm, .mp4, .mov
                                  </p>
                                  <form>
                                    <input
                                      type="file"
                                      accept="video/*"
                                      onChange={this.uploadVideo}
                                    />
                                  </form>
                                  <span className="upload-button">
                                    {this.state.uploadedCsvName}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {errors["video_source_url"] && (
                              <span className="error">
                                {errors.video_source_url}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {isRequestModalUpdate &&
                      generated &&
                      !this.state.switchUrl ? (
                      <div className="mb-20">
                        <label className="text-left" for="videoname">
                          Background Video URL
                          <sup className="text-danger">*</sup>
                        </label>
                        <input
                          className="input"
                          value={editData?.background_data?.background_url}
                          onChange={(e) =>
                            this.updateEditData(
                              e,
                              "background_url",
                              "background_data"
                            )
                          }
                          name="background_url"
                          id="background_url"
                          placeholder="http://www.apple.com"
                        />
                        {errors["background_url"] && (
                          <span className="error">{errors.background_url}</span>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {isRequestModalUpdate && custom_cta ? (
                      <div className="mb-20">
                        <label className="text-left" for="videoname">
                          CTA URL<sup className="text-danger">*</sup>
                        </label>
                        <input
                          className="input"
                          onChange={(e) =>
                            this.updateEditData(
                              e,
                              "custom_cta_url",
                              "landing_data"
                            )
                          }
                          value={editData?.landing_data?.custom_cta_url}
                          name="custom_cta_url"
                          id="custom_cta_url"
                          placeholder="http://www.apple.com"
                        />
                        {errors["custom_cta_url"] && (
                          <span className="error">{errors.custom_cta_url}</span>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {Object.keys(other_data).map(function (key, index) {
                      return (
                        <div className="mb-20">
                          <label className="text-left" for="videoname">
                            {key}
                            <sup className="text-danger">*</sup>
                          </label>
                          <input
                            className="input"
                            onChange={(e) =>
                              self.updateEditData(e, key, "landing_data")
                            }
                            value={
                              editData?.landing_data !== null
                                ? editData?.landing_data[key]
                                : ""
                            }
                            name={key}
                            id={key}
                            placeholder="http://www.apple.com"
                          />
                          {errors[key] && (
                            <span className="error">{errors[key]}</span>
                          )}
                        </div>
                      );
                    })}
                    <div className="mb-20">
                      <label className="text-left" for="videoname">
                        Override Video Title
                      </label>
                      <TextareaAutosize
                        className="input"
                        value={editData?.video_title}
                        onChange={(e) =>
                          this.updateEditData(e, "video_title", "video_title")
                        }
                        name="video_name"
                        id="video_name"
                        placeholder={this.state.title_script}
                      />
                      {errors["customfield"] && (
                        <span className="error">{errors.video_name}</span>
                      )}
                    </div>

                    {isRequestModalUpdate &&
                      dynamicVariables &&
                      dynamicVariables.length > 0 && (
                        <h5 className="text-left">Video Variables</h5>
                      )}
                    {isRequestModalUpdate &&
                      dynamicVariables &&
                      dynamicVariables.length > 0 &&
                      dynamicVariables.map((val, key) => {
                        return (
                          <div className="mb-20 d-flex justify-content-between">
                            <div className="VariablMain ">
                              <label className="text-left" for="Variables2">
                                {val?.label}
                                <sup className="text-danger">*</sup>
                              </label>
                              <div className=" d-flex justify-content-between">
                                <div className="Variable-input">
                                  <input
                                    className="input"
                                    onChange={(e) =>
                                      this.updateEditData(
                                        e,
                                        val?.label,
                                        "variables"
                                      )
                                    }
                                    name={val?.label}
                                    value={editData?.variables[val?.label]}
                                    id={val?.label}
                                    placeholder={val?.placeHolderText}
                                  />
                                </div>
                                <div className="pt-4 roundBg position-relative">
                                  {selected_template.value && (
                                    <span
                                      onClick={() =>
                                        this.playAudio(
                                          val?.value,
                                          val?.label,
                                          key
                                        )
                                      }
                                    >
                                      {!this.state.variablePlaying &&
                                        this.state.playVariable &&
                                        this.state.playIndex == key ? (
                                        <div className="loading-overlay-fixed">
                                          <AppImage
                                            name={"loader.gif"}
                                            width="60"
                                          />
                                        </div>
                                      ) : this.state.playIndex == key &&
                                        this.state.variablePlaying ? (
                                        <AppImage
                                          name={"pause.svg"}
                                          width="20"
                                          className="cursor-pointer polygon"
                                        />
                                      ) : val?.mp3 ? (
                                        <AppImage
                                          name={"retry_icon.svg"}
                                          width="20"
                                          className="cursor-pointer polygon"
                                        />
                                      ) : (
                                        <AppImage
                                          name={"polygon.svg"}
                                          width="20"
                                          className="cursor-pointer Playicon polygon"
                                        />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {errors[val?.label] && (
                                <span className="error">
                                  {errors[val?.label]}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}

                    <ButtonLightBlue
                      onClick={this.updateVideo}
                      className="mt-35 mb-2"
                    >
                      Update 🚀
                    </ButtonLightBlue>
                  </div>
                </>
              )}
            </div>
          )
        }
      />
      <AppDialogInvite
        open={isDialogOpenFilter}
        maxWidth={"md"}
        onClose={() => this.setState({ isDialogOpenFilter: false })}
        customClassMain="users-filter-main"
        modelTitle={"Refine your search"}
        content={
          <div className="users-filter">
            <div className="date-range-pickers d-flex justify-content-between">
              <label className="align-self">Date</label>
              <div className="date-time-picker">
                <DatePicker
                  selectStartDate={(date) => this.selectedStartDate(date)}
                  endDateStartDate={(date) => this.selectedEndDate(date)}
                  startDateSelected={startDate}
                  endDateSelected={endDate}
                />
                <p id="showMsg"></p>
              </div>
            </div>
            <div className="search-filter">
              <div className={"filter d-flex justify-content-between"}>
                <label className="align-self">Campaigns</label>
                <SingleDropdown
                  placeholder="All Campaigns"
                  value={selectedTemp}
                  options={this.state.tempData}
                  onChange={this.selectTemp}
                />
              </div>
            </div>
            <div className="search-filter">
              <div className={"filter d-flex justify-content-between"}>
                <label className="align-self">Video Status</label>
                <SingleDropdown
                  placeholder="Video Status"
                  value={selectedVideoStatus}
                  options={this.state.videoStatusData}
                  onChange={this.selectVideoStatus}
                />
              </div>
            </div>

            {userData &&
              (userData.role !== "user" ||
                validQaUsers.includes(userData.id)) && (
                <div className="search-filter">
                  <div className={"filter d-flex justify-content-between"}>
                    <label className="align-self">QA Status</label>
                    <SingleDropdown
                      value={qa_status}
                      placeholder="QA Status"
                      options={this.state.qaStatusData}
                      onChange={this.selectQa}
                    />
                  </div>
                </div>
              )}
            <div className={"search-filter d-flex justify-content-between"}>
              <label className="align-self">Request ID</label>
              <div className="search-box">
                <SearchBar
                  className="customInput"
                  variant="outlined"
                  placeholder="Search By Request Id"
                  id="input"
                  value={searchById}
                  handdleOnchange={(e) =>
                    this.setState({ searchById: e.target.value })
                  }
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>
            <div className={"search-filter d-flex justify-content-between"}>
              <label className="align-self">Video Title</label>
              <div className="search-box">
                <SearchBar
                  className="customInput"
                  variant="outlined"
                  placeholder="Search By Video Title"
                  id="input"
                  value={searchByTitle}
                  handdleOnchange={(e) =>
                    this.setState({ searchByTitle: e.target.value })
                  }
                  autoComplete="off"
                  type="text"
                />
              </div>
            </div>
            <div className={"btn-group d-flex justify-content-between"}>
              <IconLabelButton
                className="invitebtn"
                onClick={() => this.resetOnClick()}
                title="Reset"
              />
              <IconLabelButton
                className="invitebtn"
                onClick={() => this.onhandleSubmit()}
                disabled={
                  (!endDate && startDate) || (endDate && !startDate)
                    ? true
                    : false
                }
                title="Apply"
              />
            </div>
          </div>
        }

      // }
      />
    </div>
  );
}
