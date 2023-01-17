import React, { Component } from "react";
import "./invite-user.scss";
import AdminService from "../../../service/api/admin.service";
import { HTTP } from "../../../service/core/http.service";
import { urls } from "../../../config/urlConfig";
import { html } from "./invite-user.html";
import { UserService } from "../../../service/api/user-service";
import { SegmentService } from "../../../service/api/segment.service";
class InviteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isLoading: false,
      isInviteTeam: false,
      allUsers: [],
      seats: 0,
      userDetail: {},
    };
  }

  setInvite = (invite) => {
    this.setState({ isInviteTeam: invite });
  };

  getNameInitials = (fname, lname) => {
    let name = "";
    if (fname && !lname) {
      name = fname.charAt(0);
      name += fname.charAt(1);
    } else {
      name = fname.charAt(0);
    }
    if (lname) {
      name += lname.charAt(0);
    }
    return name.toUpperCase();
  };

  componentDidMount() {
    this.userDetails();
    this.getUserDEtail();
  }

  userDetails = () => {
    this.setState({ isLoading: true });
    AdminService.userDetails()
      .then(async (response) => {
        if (response.status) {
          if (response?.data?.invitee?.survey?.id) {
            this.props.history.push("/microphone");
          }
          this.setState({ userDetail: response?.data });
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getUserDEtail = async () => {
    await HTTP.get(urls.userInvite)
      .then((result) => {
        if (result.data.status) {
          let data = result?.data?.data?.rows;
          this.setState({ allUsers: data, seats: data.length });
        }
        this.setState({ isLoadingCsv: false });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  handleOnclick = async (choice) => {
    const { userDetail }=this.state
    SegmentService.analyticsTrack("Invite User Started", {
      skipClicked: choice == "Skip" ? true : false,
      Location: "onboarding",
    });
    await this.updateUsersSteps();
    if(userDetail?.campaign?.id){
      return this.props.history.push(`/microphone/${userDetail.campaign.id}`);
    }
    this.props.history.push("/microphone");
  };

  updateUsersSteps = async () => {
    try {
      if(this.state.userDetail.steps){
        let steps = this.state.userDetail.steps
        steps.invite= true
        const result = await UserService.userSteps(steps)
        return result
      }
    } catch (e) {
      console.log("campaign not saved", e);
      return false;
    }
  };

  render = () => html.apply(this);
}

export default InviteUser;
