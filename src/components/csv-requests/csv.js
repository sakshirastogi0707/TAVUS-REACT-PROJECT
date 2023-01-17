import React, { Component, useRef } from "react";
import "./csv.scss";
import axios from "axios";
import { html } from "./csv.html";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { HTTP } from "../../service/core/http.service";
import { urls } from "../../config/urlConfig";
import { Config } from "../../config/config";
import copyImg from "copy-image-clipboard";
import Strings from "../../constants/strings";
import Papa from "papaparse";
import Utils from "../../service/core/utils";
import { array } from "prop-types";
import {
  StorageService,
  StorageKeys,
} from "../../service/core/storage.service";
import { CampaignService } from "../../service/api/campaign.service";
import { SegmentService } from "../../service/api/segment.service";
const { ClipboardItem } = window;

let source;
class Csv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isDialogOpen: false,
      errors: {},
      isLoading: false,
      activePage: 1,
      csvData: [],
      isLoadingCsv: false,
      uploadedCsvName: "",
      isSuccessModel: false,
      isTemplateModal: false,
      allRequests: [],
      filter_column: "submitted_date",
      filter_status: "DESC",
      search_template: "",
      searchField: "",
      isOpen: false,
      isMapCsv: false,
      csvLength: 0,
      templates: [],
      selected_template: "",
      tempData: [],
      dynamicVariables: [],
      background_url: "",
      title_script: "",
      custom_cta: false,
      custom_cta_url: "",
      keyValues: [],
      headerArray: [],
      csvColumn: [],
      isViewCsvData: false,
      decodedCsv: [],
      tableHeaders: [],
      originalCsvData: [],
      processedCsvData: [],
      wrongTemplate: false,
      play: false,
      audioUrl: "",
      arrayIndex: "",
      objectKeyName: "",
      videoCreating: false,
      playVariable: false,
      loadingData: false,
      allVideos: [],
      isShowVideo: false,
      default_video_url: Config.VIDEO_URL,
      playing: false,
      audio: null,
      disableBtn: false,
      playLoder: "",
      audioKeyLoader: "",
      is_blank: false,
      mappingVariable: [],
    };
    source = axios.CancelToken.source();
  }

  getTemplateName = (id) => {
    return (
      this.state.templates &&
      this.state.templates.length > 0 &&
      this.state.templates.map((val) => {
        if (val.template_id == id) {
          return val.template_name;
        }
      })
    );
  };
  
  handleChange = (files) => {
    if (files && files.length > 0) {
      this.setState({ csvData: files[0], uploadedCsvName: files[0]?.name });
    }
  }; 

  componentDidMount() {
    SegmentService.analyticsTrack("CSV Requests Accessed", {});
    this.getRequests(
      1,
      this.state.searchField,
      this.state.filter_column,
      this.state.filter_status
    );
    this.getTemplates();
  }

  getCsvStatus = async (id) => {
    let data = { bulk_request_id: id };
    await HTTP.post(urls.bulkRequest + "/csvStatus", data)
      .then((result) => {
        if (result.status == 200) {
          //this.getRequests(1, this.state.searchField, this.state.filter_column, this.state.filter_status)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getTemplates = async () => {
    const campaigns = await CampaignService.getCampaignList(1);
    if (campaigns?.rows) {
      let tempData = [{ value: "", label: "All Campaigns" }];
      campaigns.rows.map((val) => {
        tempData.push({ value: val.id, label: val.campaign_name });
      });
      this.setState({
        templates: campaigns.rows,
        tempData: tempData,
      });
    }
  };

  handleChangeTemplate = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
      dynamicVariables: [],
      background_url: "",
      title_script: "",
      custom_cta: false,
      custom_cta_url: "",
    });
    let ids = [];
    let data = this.state.templates.find(
      (x) => x.id == parseInt(event.target.value)
    );
    SegmentService.analyticsTrack("Upload CSV Started", {
      campaignId: data.id,
      campaign_name: data.campaign_name,
    });
    let filterArray = this.state.templates.filter(function (val) {
      return val.id == event.target.value;
    });
    var csvColumn = [];
    if (filterArray.length > 0) {
      try {
        let parserVariables = filterArray[0].variables;
        for (let obj of parserVariables) {
          csvColumn.push(obj);
        }
        this.setState({
          csvColumn,
        });
      } catch {}
      let arr = filterArray[0]?.variables;
      filterArray[0].generated
        ? this.setState({ generated: true })
        : this.setState({ generated: false });
      if (arr.length > 0) {
        arr.map((val) => {
          let placeHolderText = "";
          ids.push({ label: val, value: "", placeHolderText, variable: true });
        });
        this.setState({ dynamicVariables: ids });
      }
    }
  };

  handleChangeHeader = (event) => {
    const name = event.target.name;
    const head_val = event.target.value;
    let variableArr = this.state.dynamicVariables;

    let mappingVariable = [];
    variableArr.map((val) => {
      if (name == val.label) {
        val.value = head_val;
      }
      mappingVariable.push({ [val.label]: val.value });
    });

    this.setState({
      headerArray: variableArr,
      mappingVariable: mappingVariable,
    });
  };

  handleVariables = (event) => {
    let variableArr = this.state.dynamicVariables;
    variableArr.map((val) => {
      if (event.target.name == val.label) {
        val.value = event.target.value;
      }
    });
    this.setState({ dynamicVariables: variableArr });
  };

  openDate = (choice) => {
    this.setState({ isOpen: choice });
  };

  handleDateChange = (date) => {
    let gmtstart_time = moment(date).format("YYYY-MM-DD");
    this.setState({ searchField: gmtstart_time });
    this.setState({ isOpen: false });
    this.getRequests(
      1,
      gmtstart_time,
      this.state.filter_column,
      this.state.filter_status
    );
  };

  handleChangeName = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  pagination = (e) => {
    this.getRequests(
      e,
      this.state.searchField,
      this.state.filter_column,
      this.state.filter_status
    );
  };

  filterTable = (choice) => {
    const { filter_status, filter_column, searchField } = this.state;
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
    this.getRequests(1, searchField, choice.toLocaleLowerCase(), status);
  };

  getRequests = async (page = 1, text, orderColumn, orderValue) => {
    let params = "?limit=10&page=" + page;
    await HTTP.get(urls.bulkRequest + params)
      .then((result) => {
        if (result.status == 200) {
          if (result.data?.data?.rows) {
            this.setState({
              allRequests: result.data.data.rows,
              totalItemsCount: result.data.data.count,
              activePage: page,
            });
            return result.data?.data?.rows.map(async (val) => {
              if (val.status == "In Queue") {
                await this.getCsvStatus(val.id);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  openModel = (isDialogOpen, name) => {
    let { audio, playing } = this.state;
    let objState = {
      [name]: isDialogOpen,
    };
    if (isDialogOpen && name == "isTemplateModal") {
      objState["csvColumn"] = [];
      objState["selected_template"] = "";
      objState["tableHeaders"] = "";
      objState["decodedCsv"] = [];
    }

    if (!isDialogOpen && name == "isCSVModal") {
      objState["csvData"] = [];
      objState["uploadedCsvName"] = "";
      objState["decodedCsv"] = [];
    }
    if (name == "isViewCsvData" && !isDialogOpen) {
      source.cancel("Landing Component got unmounted");
      if (playing) {
        this.setState({
          play: false,
        });
        audio.pause();
      }
      this.setState({ playLoder: "", audioKeyLoader: "" });
      source = axios.CancelToken.source();
    }

    this.setState({ disableBtn: false, is_blank: false });
    
    this.setState(objState);
  };

  openShareModel = (isDialogOpen, name, data) => {};

  getDate = (date) => {
    if (!date) {
      return "-";
    }
    return moment(date).format("MMM DD, hh:mm A");
  };

  getVideos = async (request_id) => {
    let params = "?request_id=" + request_id;
    await HTTP.get(urls.getVideos + params)
      .then((result) => {
        if (result.status == 200) {
          if (result.data?.data?.rows) {
            if (result.data?.data?.rows.length > 0) {
              this.setState({ isShowVideo: true });
            } else {
              toast.warning("No Data found");
            }
            this.setState({
              allVideos: result.data.data.rows,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  confirmFunction = (event) => {
    if (event.target.files[0] && event.target.files[0].type == "text/csv") {
      this.setState({
        csvData: event.target.files[0],
        uploadedCsvName: event.target.files[0].name,
      });
      const { dynamicVariables } = this.state;
      let self = this;
      Papa.parse(event.target.files[0], {
        complete: function (results) {
          let newCsvData = [];
          let newCsvData2 = [];
          let i = 0;
          let keyValues = [];
          var keys = results.data[0];
          if (keys.length > 0) {
            keys.map((val) => {
              keyValues.push({
                value: val.replaceAll('"', ""),
                label: val.replaceAll('"', ""),
              });
            });
          }
          var uniqueHeaders = results.data[0];
          
          for (let newData of results.data) {
            let enableWrite = false;
            for (let ele of newData) {
              if (ele) {
                enableWrite = true;
              }
            }

            if (i > 0 && enableWrite) {
              let j = 0;
              let childNewDataObj = {};
              let childNewDataObj2 = {};
              for (let childNewData of newData) {
                if (!childNewData) {
                  self.setState({ is_blank: true });
                }
                var findMap = dynamicVariables.find((val, index) => {
                  return val.label == results.data[0][j];
                });
                if (findMap) {
                  var findIndex = results.data[0].findIndex(
                    (x) => x === findMap.value
                  );
                  if (findIndex != -1) {
                    childNewDataObj[results.data[0][j]] = newData[findIndex];
                  } else {
                    childNewDataObj[results.data[0][j]] = childNewData;
                  }
                } else {
                  childNewDataObj[results.data[0][j]] = childNewData;
                }

                childNewDataObj2[results.data[0][j]] = childNewData;
                j++;
              }
              newCsvData2.push(childNewDataObj);
              newCsvData.push(childNewDataObj2);
            }
            i++;
          }
          self.setState({ csvLength: newCsvData2.length, keyValues });
        },
      });
    } else {
      return toast.warning(Strings.UPLOAD_CSV);
    }
  };

  handleCsvUpload = async () => {
    this.setState({ isLoadingCsv: true });
    let formData = new FormData(); //formdata object
    formData.append("csv", this.state.csvData); //append the values with key, value pair
    formData.append("csvLength", this.state.csvLength);
    await HTTP.post(urls.postRequests, formData)
      .then((result) => {
        if (result.data.status == true) {
          this.getRequests(
            1,
            this.state.searchField,
            this.state.filter_column,
            this.state.filter_status
          );
          this.setState({
            isSuccessModel: true,
            isCSVModal: false,
            csvData: [],
            uploadedCsvName: "",
            dynamicVariables: [],
            background_url: "",
            title_script: "",
            custom_cta: false,
            custom_cta_url: "",
            selected_template: "",
          });
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
        this.setState({ isLoadingCsv: false });
        this.setState({ isCSVModal: false, csvData: [], uploadedCsvName: "" });
      });
  };

  submit = async () => {
    const {
      custom_cta,
      dynamicVariables,
      selected_template,
      generated,
      background_url,
      custom_cta_url,
      title_script,
    } = this.state;
    let isValid = this.validateForm();
    let dataArray = {};
    dynamicVariables.map((val) => {
      dataArray[val.label] = val.value.toString().replaceAll("\n", " ");
    });
    
    if (generated && background_url) {
      dataArray["background_url"] = background_url;
    }
    if (custom_cta && custom_cta_url) {
      dataArray["custom_cta_url"] = custom_cta_url;
    }
    if (isValid && dataArray) {
      this.setState({ isRequestModal: false, isLoadingMap: true });
      let formData = new FormData(); //formdata object
      formData.append("csv", this.state.csvData); //append the values with key, value pair
      formData.append("csvLength", this.state.csvLength);
      formData.append("header_mappings", JSON.stringify(dataArray));
      await HTTP.post(urls.postRequests, formData)
        .then((result) => {
          if (result.data.status == true) {
            this.getRequests(
              1,
              this.state.searchField,
              this.state.filter_column,
              this.state.filter_status
            );
            this.setState({
              isSuccessModel: true,
              isCSVModal: false,
              isMapCsv: false,
              csvData: [],
              uploadedCsvName: "",
              dynamicVariables: [],
              background_url: "",
              title_script: "",
              custom_cta: false,
              custom_cta_url: "",
              selected_template: "",
            });
          } else {
            toast.warning(result.data.message);
            this.setState({
              isCSVModal: false,
              csvData: [],
              uploadedCsvName: "",
            });
          }
          this.setState({ isLoadingMap: false });
        })
        .catch((err) => {
          this.setState({ isLoadingMap: false });
          this.setState({
            isCSVModal: false,
            csvData: [],
            uploadedCsvName: "",
          });
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
    } = this.state;
    const errors = {};
    if (!selected_template) {
      errors.selected_template = "Please select Campaign";
    }

    dynamicVariables.map((val) => {
      if (!val.value) {
        errors[val.label] = "Please select " + val.label;
      }
    });

    this.setState({ errors });
    return _.isEmpty(errors);
  };

  editVaraible = (object, key, type) => {
    var { decodedCsv, playing, audio } = this.state;
    this.setState({ disableBtn: true });
    if (type !== "enabled") {
      for (let everyKey of Object.keys(decodedCsv[key])) {
        let keyVariable = decodedCsv[key][everyKey].toString();
        if (
          everyKey != "edit" &&
          everyKey != "play" &&
          everyKey != "mp3" &&
          everyKey != "loader"
        ) {
          if (keyVariable.trim() == "") {
            return toast.error(`Please enter value in ${everyKey}`);
          }
          if (decodedCsv[key].background_url) {
            if (
              decodedCsv[key]?.background_url.match(
                /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
              ) == null
            ) {
              return toast.error(Strings.PROVIDE_VALID_URL);
            }
          }
          if (
            !/\d/.test(keyVariable) &&
            !/[a-zA-Z]/.test(keyVariable) &&
            everyKey != "background_url"
          ) {
            return toast.error(`Please provide a valid ${everyKey}`);
          }
        }
      }
      decodedCsv[key]["mp3"] = [];
      decodedCsv[key]["play"] = [];
    }
    if (decodedCsv[key]["play"] && decodedCsv[key]["play"].length > 0) {
      return false;
    }
    if (playing) {
      this.setState({
        play: false,
      });
      audio.pause();

      let newDecodeArray = [];
      for (let decodeObj of decodedCsv) {
        decodeObj.play = [];
        newDecodeArray.push(decodeObj);
      }
      decodedCsv = newDecodeArray;
      this.setState({ playLoder: "", audioKeyLoader: "", decodedCsv });
    }

    if (type == "disabled") {
      this.setState({ disableBtn: false });
    }
    source.cancel("Landing Component got unmounted");
    source = axios.CancelToken.source();
    decodedCsv[key]["edit"] = type === "enabled" ? true : false;
    this.setState({
      decodedCsv,
      disableBtn: decodedCsv[key]["edit"],
      playLoder: "",
      audioKeyLoader: "",
    });
  };

  chackColumnName = (everyKey) => {
    if (
      everyKey != "edit" &&
      everyKey != "play" &&
      everyKey != "mp3" &&
      everyKey != "loader"
    ) {
      return true;
    }
    return false;
  };

  changeVariableBlur = (event, object, index, key) => {
    var { decodedCsv } = this.state;
    decodedCsv[index]["edit"] = false;
    decodedCsv[index][key] = event.target.value;
    this.setState({ decodedCsv });
  };

  changeVariable = (event, object, index, key) => {
    var { decodedCsv, processedCsvData, mappingVariable } = this.state;
    mappingVariable.map((val) => {
      if (val[key]) {
        let valKey = val[key];
        processedCsvData[index][valKey] = event.target.value;
      }
    });
    decodedCsv[index][key] = event.target.value;
    this.setState({
      decodedCsv: decodedCsv,
      processedCsvData: processedCsvData,
    });
  };

  validatePreview = (isDialogOpen, name) => {
    let isValid = this.validateForm();
    if (!isValid) {
      toast.error("Please select all");
      return false;
    }

    let objState = {
      [name]: isDialogOpen,
      loadingData: true,
    };
    this.setState(objState);
    const { dynamicVariables } = this.state;
    let self = this;
    if (name === "isViewCsvData") {
      Papa.parse(self.state.csvData, {
        complete: function (results) {
          let newCsvData = [];
          let newCsvData2 = [];
          let newCsvData3 = [];
          let i = 0;
          
          for (let newData of results.data) {
            let enableWrite = false;
            for (let ele of newData) {
              if (ele) {
                enableWrite = true;
              }
            }
            if (i > 0 && enableWrite) {
              let j = 0;
              let childNewDataObj = {};
              let childNewDataObj2 = {};
              let childNewDataObj3 = {};
              for (let childNewData of newData) {
                for (let dynamicVariable of dynamicVariables) {
                  if (results.data[0].includes(dynamicVariable.value)) {
                    let findIndex = results.data[0].findIndex(
                      (x) => x === dynamicVariable.value
                    );
                    if (findIndex != -1) {
                      childNewDataObj[dynamicVariable.label] =
                        newData[findIndex];
                    }
                  }
                }

                childNewDataObj2[results.data[0][j]] = childNewData;
                childNewDataObj3[results.data[0][j]] = childNewData;
                j++;
              }
              newCsvData2.push(childNewDataObj);
              newCsvData.push(childNewDataObj2);
              newCsvData3.push(childNewDataObj3);
            }
            i++;
          }
          //make header
          var headers = [];
          for (let header of dynamicVariables) {
            headers.push(header.label);
          }

          self.setState({
            decodedCsv: newCsvData2,
            tableHeaders: headers,
            originalCsvData: newCsvData,
            processedCsvData: newCsvData3,
          });
          setTimeout(() => {
            self.setState({
              loadingData: false,
            });
          }, 1000);
        },
      });
    }
  };

  validateData = (data) => {
    const { dynamicVariables } = this.state;
    var error = false;
    for (let objData of data) {
      for (let everyKey of Object.keys(objData)) {
        var isDynamic = dynamicVariables.find((val, index) => {
          return val.label === everyKey && val.variable == true;
        });
        if (isDynamic) {
          if (objData[everyKey] == "") {
            error = true;
            toast.error("Please check " + everyKey + "s value");
            return true;
          }
          if (
            !/\d/.test(objData[everyKey]) &&
            !/[a-zA-Z]/.test(objData[everyKey]) &&
            objData[everyKey] != "background_url"
          ) {
            return toast.error(`Please provide a valid ${everyKey}`);
          }
        } else {
          if (everyKey == "background_url") {
            if (objData[everyKey] == "") {
              error = true;
              toast.error("Please check " + everyKey + "s value");
            }
            else if (
              objData[everyKey]
                .match(
                  /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
                ) == null
            ) {
              toast.error(`Please enter a valid background video url`);
              return true;
            }
          } else if (everyKey == "custom_cta_url") {
            if (objData[everyKey] == "") {
              error = true;
              toast.error("Please check " + everyKey + "s value");
              return true;
            }
           
            else if (
              objData[everyKey]
                .match(
                  /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
                ) == null
            ) {
              toast.error(`Please enter a valid CTA URL`);
              return true;
            }
          }
        }
      }
    }
    return error;
  };

  generateVideo = async () => {
    const {
      decodedCsv,
      originalCsvData,
      dynamicVariables,
      playVariable,
      videoCreating,
      title_script,
      disableBtn,
      processedCsvData,
    } = this.state;
    if (disableBtn) {
      return false;
    }
    if (videoCreating) {
      return false;
    }
    if (playVariable) {
      return false;
    }
    if (this.validateData(decodedCsv)) {
      return false;
    }
    if (
      window.confirm(
        "Hey, Click on 'Generate videos' will start your creation process. Do you wish to proceed?"
      )
    ) {
      var data = [];
    let noOfrows = decodedCsv.length;

      for (let objData of decodedCsv) {
        var obj = {};
        obj.variables = {};
        for (let everyKey of Object.keys(objData)) {
          var isDynamic = dynamicVariables.find((val, index) => {
            return val.label === everyKey && val.variable == true;
          });
          if (isDynamic) {
            if(everyKey == "background_url"){
              let testBackgroundUrl = Utils.urlValidation(objData[everyKey])
              if(!testBackgroundUrl){
                return toast.warning(`Not a valid ${everyKey}`);
              }
              objData[everyKey] = testBackgroundUrl
            }
            obj.variables[everyKey] = objData[everyKey];
          } else {
            if (everyKey == "background_url") {
              if (!objData[everyKey]) {
              }
              obj["background_data"] = { background_url: objData[everyKey] };
            } else if (everyKey == "custom_cta_url") {
              obj["landing_data"] = { custom_cta_url: objData[everyKey] };
            }
          }
        }
        data.push(obj);
      }
      var apiData = {};
      apiData.campaign_id = parseInt(this.state.selected_template);
      apiData.data = data;
      apiData.original_csv_data = originalCsvData;
      apiData.processedCsvData = originalCsvData;
      this.setState({
        videoCreating: true,
      });
      await HTTP.post(`${urls.bulkRequest}`, apiData)
        .then((result) => {
            SegmentService.analyticsTrack("Upload Completed",{rows:noOfrows})
          if (result.data.status) {
            this.setState({
              isSuccessModel: true,
              isCSVModal: false,
              csvData: [],
              uploadedCsvName: "",
              dynamicVariables: [],
              background_url: "",
              title_script: "",
              custom_cta: false,
              custom_cta_url: "",
              selected_template: "",
              dynamicVariables: [],
              keyValues: [],
              headerArray: [],
              csvColumn: [],
              isViewCsvData: false,
              decodedCsv: [],
              tableHeaders: [],
              originalCsvData: [],
              processedCsvData: [],
              wrongTemplate: false,
              play: false,
              audioUrl: "",
              arrayIndex: "",
              objectKeyName: "",
              videoCreating: false,
              isSuccessModel: true,
              isMapCsv: false,
            });
            toast.success(Strings.GENERATING_VIDEO);
          } else {
            toast.success(Strings.GENERAL_EXCEPTION_RESPONSE);
            this.setState({
              videoCreating: false,
            });
          }
        })
        .catch((err) => {
          toast.warning(Strings.GENERAL_EXCEPTION_RESPONSE);
          this.setState({
            videoCreating: false,
          });
        });
    } else {
      this.setState({ videoCreating: false });
    }
  };

  validateCsvDataAndBlank = () => {
    const { wrongTemplate, csvData, csvLength, is_blank } = this.state;
    if (csvData == "") {
      return toast.warning(Strings.ADD_CSV_FILE);
    }
    if (csvLength < 1) {
      return toast.warning(Strings.CSV_CANNOT_BE_BLANK);
    }
    if (csvLength > 10000) {
      return toast.warning("Maximum 1000 records allow in csv.");
    }
    if (is_blank) {
      return this.confirmUploadCsv();
    }
    this.setState({ isCSVModal: false, isMapCsv: true });
  };

  confirmUploadCsv = () => {
    if (window.confirm(Strings.UPLOAD_BLANK_CELLS)) {
      this.setState({ isCSVModal: false, isMapCsv: true });
    } else {
      //this.setState({ is_blank: false })
    }
  };
  getButton = (index, keyName) => {
    const { decodedCsv } = this.state;
    let mp3Array =
      decodedCsv[index]["mp3"] && Array.isArray(decodedCsv[index]["mp3"])
        ? decodedCsv[index]["mp3"]
        : [];
    let findMp3 = mp3Array.find((ele, index) => {
      return ele.hasOwnProperty(keyName);
    });
    if (
      findMp3 &&
      findMp3 != undefined &&
      findMp3[keyName] != "" &&
      findMp3[keyName] != undefined
    ) {
      return false;
    }
    return true;
  };

  playVariable = async (val, key, audioObject, audioKey, audioEvent) => {
    SegmentService.analyticsTrack("Sample Audio Requested", {
      Word: val,
      variable: key,
      location: "csv",
    });
    var {
      selected_template,
      decodedCsv,
      arrayIndex,
      objectKeyName,
      playVariable,
      playing,
      audio,
      playLoder,
      audioKeyLoader,
    } = this.state;
    if (playLoder == key && audioKeyLoader == audioKey) {
      return false;
    }

    if (!val || val.trim() == null) {
      return toast.warning(Strings.MISSING_VALUE);
    }

    const pause =
      decodedCsv[audioKey].play &&
      decodedCsv[audioKey].play != undefined &&
      decodedCsv[audioKey].play.includes(key);
    if (pause) {
      let newDecodeArray = [];
      for (let decodeObj of decodedCsv) {
        decodeObj.play = [];
        newDecodeArray.push(decodeObj);
      }
      decodedCsv = newDecodeArray;
      this.setState({ decodedCsv });
      audio.pause();
      return false;
    }

    if (playing) {
      let newDecodeArray = [];
      for (let decodeObj of decodedCsv) {
        decodeObj.play = [];
        newDecodeArray.push(decodeObj);
      }
      decodedCsv = newDecodeArray;
      this.setState({
        play: false,
        playLoder: "",
        audioKeyLoader: "",
        decodedCsv,
      });
      audio.pause();
      if (playLoder == key && arrayIndex == audioKey) {
        return false;
      }
    }

    var previewData = {
      input_text: val,
      campaign_id: selected_template,
    };

    let self = this;
    let mp3 = "";
    if (Array.isArray(decodedCsv[audioKey]["mp3"])) {
      let findMp3 = decodedCsv[audioKey]["mp3"].find((ele, index) => {
        return ele[key] && ele[key] != undefined;
      });
      if (findMp3) {
        mp3 = findMp3[key];
      }
    }

    if (mp3) {
      source.cancel("Landing Component got unmounted");
      source = axios.CancelToken.source();
      decodedCsv[audioKey].play = [key];

      this.setState({ decodedCsv, audioKeyLoader: "", playLoder: "" });
      this.playAudio(audioKey, mp3, key);
    } else {
      source.cancel("Landing Component got unmounted");
      source = axios.CancelToken.source();
      
      this.setState({
        playLoder: key,
        audioKeyLoader: audioKey,
        decodedCsv,
        play: false,
      });
      this.setStateForPlayVariable(audioKey, audioKey, key, "", key);

      await axios
        .post(`${urls.variablePreview}`, previewData, {
          cancelToken: source.token,
        })
        .then((result) => {
          if (result == undefined) {
            decodedCsv[audioKey].play = [];
            this.setState({ decodedCsv });

            return false;
          }
          if (result.data.status) {
            if (!result.data.data.final_audio_url) {
              decodedCsv[audioKey].play = [];
              this.setState({ decodedCsv, playLoder: "", audioKeyLoader: "" });
              toast.warning("Not getting any responce from preview api.");
              return false;
            }
            //save locally
            let mp3Array =
              decodedCsv[audioKey]["mp3"] &&
              Array.isArray(decodedCsv[audioKey]["mp3"])
                ? decodedCsv[audioKey]["mp3"]
                : [];
            let findMp3 = mp3Array.findIndex((ele, index) => {
              return ele.hasOwnProperty(key);
            });
            if (findMp3 > -1) {
              let mp3Object = {
                [key]: result.data.data.final_audio_url,
              };
              mp3Array[findMp3] = mp3Object;
            } else {
              let mp3Object = {
                [key]: result.data.data[key],
              };
              mp3Array.push(mp3Object);
            }
            decodedCsv[audioKey].mp3 = mp3Array;
            decodedCsv[audioKey].play = [key];
            this.setState({ decodedCsv, playLoder: "", audioKeyLoader: "" });
            this.playAudio(audioKey, result.data.data.final_audio_url, key);
          } else {
            decodedCsv[audioKey].play = [];
            this.setState({ decodedCsv, playLoder: "", audioKeyLoader: "" });
            toast.warning("Not getting any responce from preview api.");
          }
        })
        .catch((err) => {
          decodedCsv[audioKey].play = [];
          this.setState({ decodedCsv, playLoder: "", audioKeyLoader: "" });
          toast.warning("Not getting any responce from preview api.");
        });
    }
  };

  setStateForPlayVariable = (
    audioKey,
    arrayIndex,
    objectKeyName,
    mp3url,
    play,
    removeLoader = false
  ) => {
    var { decodedCsv } = this.state;
    let playArray = [];
    let mp3Array =
      decodedCsv[audioKey]["mp3"] && Array.isArray(decodedCsv[audioKey]["mp3"])
        ? decodedCsv[audioKey]["mp3"]
        : [];
    if (removeLoader) {
      playArray = [];
    } else {
      playArray.push(play);
    }
    let findMp3 = mp3Array.findIndex((ele, index) => {
      return ele.hasOwnProperty(play);
    });
    if (findMp3 > -1) {
      let mp3Object = {
        [play]: mp3url,
      };
      mp3Array[findMp3] = mp3Object;
    } else {
      let mp3Object = {
        [play]: mp3url,
      };
      mp3Array.push(mp3Object);
    }

    let newDecodeArray = [];
    for (let decodeObj of decodedCsv) {
      decodeObj.play = [];
      newDecodeArray.push(decodeObj);
    }
    decodedCsv = newDecodeArray;

    decodedCsv[audioKey]["mp3"] = mp3Array;
    decodedCsv[audioKey]["play"] = playArray;
    this.setState({
      arrayIndex,
      objectKeyName,
      decodedCsv,
    });
  };

  playAudio = (audioKey, mp3url, key) => {
    const {
      decodedCsv,
      playing,
      audio,
      isViewCsvData,
      disableBtn,
      playLoder,
      audioKeyLoader,
    } = this.state;
    if (decodedCsv[audioKey]["play"].includes(key) && isViewCsvData) {
      var audioInit = new Audio(mp3url);
      audioInit.play();
      this.setState({ playing: true, audio: audioInit, decodedCsv });
      let self = this;
      audioInit.onended = function () {
        self.setState({ playing: false, disableBtn: false });
        self.setStateForPlayVariable(audioKey, "", "", mp3url, key, true);
      };
    }
  };

  downloadCsv = (item) => {
    window.open(`${urls.downloadCsv}${item.id}`);
    return false;
  };

  recallApi = () => {
    this.openModel(false, "isSuccessModel");
    this.getRequests(
      1,
      this.state.searchField,
      this.state.filter_column,
      this.state.filter_status
    );
  };

  getStatus = (status) => {
    switch (status) {
      case "generating_audio":
        return "Generating 🚀";
      case "audio_generated":
        return "Generating 🚀";
      case "generating_lipsync":
        return "Generating 🚀";
      case "lipsync_generated":
        return "Generating 🚀";
      case "ready":
        return "Ready ✅";
      case "error_audio":
        return " Error ☹️";
      case "error_lipsync":
        return " Error ☹️";
      default:
        return "Generating 🚀";
    }
  };

  render = () => html.apply(this);
}

export default Csv;
