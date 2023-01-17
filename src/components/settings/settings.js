import React, { Component, useRef } from "react";
import "./settings.scss";
import { html } from "./settings.html";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import { HTTP } from "../../service/core/http.service";
import { urls } from "../../config/urlConfig";
import { Config } from "../../config/config";
import Strings from "../../constants/strings";
import { CampaignService } from "../../service/api/campaign.service";
import { SegmentService } from "../.././service/api/segment.service";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCSVModal: false,
      isDeleteModal: false,
      selectedDomain: null,
      isWaitingModal: false,
      isDomainDeleteLoader: true,
      domain_name: "",
      subdomain: "",
      userDomains: [],
      showScreen: "first",
      userDomain: [],
      templates: [],
      selected_template: null,
      tempData: [],
      isLoading: false,
      isLoadingDomain: false,
      msgValidate: {
        messsage: "",
        open: false,
        type: "info",
        background: "",
      },
    };
  }

  componentDidMount() {
    this.getDomain();
    this.getTemplates();
    SegmentService.analyticsTrack("Domains Accessed", {});
  }

  getTemplates = async () => {
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
    }
  };

  getDomain = async () => {
    this.setState({ isLoading: true });
    await HTTP.get(urls.getDomain)
      .then((result) => {
        if (result.status == 200) {
          if (result.data.data.length > 0) {
            this.setState({ userDomains: result.data.data });
            this.setState({
              isCSVModal: false,
              isVideoModal: false,
              domain_name: "",
              subdomain: "",
              showScreen: "first",
            });
            if (this.props?.match?.params?.id) {
              this.getDomainStatus(this.props?.match?.params?.id);
            } else {
              let inactiveDomains = [];
              for (let i = 0; i < result.data.data.length; i++) {
                if (
                  !result.data.data[i].is_active &&
                  result.data.data[i].validate_ssl
                ) {
                  inactiveDomains.push({
                    id: result.data.data[i].id,
                    url: `https://${result.data.data[i].alb_host}`,
                  });
                }
              }
              if (inactiveDomains.length > 0) {
                this.checkDomainStatus(inactiveDomains);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  checkDomainStatus = async (domains) => {
    await HTTP.post(urls.activeDomain, { domains })
      .then((result) => {
        if (result.data.status) {
          if (result.data.updated) {
            this.getDomain();
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        this.setState({ isLoadingDomain: false });
      });
  };

  handleChange = (event) => {
    if (event.target.name == "subdomain") {
      if (
        event.target.value &&
        !/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(event.target.value)
      ) {
        return toast.error(`Please provide a valid ${event.target.name}`);
      }
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  openModel = (isDialogOpen, name) => {
    if (!isDialogOpen) {
      this.setState({ domain_name: "", subdomain: "" ,selected_template : null});
    }
    this.setState({
      [name]: isDialogOpen,
    });
  };

  backToListing = () => {
    this.setState(
      {
        showScreen: "first",
      },
      () => this.props.history.push({ pathname: "/settings" })
    );
  };

  nextStep = (open, Fname, close, Sname, data, campaign_id) => {
    const {selected_template}=this.state
    let isValid = true;
    var re = new RegExp(
      /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
    );
    if (Sname === "isCSVModal") {
      let status = this.state.domain_name.match(re);
      if(!campaign_id){
        isValid = false;
        toast.warning("Please select campaign.");
      } else if (status === null) {
        isValid = false;
        toast.warning("Please provide a valid Domain name");
      }
    } 
    if (isValid) {
      const res = data.find((x) => x.id === parseInt(campaign_id));
      SegmentService.analyticsTrack("Domain Name Configured", {
        campaignId: parseInt(campaign_id),
        campaignName: res.campaign_name,
        domain: this.state.domain_name,
      });
      this.setState({
        [Fname]: open,
        [Sname]: close,
      });
    }
  };

  getDomainStatus = async (id) => {
    const { userDomains } = this.state;
    this.setState({ isLoading: true });
    let userDomain = userDomains.filter((domail) => domail.id == id);
    if (userDomain.length > 0) {
      this.setState({
        userDomain: userDomain[0],
        showScreen: "second",
        isLoading: false,
      });
    } else {
      this.props.history.push({
        pathname: "/settings/",
      });
      this.setState({ showScreen: "first", isLoading: false });
    }
  };

  dateFormat = (date) => {
    return moment(date).format("MMM DD, hh:mm A");
  };

  makeDefault = async (event, domain) => {
    this.setState({ isLoading: true });
    let data = {
      domain_id: domain.id,
      action: domain.is_default ? false : true,
    };
    await HTTP.post(urls.defaultDomain, data)
      .then((result) => {
        if (result.data.status) {
          if (!domain.is_default) {
            toast.success(
              Strings.VIDEOS_ACTIVE.replace("{{link}}", domain.alb_host)
            );
            this.props.history.push({
              pathname: "/settings/",
            });
          } else {
            toast.success(`Your videos are now active on ${Config.VIDEO_URL}.`);
          }
          this.getDomain();
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  submit = async () => {
    let is_valid = true;

    let { subdomain, domain_name, selected_template } = this.state;
    if (subdomain.length > 30 || domain_name.length > 30) {
      return toast.warning("Domain and subdomain length must be less than 30.");
    }
    if (!subdomain.trim()) {
      return toast.warning(Strings.VALID_SUBDOMAIN);
    } else if (!domain_name) {
      return toast.warning(Strings.VALID_DOMAIN_NAME);
    }

    if (is_valid) {
      this.setState({ isLoadingDomain: true });
      let data = {
        sub_domain: subdomain?.toLocaleLowerCase(),
        domain_name: domain_name?.toLocaleLowerCase(),
        campaign_id: selected_template,
      };
      await HTTP.post(urls.setDomain, data)
        .then((result) => {
          if (result.data.status) {
            if (result.data?.data?.id) {
              this.props.history.push({
                pathname: "/settings/" + result.data?.data?.id,
              });
            } else {
              if (result.data.severRes.status == "false") {
                this.setState({ isLoadingDomain: false });
                toast.warning(result.data.severRes.message);
              } else {
                this.getDomain();
              }
            }
          } else {
            toast.warning(result.data.message);
            this.setState({ isLoadingDomain: false });
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.setState({ isLoadingDomain: false });
        })
    }
  };

  validateDomain = async (id) => {
    SegmentService.analyticsTrack('Validate Clicked',{})
    const { isLoadingValidate } = this.state;
    if (id && !isLoadingValidate) {
      this.setState({
        isLoadingValidate: true,
        msgValidate: {
          messsage: Strings.VALIDATING_DNS,
          open: true,
          type: "info",
          background: "#0062FF",
        },
      });
      let data = {
        id: id,
      };
      await HTTP.post(urls.validateDomain, data)
        .then((result) => {
          if (result.data.status) {
            if (result.data.status && result.data.data) {
              const myArray = result.data.data.split(":");
              if (myArray.length > 0) {
                let status = myArray[myArray.length-1].replace(",", "");
                if (status == " true" || status == "true") {
                  this.albCreation(id);
                } else {
                  this.setState({
                    isLoadingValidate: false,
                    msgValidate: {
                      messsage: Strings.CHECK_CNAME.replace(
                        "{{domain}}",
                        this.state.domain_name
                      ),
                      open: true,
                      type: "warning",
                      background: "#EB5757",
                    },
                  });
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
    }
  };

  albCreation = async (id) => {
    if (id) {
      let data = {
        id: id,
      };
      await HTTP.post(urls.albCreation, data)
        .then((result) => {
          if (result.data.status) {
            if (result.data.status && result.data.data) {
              const myArray = result.data.data.split(":");
              if (myArray.length > 0) {
                let status = myArray[myArray.length-1].trim();
                if (status == "false" || status == " false") {
                  this.setState({
                    msgValidate: {
                      messsage: Strings.CHECK_CNAME.replace(
                        "{{domain}}",
                        this.state.domain_name
                      ),
                      open: true,
                      type: "warning",
                      background: "#EB5757",
                    },
                  });
                } else {
                  this.setState({
                    msgValidate: {
                      messsage: Strings.DOMAIN_CONFIGURED_SUCCESSFULLY,
                      open: true,
                      type: "success",
                      background: "#27AE60",
                    },
                  });
                  this.validateAlb(id);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          this.setState({ isLoadingValidate: false });
        });
    }
  };

  closeCollapse = () => {
    this.setState({
      msgValidate: {
        messsage: "",
        open: false,
        type: "info",
        background: "#141518",
      },
    });
  };

  validateAlb = async (id) => {
    let data = {
      id: id,
    };
    await HTTP.post(urls.albValidate, data)
      .then((result) => {
        if (result.data.status) {
          this.getDomain();
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
  };

  confirmDelete = async (val) => {
    this.setState({ isDeleteModal: true, selectedDomain: val });
    SegmentService.analyticsTrack('Domain Deleted',{domain:val.domain})

  };

  deleteDomain = async () => {
    this.setState({
      isWaitingModal: true,
      isDeleteModal: false,
    });
    this.setState({ isDomainDeleteLoader: true });
    await HTTP.delete(`${urls.domain}/${this.state.selectedDomain.id}`)
      .then((result) => {
        if (result.status == 200) {
          this.setState({
            isDomainDeleteLoader: false,
            isWaitingModal: false,
            isDeleteModal: false,
            selectedDomain: null,
          });
          this.getDomain();
          return toast.success(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({ isDomainDeleteLoader: false });
      })
      .finally(() => {
        this.setState({ isDomainDeleteLoader: false });
      });
  };

  handleChangeTemplate = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  render = () => html.apply(this);
}

export default Settings;
