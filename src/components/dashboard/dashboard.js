import React, { Component, useRef } from "react";
import "./dashboard.scss";
import axios from "axios";
import { html } from "./dashboard.html";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import { HTTP } from "../../service/core/http.service";
import { urls } from "../../config/urlConfig";
import { Config } from "../../config/config";
import Strings from "../../constants/strings";
import AuthService from "../../service/core/auth.service";
import { VideoService } from "../../service/api/video.service";
import { CampaignService } from "../../service/api/campaign.service";
import { UserService } from "../../service/api/user-service";
import { SegmentService } from "../../service/api/segment.service";
const { ClipboardItem } = window;
const SOURCE_CANCEL_MESSAGE = "";

let newObj = {};
let source;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.copyRefUrl = React.createRef();
    this.copyRefGif = React.createRef();
    this.copyRefImage = React.createRef();
    this.anchorRef = React.createRef();
    this.csvLink = React.createRef();
    this.state = {
      value: 0,
      isDialogOpen: false,
      isDialogOpen2: false,
      isDialogOpen3: false,
      errors: {},
      allVideos: [],
      isLoading: false,
      templates: [],
      avtars: [],
      selected_template: {},
      dynamicVariables: [],
      video_name: "",
      isLoading: false,
      still_image_thumbnail_url: "",
      gif_thumbnail_url: "",
      totalItemsCount: "",
      hosted_url: "",
      stream_url: "",
      activePage: 0,
      isVideoModal: false,
      videoPlayUrl: "",
      csvData: [],
      landingPageUrl: "",
      isLoadingCsv: false,
      isLoadingRequest: false,
      generated: false,
      background_url: "",
      uploaded_url: "",
      uploaded_url_key: "",
      uploadedVideoName: "",
      uploadedCsvName: "",
      isOpen: false,
      selectedDate: null,
      searchField: "",
      openSearch: false,
      tempData: [],
      search_template:
        this.props?.match?.path == "/dashboard/campaign/:campaignId" &&
        this.props?.match?.params?.campaignId
          ? this.props.match.params?.campaignId
          : "",
      filter_column: "updated_at",
      filter_status: "DESC",
      openDelete: true,
      mux_id: "",
      video_title: "",
      title_script: "",
      custom_cta: false,
      custom_cta_url: "",
      isSuccessModel: false,
      switchUrl: false,
      vidoeData: [],
      uploadedVidoeData: "",
      other_data: {},
      default_video_url: Config.VIDEO_URL,
      isVideoError: false,
      isDialogOpenFilter: false,
      searchValue1: "",
      searchValue2: "",
      filterDate: [],
      filterByStartDate: "",
      filterByEndDate: "",
      errorBtns: [
        { key: "pronunciation", value: false, label: "Pronunciation" },
        { key: "lyp_sync_issue", value: false, label: "Lip-Sync Issue" },
        { key: "video_background", value: false, label: "Video background" },
        { key: "video_freezing", value: false, label: "Video Freezing" },
        { key: "other", value: false, label: "Other" },
      ],
      qaStatusData: [
        { value: "", label: "All" },
        { value: "Pass", label: "Pass" },
        { value: "Fail", label: "Fail" },
        { value: "unreviewed", label: "Unreviewed" },
      ],
      videoStatusData: [
        { value: "", label: "All" },
        { value: "ready", label: "Ready" },
        { value: "generating", label: "Generating" },
        { value: "error", label: "Error" },
      ],
      selectedVideoStatusValue: "",
      selectedVideoStatus: {},
      qaFilter: "",
      videoPage: 1,
      qaVideoID: 0,
      qa_status: {},
      openPoper: false,
      toggleId: 0,
      disableBtn: false,
      allUsers: [],
      userFilter: "",
      selectedUser: null,
      editData: null,
      edit_template: "",
      anchorEl: null,
      menuOpen: false,
      playIndex: "",
      playVariable: false,
      transcript: [],
      variablePlaying: false,
      audio: null,
      selectedPlayebleVariable: "",
      videoLoad: false,
      selectedTemp: {},
      next_cursor: "",
      isTemplateModal: false,
      templateForVideo: "",
      cursor_values: [""],
      other_custom_value: "",
      csvDownloadData: [],
      isDownload: true,
      filter_search_template: "",
      filter_status1: "",
      filter_qaFilter: "",
      userFilter1: "",
      filterSelectedVideoStatusValue: "",
      searchById: "",
      searchByTitle: "",
      startDate: "",
      endDate: "",
      formatStartDate: "",
      formatEndDate: "",
    };
    this.mounted = false;
    this.interval = setInterval(() => {
      this.getVideos(
        this.state.videoPage,
        this.state.searchField,
        this.state.search_template,
        this.state.filter_column,
        this.state.filter_status,
        this.state.qaFilter,
        this.state.userFilter,
        this.state.selectedVideoStatusValue,
        this.state.searchValue1,
        this.state.searchValue2,
        this.state.filterByEndDate,
        this.state.filterByStartDate
      );
    }, 60000);
    source = axios.CancelToken.source();
  }

  componentDidMount() {
    this.mounted = true;
    this.getTemplates();
    this.getDefaultDomain();
    this.getUsers();
    this.getVideos(
      this.state.videoPage,
      this.state.searchField,
      this.state.search_template,
      this.state.filter_column,
      this.state.filter_status,
      this.state.qaFilter,
      this.state.userFilter,
      this.state.selectedVideoStatusValue,
      this.state.searchValue1,
      this.state.searchValue2,
      this.state.filterByEndDate,
      this.state.filterByStartDate
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getVideos(
        this.state.videoPage,
        this.state.searchField,
        this.state.search_template,
        this.state.filter_column,
        this.state.filter_status,
        this.state.qaFilter,
        this.state.userFilter,
        this.state.selectedVideoStatusValue,
        this.state.searchValue1,
        this.state.searchValue2,
        this.state.filterByEndDate,
        this.state.filterByStartDate
      );
    }
  }

  handleCloseMenu = () => {
    this.setState({ anchorEl: null, menuOpen: false });
  };

  getUsers = () => {
    const userData = AuthService.userData();
    if (userData && userData.role !== "qa") {
      this.getVideos(
        this.state.videoPage,
        this.state.searchField,
        this.state.search_template,
        this.state.filter_column,
        this.state.filter_status,
        this.state.qaFilter,
        "",
        this.state.selectedVideoStatusValue,
        this.state.searchValue1,
        this.state.searchValue2,
        this.state.filterByEndDate,
        this.state.filterByStartDate
      );
    } else {
      let params = "?&limit=100&role=qa";
      HTTP.get(urls.getUsers + params)
        .then((result) => {
          if (result.status == 200) {
            if (result.data?.data?.rows) {
              const newUserArray = result.data?.data?.rows.map((user) => ({
                label: user.first_name
                  ? user.fullName.slice(0, 20) +
                    (user.fullName.length > 20 ? "..." : "")
                  : user.email.slice(0, 20) +
                    (user.email.length > 20 ? "..." : ""),
                value: user.id,
              }));
              const selectedUser = newUserArray.find((user) => {
                return user.value == userData.id;
              });
              this.setState({
                allUsers: newUserArray,
                selectedUser,
                userFilter: selectedUser.value,
              });
              this.getVideos(
                this.state.videoPage,
                this.state.searchField,
                this.state.search_template,
                this.state.filter_column,
                this.state.filter_status,
                this.state.qaFilter,
                selectedUser.value,
                this.state.selectedVideoStatusValue,
                this.state.searchValue1,
                this.state.searchValue2,
                this.state.filterByEndDate,
                this.state.filterByStartDate
              );
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  getUsers = async () => {
    const user = await UserService.getUserProfile();
    if (user) {
      this.setState({ userData: user });
      let validateUser = await AuthService.getUserCurrentRoute(user);
      if (validateUser != true) {
        this.props.history.push(validateUser);
      } else {
        await SegmentService.analyticsTrack("Home Accessed", {});
      }
    }
  };

  updateOther = (event) => {
    this.setState({ other_custom_value: event.target.value });
  };

  handleClickMenu = (event) => {
    this.setState({ menuOpen: true, anchorEl: event.currentTarget });
  };

  handleToggle = (event, id) => {
    let key = this.state.openPoper == true ? false : true;
    this.setState({
      openPoper: key,
      toggleId: id,
      anchorEl: event.currentTarget,
      menuOpen: true,
    });
  };

  handleClose = (event, type) => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }
    this.setState({ openPoper: false });
  };

  updateError = (choice, name) => {
    let { errorBtns } = this.state;
    errorBtns.map((val) => {
      if (name === val.key) {
        val.value = choice;
      }
    });
    if (name === "other" && !choice) {
      this.setState({ other_custom_value: "" });
    }
    this.setState({ errorBtns: errorBtns });
  };

  updateName = (e, index) => {
    let allVideos = this.state.allVideos;
    allVideos[index].video_title = e.target.value;
    this.setState({ allVideos: allVideos });
  };

  showEdit = (e, index) => {
    let allVideos = this.state.allVideos;
    allVideos[index].edit = true;
    this.setState({ allVideos: allVideos });
  };

  submitNameChange = async (choice, event, data) => {
    if (event.charCode === 13 || choice == 1) {
      let params = `?video_title=${data?.video_title}&id=${data.id}`;
      await HTTP.put(urls.updateLandingName + params)
        .then((result) => {
          if (result.status == 200) {
          }
          this.getVideos(
            this.state.videoPage,
            this.state.searchField,
            this.state.search_template,
            this.state.filter_column,
            this.state.filter_status,
            this.state.qaFilter,
            this.state.userFilter,
            this.state.selectedVideoStatusValue,
            this.state.searchValue1,
            this.state.searchValue2,
            this.state.filterByEndDate,
            this.state.filterByStartDate
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
    clearInterval(this.interval);
  }

  handleChangeSwitch = (status) => {
    this.setState({ switchUrl: status });
  };

  // handleDateChange = (date) => {
  //   let gmtstart_time = moment(date).format("YYYY-MM-DD");
  //   this.setState({ searchField: gmtstart_time });
  //   this.setState({ isOpen: false, videoPage: 1 });
  //   this.getVideos(
  //     this.state.videoPage,
  //     gmtstart_time,
  //     this.state.search_template,
  //     this.state.filter_column,
  //     this.state.filter_status,
  //     this.state.qaFilter,
  //     this.state.userFilter,
  //     this.state.selectedVideoStatusValue,
  //     this.state.searchValue1,
  //     this.state.searchValue2,
  //     this.state.filterWithDate.startDate,
  //     this.state.filterWithDate.endDate
  //   );
  // };

  openDate = (choice) => {
    this.setState({ isOpen: choice });
  };

  selectTemp = (selectedOption) => {
    this.setState({
      filter_search_template: selectedOption.value,
      videoPage: null,
      selectedTemp: selectedOption,
    });
  };

  selectQa = (qaFilter) => {
    this.setState({
      qa_status: qaFilter,
      filter_qaFilter: qaFilter.value,
      videoPage: 1,
    });
  };

  selectUser = (userFilter) => {
    this.setState({
      userFilter: userFilter.value,
      videoPage: 1,
      selectedUser: userFilter,
    });
  };

  selectVideoStatus = (videoStatusFilter) => {
    this.setState({
      filterSelectedVideoStatusValue: videoStatusFilter.value,
      videoPage: 1,
      selectedVideoStatus: videoStatusFilter,
    });
  };

  pagination = (e) => {
    this.setState({ videoPage: e });
    this.getVideos(
      e,
      this.state.searchField,
      this.state.search_template,
      this.state.filter_column,
      this.state.filter_status,
      this.state.qaFilter,
      this.state.userFilter,
      this.state.selectedVideoStatusValue,
      this.state.searchValue1,
      this.state.searchValue2,
      this.state.filterByEndDate,
      this.state.filterByStartDate
    );
  };

  filterTable = (choice) => {
    const { filter_status, filter_column, searchField, search_template } =
      this.state;
    let status = "";
    if (filter_column == "") {
      choice == "Date" ? (status = "ASC") : (status = "DESC");
    } else {
      if (choice == filter_column) {
        status = filter_status == "ASC" ? "DESC" : "ASC";
      } else {
        status = "DESC";
      }
    }
    this.setState({ filter_column: choice, filter_status: status });
    this.getVideos(
      this.state.videoPage,
      searchField,
      search_template,
      choice.toLocaleLowerCase(),
      status,
      this.state.qaFilter,
      this.state.userFilter,
      this.state.selectedVideoStatusValue,
      this.state.searchValue1,
      this.state.searchValue2,
      this.state.filterByEndDate,
      this.state.filterByStartDate
    );
  };

  submitQaStatus = async (status, id) => {
    if (this.state.disableBtn) {
      return false;
    }
    let data = {};
    let flag = 0;
    this.setState({ disableBtn: true });
    if (status == "Fail") {
      let issue_type = "";
      let objdata = {
        qa_status: "Fail",
        issue_type: "",
      };
      this.state.errorBtns.map((val) => {
        if (val.value) {
          flag = 1;
          if (val.label === "Other") {
            objdata["issue_details"] = this.state.other_custom_value;
          }
          issue_type += val.label + ",";
        }
      });
      objdata["issue_type"] = issue_type.replace(/(\s*,?\s*)*$/, "");
      data = objdata;
    } else {
      flag = 1;
      data = {
        qa_status: "Pass",
      };
    }
    data["request_id"] = id;
    let self = this;
    if (flag == 1) {
      flag = 0;

      await HTTP.post(urls.verifyVideo, data)
        .then((result) => {
          if (result.data.status) {
            this.resetErrorButtons();
            toast.success(result.data.message);
          }
          this.setState({ isLoading: true });
          this.getVideos(
            this.state.videoPage,
            this.state.searchField,
            this.state.search_template,
            this.state.filter_column,
            this.state.filter_status,
            this.state.qaFilter,
            this.state.userFilter,
            this.state.selectedVideoStatusValue,
            this.state.searchValue1,
            this.state.searchValue2,
            this.state.filterByEndDate,
            this.state.filterByStartDate
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      toast.warning(Strings.SELECT_ONE_OPTION);
      self.setState({ disableBtn: false });
    }
  };

  resetErrorButtons = () => {
    this.setState({
      isVideoError: false,
      other_custom_value: "",
      disableBtn: false,
      errorBtns: [
        { key: "pronunciation", value: false, label: "Pronunciation" },
        { key: "lyp_sync_issue", value: false, label: "Lip-Sync Issue" },
        { key: "video_background", value: false, label: "Video background" },
        { key: "video_freezing", value: false, label: "Video Freezing" },
        { key: "other", value: false, label: "Other" },
      ],
    });
  };

  openEdit = async (data) => {
    let { dynamicVariables } = this.state;
    try {
      data.variables = JSON.parse(data.variables);
    } catch {
      data.variables = data.variables;
    }
    if (data.background_data && data.background_data.video_source_url) {
      this.setState({
        switchUrl: true,
        uploaded_url_key: data.background_data.video_source_url,
        uploaded_url: data.background_data.video_source_url,
        uploadedVideoName:
          data.background_data.video_source_url.substring(0, 15) + "..",
      });
    }
    this.setState({
      editData: data,
      selected_template: {
        value: data?.template?.template_id,
        label: data?.template?.template_name,
      },
      dynamicVariables: [],
      other_data: {},
    });
    let ids = [];
    let filterArray = this.state.templates.filter(function (val) {
      return val.template_id == data.template.template_id;
    });
    if (filterArray.length > 0) {
      let landingData = [];
      Object.keys(filterArray[0]?.landing).map(function (key, index) {
        if (
          key != "title_script" &&
          filterArray[0].landing[key].includes("{{")
        ) {
          landingData.push({ [key]: filterArray[0].landing[key] });
        }
      });
      if (landingData.length > 0) {
        landingData.map((val) => {
          if (val.cta_button_link) {
            let trimVal = val.cta_button_link;
            trimVal = trimVal.replaceAll("{", "");
            trimVal = trimVal.replaceAll("}", "");
            if (data?.landing_data == null || !data?.landing_data[trimVal]) {
              data.landing_data = { [trimVal]: "" };
            }
          }
          if (val.cta2_button_link) {
            let trimVal = val.cta2_button_link;
            trimVal = trimVal.replaceAll("{", "");
            trimVal = trimVal.replaceAll("}", "");
            if (data?.landing_data == null || !data?.landing_data[trimVal]) {
              data.landing_data = { [trimVal]: "" };
            }
          }
        });
      }
      this.setState({
        edit_template: data.template.template_id,
        editData: data,
      });
      let arr = JSON.parse(filterArray[0]?.avatar?.variables);
      this.setState({
        title_script: filterArray[0]?.landing.title_script,
      });
      if (filterArray[0]?.avatar_id == 26 || filterArray[0]?.avatar_id == 27) {
        this.setState({ custom_cta: true });
      }
      filterArray[0].generated
        ? this.setState({ generated: true })
        : this.setState({ generated: false });
      if (
        filterArray[0]?.landing &&
        ((filterArray[0]?.landing?.cta_button_link &&
          filterArray[0]?.landing?.cta_button_link.includes("{{")) ||
          (filterArray[0]?.landing?.cta2_button_link &&
            filterArray[0]?.landing?.cta2_button_link.includes("{{")))
      ) {
        let other_data = this.state.other_data;
        if (filterArray[0]?.landing?.cta_button_link.includes("{{")) {
          let custom_cta = filterArray[0]?.landing?.cta_button_link.replaceAll(
            "{",
            ""
          );
          custom_cta = custom_cta.replaceAll("}", "");
          other_data[custom_cta] = "";
        }
        if (filterArray[0]?.landing?.cta2_button_link.includes("{{")) {
          let custom_2cta =
            filterArray[0]?.landing?.cta2_button_link.replaceAll("{", "");
          custom_2cta = custom_2cta.replaceAll("}", "");
          other_data[custom_2cta] = "";
        }
        this.setState({ other_data: other_data });
      } else {
        this.setState({ other_data: {} });
      }
      if (arr.length > 0) {
        arr.map((val) => {
          let placeHolderText = "";
          if (val?.field_list && val?.field_list.length > 0) {
            return val?.field_list.map((field) => {
              if (field.placeholder_text !== undefined) {
                placeHolderText = field.placeholder_text;
              }
              ids.push({ label: field.field_name, value: "", placeHolderText });
            });
          } else {
            if (val.placeholder_text !== undefined) {
              placeHolderText = val.placeholder_text;
            }
            ids.push({ label: val.variable_id, value: "", placeHolderText });
          }
        });
        ids &&
          ids.length > 0 &&
          ids.map((val) => {
            for (let key of Object.keys(data.variables)) {
              if (val.label == key) {
                val.value = data.variables[key];
              }
            }
          });
        this.setState({ dynamicVariables: ids });
      }
    }
    this.openModel(true, "isRequestModalUpdate");
  };

  getVideos = async (
    page,
    text,
    template,
    name,
    orderValue,
    qa_status,
    userFilter,
    selectedVideoStatusValue = "",
    searchById = "",
    searchByTitle = "",
    startDate = "",
    endDate = ""
  ) => {
    let sort = orderValue == "ASC" ? name : "-" + name;
    let cursor = page - 1;
    if (cursor < 0) {
      cursor = 0;
    }
    const requestId = this.props?.match?.params?.requestId
      ? this.props?.match?.params?.requestId
      : "";
    let params =
      "?limit=20&search=" +
      "&page=" +
      cursor +
      text?.toLowerCase() +
      "" +
      "&campaign_id=" +
      template +
      "&sort=" +
      sort?.toLowerCase() +
      "&qa_status=" +
      qa_status +
      "&user_id=" +
      userFilter +
      "&bulk_request_id=" +
      requestId +
      "&status=" +
      selectedVideoStatusValue +
      "&request_id=" +
      searchById +
      "&title=" +
      searchByTitle +
      `&status=&created_before=${startDate}` +
      `&created_after=${endDate}`;
    this.setState({ videoLoad: true });
    await HTTP.get(urls.getVideos + params)
      .then((result) => {
        if (result.status == 200) {
          if (result?.data?.data) {
            var allVideos = [];
            allVideos = result.data.data.results;
            this.setState({
              allVideos: allVideos,
              totalItemsCount: result?.data?.data?.total_count
                ? result?.data?.data?.total_count
                : 0,
              activePage: page,
              next_cursor:
                result.data.data?.next_cursor &&
                result.data.data.next_cursor != null
                  ? result.data.data?.next_cursor
                  : "",
              isDownload: false,
            });
          }
          if (result.data?.type === "csv") {
            this.setState({
              requestType: true,
              novideoMessage: result.data?.message,
            });
          }
          this.setState({ videoLoad: false, isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ videoLoad: false, isLoading: false });
      });
  };

  deleteVideo = async (id) => {
    this.setState({ openDelete: false, isLoading: true });
    await HTTP.delete(urls.getVideos + "/" + id)
      .then((result) => {
        if (result.status == 200) {
          this.getVideos(
            this.state.videoPage,
            this.state.searchField,
            this.state.search_template,
            this.state.filter_column,
            this.state.filter_status,
            this.state.qaFilter,
            this.state.userFilter,
            this.state.selectedVideoStatusValue,
            this.state.searchValue1,
            this.state.searchValue2,
            this.state.filterByEndDate,
            this.state.filterByStartDate
          );
        }
        this.setStateForDropdown();
      })
      .catch((err) => {
        this.setStateForDropdown();
        console.log(err.message);
      });
  };

  setStateForDropdown = async () => {
    this.setState({ isLoading: false, anchorEl: null, menuOpen: false });
  };

  getStatus = (status) => {
    switch (status?.status) {
      case "generating":
        return status?.regen_status == "regenerated" ? "Regenerating 🚀" : 'Generating 🚀';
      case "generating_audio":
        return "Generating 🚀";
      case "audio_generated":
        return "Generating 🚀";
      case "generating_lipsync":
        return "Generating 🚀";
      case "lipsync_generated":
        return "Generating 🚀";
      case "ready":
        return status?.qa_status == "Pass" ? (
          <span style={{ color: "#82C43C" }}>
            <strong>Ready</strong>
          </span>
        ) : (
          <span style={{ color: "#50B5FF" }}>
            <strong>Ready</strong>
          </span>
        );
      case "error_audio":
        return " Error ☹️";
      case "error":
        return " Error ☹️";
      case "error_lipsync":
        return " Error ☹️";
      default:
        return "Generating 🚀";
    }
  };

  getDefaultDomain = () => {
    let params = "?is_default=true";
    HTTP.get(urls.domain + params)
      .then((result) => {
        if (result.status == 200) {
          if (result.data?.data) {
            this.setState({
              default_video_url:
                "https://" +
                result.data?.data.sub_domain +
                "." +
                result.data?.data.domain,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getTemplates = async () => {
    this.setState({ isLoading: true });
    let campaigns = await CampaignService.getCampaignListWithIdAndName();
    if (campaigns) {
      let tempData = [{ value: "", label: "All Campaigns" }];
      campaigns.map((val) => {
        tempData.push({ value: val.id, label: val.campaign_name });
      });
      this.setState({
        templates: campaigns,
        tempData: tempData,
      });
      if (
        this.props.match.path == "/dashboard/campaign/:campaignId" &&
        this.props.match.params?.campaignId
      ) {
        let id = this.props.match.params?.campaignId;
        let filterData = tempData.filter(function (temp) {
          return temp.value == id;
        });
        if (filterData.length > 0) {
          this.setState({ selectedTemp: filterData[0], search_template: id });
        }
      }
    }
  };

  getAvtars = () => {
    this.setState({ isLoading: false });
    HTTP.get(urls.getAvtars)
      .then((result) => {
        if (result.status == 200) {
          if (result.data?.data?.variables) {
            this.setState({
              avtars: result.data.data.variables,
            });
          }
        }
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ isLoading: false });
      });
  };

  copyLinkToClipboard = (e) => {
    navigator.clipboard.writeText("Copy this text to clipboard");
  };

  openModel = (isDialogOpen, name) => {
    const { audio, playVariable } = this.state;
    this.setState({
      [name]: isDialogOpen,
      menuOpen: false,
    });
    if (
      (name == "isRequestModal" || name == "isRequestModalUpdate") &&
      isDialogOpen == false
    ) {
      this.setState({
        selected_template: {},
        title_script: "",
        dynamicVariables: [],
        video_name: "",
        isRequestModal: false,
        custom_cta: false,
        switchUrl: false,
        vidoeData: [],
        uploadedVidoeData: "",
        background_url: "",
        uploaded_url: "",
        generated: false,
        other_data: {},
        errors: {},
        editData: null,
        selectedPlayebleVariable: "",
        editData: {},
      });
      this.cancelAudioRequest();
      newObj = {};
      this.getVideos(
        this.state.videoPage,
        this.state.searchField,
        this.state.search_template,
        this.state.filter_column,
        this.state.filter_status,
        this.state.qaFilter,
        this.state.userFilter,
        this.state.selectedVideoStatusValue,
        this.state.searchValue1,
        this.state.searchValue2,
        this.state.filterByEndDate,
        this.state.filterByStartDate
      );
    }
  };

  openShareModel = (isDialogOpen, name, data) => {
    if (isDialogOpen) {
      this.setState({
        [name]: isDialogOpen,
        still_image_thumbnail_url: data?.still_image_thumbnail_url,
        gif_thumbnail_url: data?.gif_thumbnail_url,
        hosted_url: data?.hosted_url,
        stream_url: data?.stream_url,
        landingPageUrl: data.hosted_url,
        mux_id: data?.mux_id,
        video_id: data?.id,
        video_title: data.video_title,
      });
      this.setStateForDropdown();
    } else {
      this.setState({
        [name]: isDialogOpen,
        still_image_thumbnail_url: "",
        gif_thumbnail_url: "",
        hosted_url: "",
        landingPageUrl: "",
        mux_id: "",
        video_id: "",
        video_title: "",
      });
      this.setStateForDropdown();
    }
  };

  getDate = (date, choice) => {
    if (choice == "date") {
      return moment(date).format("MMM DD");
    } else {
      return moment(date).format("hh:mm A");
    }
  };

  handleVariables = (event) => {
    let variableArr = this.state.dynamicVariables;
    const { audio, selectedPlayebleVariable } = this.state;
    variableArr.map((val) => {
      if (event.target.name == val.label) {
        if (event.target.name == selectedPlayebleVariable) {
          if (audio) {
            audio.pause();
          }
          this.setState({
            playVariable: false,
            variablePlaying: false,
            audio: null,
          });
          source.cancel(SOURCE_CANCEL_MESSAGE);
        }
        val.value = event.target.value;
        val.mp3 = "";
      }
    });
    this.setState({ dynamicVariables: variableArr });
  };

  handleChangeName = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeLink = (event) => {
    let other_data = this.state.other_data;
    other_data[event.target.name] = event.target.value;
    this.setState({ other_data: other_data });
  };

  handleChange = (event) => {
    this.setState({
      selected_template: event,
      dynamicVariables: [],
      background_url: "",
      title_script: "",
      custom_cta: false,
      custom_cta_url: "",
      other_data: {},
    });
    let ids = [];
    let filterArray = this.state.templates.filter(function (val) {
      return val.template_id == event.value;
    });
    if (filterArray.length > 0) {
      let arr = JSON.parse(filterArray[0]?.avatar?.variables);
      let transcript = JSON.parse(filterArray[0]?.avatar?.transcript);
      let stringArr = "";
      transcript.map((val) => {
        stringArr += val.word + " ";
      });
      let varArr = [];
      arr.map((val) => {
        let internalVariable = "";
        val.variable_word_list.map((val2, key) => {
          internalVariable += val2.word + " ";
        });
        varArr.push({
          variable_id: val.variable_id,
          variable: internalVariable,
        });
      });
      varArr.map((val) => {
        stringArr.replace([val.variable], "{" + [val.variable_id] + "}");
      });

      this.setState({
        title_script: filterArray[0]?.landing.title_script,
        transcript: transcript,
        variable_list: arr,
      });
      if (filterArray[0]?.avatar_id == 26 || filterArray[0]?.avatar_id == 27) {
        this.setState({ custom_cta: true });
      }
      filterArray[0].generated
        ? this.setState({ generated: true })
        : this.setState({ generated: false });
      if (
        filterArray[0]?.landing &&
        ((filterArray[0]?.landing?.cta_button_link &&
          filterArray[0]?.landing?.cta_button_link.includes("{{")) ||
          (filterArray[0]?.landing?.cta2_button_link &&
            filterArray[0]?.landing?.cta2_button_link.includes("{{")))
      ) {
        let other_data = this.state.other_data;
        if (filterArray[0]?.landing?.cta_button_link.includes("{{")) {
          let custom_cta = filterArray[0]?.landing?.cta_button_link.replaceAll(
            "{",
            ""
          );
          custom_cta = custom_cta.replaceAll("}", "");
          other_data[custom_cta] = "";
        }
        if (filterArray[0]?.landing?.cta2_button_link.includes("{{")) {
          let custom_2cta =
            filterArray[0]?.landing?.cta2_button_link.replaceAll("{", "");
          custom_2cta = custom_2cta.replaceAll("}", "");
          other_data[custom_2cta] = "";
        }
        this.setState({ other_data: other_data });
      } else {
        this.setState({ other_data: {} });
      }
      if (arr.length > 0) {
        arr.map((val) => {
          let placeHolderText = "";
          if (val?.field_list && val?.field_list.length > 0) {
            return val?.field_list.map((field) => {
              if (field.placeholder_text !== undefined) {
                placeHolderText = field.placeholder_text;
              }
              ids.push({ label: field.field_name, value: "", placeHolderText });
            });
          } else {
            if (val.placeholder_text !== undefined) {
              placeHolderText = val.placeholder_text;
            }
            ids.push({ label: val.variable_id, value: "", placeHolderText });
          }
        });
        this.setState({ dynamicVariables: ids });
      }
    }
  };

  retry = async (data) => {
    if (data.id) {
      this.setState({ menuOpen: false });
      let responce = await VideoService.regenrateVideo(data.id);
      if (responce.status) {
        toast.success(responce.message);
        this.getVideos(
          this.state.videoPage,
          this.state.searchField,
          this.state.search_template,
          this.state.filter_column,
          this.state.filter_status,
          this.state.qaFilter,
          this.state.userFilter,
          this.state.selectedVideoStatusValue,
          this.state.searchValue1,
          this.state.searchValue2,
          this.state.filterByEndDate,
          this.state.filterByStartDate
        );
      } else {
        if (responce?.message) {
          toast.warning(responce?.message);
        }
      }
    }
  };

  resetQaStatus = async (data) => {
    if (data.id) {
      this.setState({ menuOpen: false });
      await HTTP.put(`${urls.resetVideoQaStatus}`, {requestId: data.id})
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message);
            this.setState({ isLoading: true });
            this.getVideos(
              this.state.videoPage,
              this.state.searchField,
              this.state.filter_search_template,
              this.state.filter_column,
              this.state.filter_status,
              this.state.filter_qaFilter,
              this.state.userFilter,
              this.state.filterSelectedVideoStatusValue,
              this.state.searchById,
              this.state.searchByTitle,
              this.state.formatEndDate,
              this.state.formatStartDate
            );
            
          } else {
            toast.warning(result.data.message);
          }
        })
        .catch((err) => {
          this.setStateForDropdown();
          console.log(err.message);
        });
    }
  };

  getIssue = (data, qa_status) => {
    if (data && qa_status === "Fail") {
      var string = "";
      for (let key of Object.keys(data)) {
        if (data[key]) {
          if (key === "Other") {
            string += data[key] + ", ";
          } else {
            string += key + ", ";
          }
        }
      }
      return string.replace(/,\s*$/, "");
    }
    return "";
  };

  submit = async () => {
    const {
      custom_cta,
      video_name,
      dynamicVariables,
      selected_template,
      generated,
      background_url,
      custom_cta_url,
      switchUrl,
      other_data,
    } = this.state;
    let isValid = this.validateForm();
    let variableData = {};
    dynamicVariables.map((val) => {
      variableData[val.label] = val.value.toString().replaceAll("\n", " ");
    });

    let data = {
      variables: variableData,
    };
    if (video_name) {
      data["video_title"] = video_name;
    }

    if (generated && background_url) {
      if (switchUrl) {
        data["background_data"] = { video_source_url: background_url };
      } else {
        data["background_data"] = { background_url: background_url };
      }
    }

    if (custom_cta && custom_cta_url) {
      data["landing_data"] = { custom_cta_url: custom_cta_url };
    }

    if (other_data && Object.keys(other_data).length !== 0) {
      data["landing_data"] = other_data;
    }
    if (isValid && variableData) {
      this.cancelAudioRequest();
      this.setState({ isRequestModal: false });
      let params = "?template_id=" + selected_template.value;
      await HTTP.post(urls.postVideos + params, data)
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message);
            this.getVideos(
              this.state.videoPage,
              this.state.searchField,
              this.state.search_template,
              this.state.filter_column,
              this.state.filter_status,
              this.state.qaFilter,
              this.state.userFilter,
              this.state.selectedVideoStatusValue,
              this.state.searchValue1,
              this.state.searchValue2,
              this.state.filterByEndDate,
              this.state.filterByStartDate
            );
            this.setState({
              selected_template: {},
              title_script: "",
              dynamicVariables: [],
              video_name: "",
              isRequestModal: false,
              custom_cta: false,
              switchUrl: false,
              vidoeData: [],
              uploadedVidoeData: "",
              background_url: "",
              uploaded_url: "",
              generated: false,
            });
          } else {
            toast.warning(result.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  validateForm = () => {
    const {
      video_name,
      dynamicVariables,
      selected_template,
      generated,
      background_url,
      custom_cta_url,
      custom_cta,
      other_data,
    } = this.state;
    const errors = {};
    if (!selected_template.value) {
      errors.selected_template = Strings.SELECT_ANY_TEMPLATE;
    }
    if (generated && background_url == "") {
      errors.background_url = Strings.ENTER_VALID_BACKGROUND_URL;
    }
    if (generated && background_url) {
      if (
        background_url
          .toLocaleLowerCase()
          .match(
            /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
          ) == null
      ) {
        errors.background_url = Strings.ENTER_VALID_BACKGROUND_URL;
      }
    }
    if (custom_cta && custom_cta_url == "") {
      errors.custom_cta_url = "Please enter a valid CTA URL";
    }
    if (custom_cta && custom_cta_url) {
      if (
        custom_cta_url
          .toLocaleLowerCase()
          .match(
            "(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
          ) == null
      ) {
        errors.custom_cta_url = "Please enter a valid CTA URL";
      }
    }
    dynamicVariables.map((val) => {
      if (!val.value || val.value.trim() == "") {
        errors[val.label] = "Please enter " + val.label;
      }
      if (!/\d/.test(val.value) && !/[a-zA-Z]/.test(val.value)) {
        errors[val.label] = "Please enter a Valid " + val.label;
      }
    });
    if (other_data && Object.keys(other_data).length !== 0) {
      Object.keys(other_data).map(function (key, index) {
        if (
          other_data[key]
            .toLocaleLowerCase()
            .match(
              "(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
            ) == null
        ) {
          errors[key] = `Please enter a valid ${[key]} URL`;
        }
      });
    }
    this.setState({ errors });
    return _.isEmpty(errors);
  };

  copyText = async (event, text) => {
    var input = document.createElement("textarea");
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand("copy");
    document.body.removeChild(input);
    toast.success(Strings.LINK_COPIED);
    return result;
  };

  clickOnDiv2 = (event, text, url) => {
    var elemDiv = document.createElement("div");
    var elemImg = document.createElement("img");
    var link = document.createElement("a");
    link.setAttribute("href", url);
    elemImg.setAttribute("src", text);
    link.appendChild(elemImg);
    elemDiv.appendChild(link);

    var a = document.createElement("a");
    var linkText = document.createTextNode(url);
    a.appendChild(linkText);
    a.title = url;
    a.href = url;
    elemDiv.appendChild(a);

    document.body.appendChild(elemDiv);
    this.saveToClipboard2(elemDiv);
    document.body.removeChild(elemDiv);
    toast.success(Strings.LINK_COPIED);
  };

  saveToClipboard2 = (node) => {
    if (document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      var range2 = document.createRange();
      range2.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range2);
    }
    document.execCommand("copy");
  };

  setToClipboard = (blob) => {
    const data = [new ClipboardItem({ [blob.type]: blob })];
    return navigator.clipboard.write(data);
  };

  openVideo = (url) => {
    this.setState({ isVideoModal: true, videoPlayUrl: url });
  };

  confirmFunction = (event) => {
    this.setState({
      csvData: event.target.files[0],
      uploadedCsvName: event.target.files[0].name,
    });
  };

  uploadVideo = async (event) => {
    if (event.target.files.length > 0) {
      let size = this.bytesToSize(event.target.files[0].size);
      let flag = true;
      if (size.includes("GB", "TB")) {
        flag = false;
      } else if (size.includes("MB")) {
        size = size.replace(/\D/g, "");
        if (size > 100) {
          flag = false;
          this.setState({
            uploaded_url: "",
            background_url: "",
            uploaded_url_key: "",
            uploadedVideoName: "",
          });
        }
      }
      if (flag == false) {
        return toast.warning(Strings.FILE_TOO_LARGE);
      }
      if (
        event.target.files[0].type == "video/mp4" ||
        event.target.files[0].type == "video/quicktime" ||
        event.target.files[0].type == "video/webm"
      ) {
        this.setState({ isLoadingRequest: true });
        this.setState({
          uploadedVideoName: event.target.files[0].name,
        });
        let formData = new FormData(); //formdata object
        formData.append("video", event.target.files[0]); //append the values with key, value pair
        await HTTP.post(urls.uploadVideos, formData)
          .then((result) => {
            if (result.data.status == true) {
              this.setState({
                uploaded_url: result.data.data.Location,
                background_url: result.data.data.Location,
                uploaded_url_key: result.data.data.key,
              });
              toast.success(result.data.message);
            } else {
              toast.warning(result.data.message);
            }
            this.setState({ isLoadingRequest: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoadingRequest: false });
          });
      } else {
        return toast.warning(Strings.ONLY_MP4);
      }
    }
  };

  bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1000, i), 2) + " " + sizes[i];
  };

  deleteVideoS3 = async () => {
    this.setState({ isLoadingRequest: true });
    let video = "background-uploads/1632370407347hey_marco.mp4";
    await HTTP.delete(
      urls.deleteVideoS3 + `?video=${this.state.uploaded_url_key}`
    )
      .then((result) => {
        if (result.data.status == true) {
          this.setState({
            uploaded_url: "",
            background_url: "",
            uploaded_url_key: "",
            uploadedVideoName: "",
          });
          toast.success(result.data.message);
        } else {
          toast.warning(result.data.message);
        }
        this.setState({ isLoadingRequest: false });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ isLoadingRequest: false });
      })
      .finally(() => {
        this.setState({
          uploaded_url: "",
          background_url: "",
          uploaded_url_key: "",
          uploadedVideoName: "",
          isLoadingRequest: false,
        });
      });
  };

  handleCsvUpload = async () => {
    this.setState({ isLoadingCsv: true });
    let formData = new FormData(); //formdata object

    formData.append("csv", this.state.csvData); //append the values with key, value pair
    await HTTP.post(urls.postCsv, formData)
      .then((result) => {
        if (result.data.status == true) {
          if (result?.data?.errorData?.length > 0) {
            let text = "";
            result.data.errorData.map((val) => {
              text +=
                "Request failed at row " +
                val.row +
                ", bacause" +
                val.message +
                ". ";
            });
            toast.warning(text);
          }
          this.setState({
            isSuccessModel: true,
            isCSVModal: false,
            csvData: [],
            uploadedCsvName: "",
          });
          this.getVideos(
            this.state.videoPage,
            this.state.searchField,
            this.state.search_template,
            this.state.filter_column,
            this.state.filter_status,
            this.state.qaFilter,
            this.state.userFilter,
            this.state.selectedVideoStatusValue,
            this.state.searchValue1,
            this.state.searchValue2,
            this.state.filterByEndDate,
            this.state.filterByStartDate
          );
        } else {
          toast.warning(result.data.message);
          this.setState({
            isCSVModal: false,
            csvData: [],
            uploadedCsvName: "",
          });
        }
        this.setState({ isLoadingCsv: false });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ isLoadingCsv: false });
        this.setState({ isCSVModal: false, csvData: [], uploadedCsvName: "" });
      });
  };

  downloadVideo = async () => {
    let vidoe = `?playBackId=${this.state.mux_id}&&fileName=${this.state.video_title}.mp4`;
    await HTTP.get(urls.downloadVideo + vidoe)
      .then((result) => {
        window.open(result.data.downloadUrl, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateEditData = (event, column, type) => {
    let { editData, dynamicVariables, audio, selectedPlayebleVariable } =
      this.state;
    if (
      (column === "background_url" || column === "video_source_url") &&
      type === "background_data"
    ) {
      editData.background_data[column] = event.target.value;
    } else if (type === "landing_data") {
      if (editData.landing_data === null) {
        editData.landing_data = { [column]: event.target.value };
      } else {
        editData.landing_data[column] = event.target.value;
      }
    } else if (type === "video_title") {
      editData.video_title = event.target.value;
    } else if (type === "variables") {
      const { playVariable, selectedPlayebleVariable } = this.state;

      if (
        dynamicVariables &&
        dynamicVariables.length > 0 &&
        dynamicVariables.map((val) => {
          if (val.label == event.target.name) {
            if (event.target.name == selectedPlayebleVariable) {
              if (audio) {
                audio.pause();
              }
              this.setState({
                playVariable: false,
                variablePlaying: false,
                audio: null,
              });
              source.cancel(SOURCE_CANCEL_MESSAGE);
            }
            val.value = event.target.value;
            val.mp3 = "";
            val.value = event.target.value;
          }
        })
      )
        try {
          let variables = JSON.parse(editData.variables);
          if (column === selectedPlayebleVariable) {
            source.cancel(SOURCE_CANCEL_MESSAGE);
            this.setState({
              playVariable: false,
              variablePlaying: false,
              selectedPlayebleVariable: "",
            });
            source = axios.CancelToken.source();
          } else {
            variables[column] = event.target.value;
            editData.variables = variables;
          }
        } catch {
          if (column === selectedPlayebleVariable) {
            source.cancel(SOURCE_CANCEL_MESSAGE);
            this.setState({
              playVariable: false,
              variablePlaying: false,
              selectedPlayebleVariable: "",
            });
            source = axios.CancelToken.source();
          } else {
            newObj[column] = event.target.value;
            editData.variables = newObj;
          }
        }
    }
    this.setState({ editData, dynamicVariables });
  };

  updateVideo = async () => {
    const { editData, background_url, switchUrl, uploaded_url } = this.state;
    if (
      uploaded_url &&
      uploaded_url != editData?.background_data["video_source_url"]
    ) {
      let updateeditData = editData;
      updateeditData["background_data"] = { video_source_url: uploaded_url };
      this.setState({ editData: updateeditData });
    }
    let isValid = this.validateFormEdit();
    let background_data = {};

    if (switchUrl) {
      if (editData?.background_data?.video_source_url) {
        background_data = {
          video_source_url: editData?.background_data?.video_source_url,
        };
      } else {
        background_data = { video_source_url: background_url };
      }
    } else {
      background_data = {
        background_url: editData?.background_data?.background_url,
      };
    }

    let data = {};
    if (editData?.variables) {
      data["variables"] = editData.variables;
    }
    if (editData?.landing_data) {
      data["landing_data"] = editData.landing_data;
    }
    if (editData?.background_data) {
      data["background_data"] = editData.background_data;
    }
    if (editData?.video_title) {
      data["video_title"] = editData.video_title;
    }
    if (isValid) {
      this.setState({ isRequestModalUpdate: false });
      this.cancelAudioRequest();
      let params = "/" + editData.id;
      await HTTP.put(urls.getVideos + params, data)
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message);
            this.getVideos(
              this.state.videoPage,
              this.state.searchField,
              this.state.search_template,
              this.state.filter_column,
              this.state.filter_status,
              this.state.qaFilter,
              this.state.userFilter,
              this.state.selectedVideoStatusValue,
              this.state.searchValue1,
              this.state.searchValue2,
              this.state.filterByEndDate,
              this.state.filterByStartDate
            );
            this.setState({
              selected_template: {},
              title_script: "",
              dynamicVariables: [],
              video_name: "",
              isRequestModalUpdate: false,
              custom_cta: false,
              switchUrl: false,
              vidoeData: [],
              uploadedVidoeData: "",
              background_url: "",
              uploaded_url: "",
              generated: false,
            });
          } else {
            toast.warning(result.data.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          newObj = {};
        });
    }
  };

  validateFormEdit = () => {
    const {
      editData,
      selected_template,
      dynamicVariables,
      background_url,
      switchUrl,
      uploaded_url,
      other_data,
    } = this.state;
    const errors = {};

    if (!selected_template.value) {
      errors.selected_template = "Please select Campaign";
    }

    if (!switchUrl) {
      if (
        editData?.background_data &&
        !editData?.background_data["background_url"] &&
        editData?.background_data["background_url"] == undefined
      ) {
        errors.background_url = Strings.ENTER_VALID_BACKGROUND_URL;
      }
      if (
        editData?.background_data &&
        editData?.background_data["background_url"] &&
        editData?.background_data["background_url"]
          .toLocaleLowerCase()
          .match(
            /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
          ) == null
      ) {
        errors.background_url = Strings.ENTER_VALID_BACKGROUND_URL;
      }
    } else {
      if (
        editData?.background_data &&
        !editData?.background_data["video_source_url"] &&
        editData?.background_data["video_source_url"] == undefined
      ) {
        errors.video_source_url = Strings.ENTER_VALID_BACKGROUND_URL;
      }
      if (!uploaded_url) {
        errors.video_source_url = Strings.ENTER_VALID_BACKGROUND_URL;
      }
    }
    dynamicVariables.map((val) => {
      if (!val.value || val.value.trim() == "") {
        errors[val.label] = "Please enter " + val.label;
      }
      if (!/\d/.test(val.value) && !/[a-zA-Z]/.test(val.value)) {
        errors[val.label] = "Please enter a Valid " + val.label;
      }
    });
    Object.keys(editData?.variables).map(function (key, index) {
      if (!editData?.variables[key]) {
        errors[key] = "Please enter " + key;
      }
    });
    if (
      editData.landing_data &&
      Object.keys(editData.landing_data).length !== 0
    ) {
      Object.keys(editData.landing_data).map(function (key, index) {
        if (
          editData.landing_data[key]
            .toLocaleLowerCase()
            .match(
              "(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
            ) == null
        ) {
          errors[key] = Strings.VALID_HTTP_URL;
        }
      });
    }
    this.setState({ errors });
    return _.isEmpty(errors);
  };

  playAudio = async (val, key, index) => {
    var {
      selected_template,
      dynamicVariables,
      variablePlaying,
      audio,
      playVariable,
      selectedPlayebleVariable,
    } = this.state;
    if (!val || val.trim() == "") {
      return toast.warning(key + " Cannot be blank.");
    }
    if (!/\d/.test(val) && !/[a-zA-Z]/.test(val)) {
      return toast.warning(`Please provide a valid ${key}`);
    }
    if (dynamicVariables[index]?.label) {
      this.setState({
        selectedPlayebleVariable: dynamicVariables[index].label,
      });
    }
    if (audio) {
      if (selectedPlayebleVariable == dynamicVariables[index].label) {
        audio.pause();
        this.setState({
          audio: null,
          playVariable: false,
          variablePlaying: false,
        });
        return;
      } else {
        audio.pause();
        this.setState({
          audio: null,
          playVariable: false,
          variablePlaying: false,
        });
      }
    }
    if (playVariable) {
      if (selectedPlayebleVariable == dynamicVariables[index].label) {
        source.cancel(SOURCE_CANCEL_MESSAGE);
        this.setState({
          playVariable: false,
          variablePlaying: false,
          audio: null,
        });
        source = axios.CancelToken.source();
        return;
      } else {
        source.cancel(SOURCE_CANCEL_MESSAGE);
        this.setState({
          playVariable: false,
          variablePlaying: false,
          audio: null,
        });
        source = axios.CancelToken.source();
      }
    }

    var previewData = {
      variables: {
        [key]: val,
      },
    };
    this.setState({ playIndex: index, playVariable: true });
    if (dynamicVariables[index] && dynamicVariables[index]?.mp3) {
      this.playVariable(dynamicVariables[index]?.mp3);
    } else {
      let self = this;
      await axios
        .post(
          `${urls.variablePreview}${selected_template.value}/preview`,
          previewData,
          {
            cancelToken: source.token,
          }
        )
        .then((result) => {
          if (result == undefined) {
            return;
          }
          if (result.data.status) {
            if (!result.data.data) {
              self.setState({ playIndex: "", playVariable: false });
              return toast.warning(Strings.PREVIEW_FAILED_TRY_AGAIN);
            }
            dynamicVariables[index].mp3 = result.data.data[key];
            this.setState({ dynamicVariables });
            this.playVariable(result.data.data[key]);
          } else {
            self.setState({ playIndex: "", playVariable: false });
            toast.warning(Strings.PREVIEW_FAILED_TRY_AGAIN);
          }
        })
        .catch((err) => {
          self.setState({ playIndex: "", playVariable: false });
          toast.warning(Strings.PREVIEW_FAILED_TRY_AGAIN);
        });
    }
  };

  playVariable = (mp3) => {
    let self = this;
    const { variablePlaying } = this.state;
    var audio = new Audio(mp3);
    if (variablePlaying) {
      audio.pause();
    }
    audio.play();
    this.setState({ variablePlaying: true, audio: audio });
    audio.onended = function () {
      self.setState({
        playIndex: "",
        playVariable: false,
        variablePlaying: false,
        audio: null,
        selectedPlayebleVariable: "",
      });
    };
    return true;
  };

  cancelAudioRequest = () => {
    const { playVariable, audio } = this.state;
    if (playVariable) {
      source.cancel(SOURCE_CANCEL_MESSAGE);
      this.setState({
        playVariable: false,
        variablePlaying: false,
        audio: null,
      });
      source = axios.CancelToken.source();
    }
    if (audio) {
      audio.pause();
      this.setState({ audio: null });
    }
    return true;
  };

  editVideo = (item) => {
    this.props.history.push(`/edit-video/${item?.id}/${item?.campaign_id}`);
  };

  handleChangeTemplate = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  gottoVideo = (campaignId, data) => {
    let id = data.find((x) => x.id == parseInt(campaignId));
    SegmentService.analyticsTrack("One Off Campaign Selected", {
      campaignId: parseInt(campaignId),
      campaign_name: id.campaign_name,
    });
    let errors = {};
    if (!this.state.templateForVideo) {
      errors.templateForVideo = "Please select campaign.";
      this.setState({ errors });
      return;
    }
    this.props.history.push(`/create-video/${campaignId}`);
  };
  Downloadcsv = async () => {
    const requestId = this.props?.match?.params?.requestId;
    const {
      selectedVideoStatusValue,
      search_template,
      qaFilter,
      // searchValue1,
      // searchValue2,
      // filterWithDate,
    } = this.state;
    this.setState({ isDownload: true });
    const data = await UserService.DownloadCsv(
      selectedVideoStatusValue,
      search_template,
      qaFilter,
      requestId
      // searchValue1,
      // searchValue2,
      // filterWithDate.startDate,
      // filterWithDate.endDate
    );
    if (data?.data) {
      this.setState({ csvDownloadData: data?.data });
      this.csvLink.current.link.click();
      this.setState({ isDownload: false });
    }
  };
  selectedStartDate = (date) => {
    this.setState({ startDate: date });
    let selectedStartDate = moment(date).format("YYYY-MM-DD");
    this.setState({ formatStartDate: selectedStartDate });
    if (!this.state.endDate && date) {
      document.getElementById("showMsg").innerHTML =
        "Please select an end date";
    } else if (this.state.endDate && date) {
      document.getElementById("showMsg").innerHTML = "";
    } else if (!this.state.endDate && !date) {
      document.getElementById("showMsg").innerHTML = "";
    } else if (date === null && this.state.endDate) {
      document.getElementById("showMsg").innerHTML =
        "Please select an start Date";
    }
  };
  selectedEndDate = (date) => {
    this.setState({ endDate: date });
    let selectedEndDate = moment(date).format("YYYY-MM-DD");
    this.setState({ formatEndDate: selectedEndDate });
    if (!this.state.startDate && date) {
      document.getElementById("showMsg").innerHTML =
        "Please select an start date";
    } else if (this.state.startDate && date) {
      document.getElementById("showMsg").innerHTML = "";
    } else if (!this.state.startDate && !date) {
      document.getElementById("showMsg").innerHTML = "";
    } else if (date === null && this.state.startDate) {
      document.getElementById("showMsg").innerHTML =
        "Please select an end Date";
    }
  };

  onhandleSubmit = async () => {
    this.setState({
      search_template: this.state.filter_search_template,
      qaFilter: this.state.filter_qaFilter,
      selectedVideoStatusValue: this.state.filterSelectedVideoStatusValue,
      searchValue1: this.state.searchById,
      searchValue2: this.state.searchByTitle,
      filterByStartDate: this.state.formatStartDate,
      filterByEndDate: this.state.formatEndDate,
    });
    this.getVideos(
      this.state.videoPage,
      this.state.searchField,
      this.state.filter_search_template,
      this.state.filter_column,
      this.state.filter_status,
      this.state.filter_qaFilter,
      this.state.userFilter,
      this.state.filterSelectedVideoStatusValue,
      this.state.searchById,
      this.state.searchByTitle,
      this.state.formatEndDate,
      this.state.formatStartDate
    );
    this.setState({
      isDialogOpenFilter: false,
    });
  };

  resetOnClick = () => {
    this.setState({
      searchById: "",
      searchByTitle: "",
      selectedUser: null,
      selectedVideoStatus: {},
      selectedTemp: {},
      filter_search_template: "",
      filter_qaFilter: "",
      filterSelectedVideoStatusValue: "",
      searchValue1: "",
      searchValue2: "",
      qaFilter: "",
      search_template: "",
      qa_status: {},
      filterByEndDate: "",
      filterByStartDate: "",
      startDate: "",
      endDate: "",
      formatStartDate: "",
      formatEndDate: "",
      filter_status: "",
      selectedVideoStatusValue: "",
    });
    this.getVideos(
      0,
      "",
      [],
      this.state.filter_column,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
  };
  render = () => html.apply(this);
}

export default Dashboard;
