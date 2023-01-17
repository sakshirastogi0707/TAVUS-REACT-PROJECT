import React, { Component } from "react";
import {
  BrowserRouter,
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AppFrame from "../app-frame/app-frame";
import AuthService from "../../service/core/auth.service";
import Login from "../v2/login/login";
import Registration from "../registration/registration";
import Dashboard from "../dashboard/dashboard";
import Forgot from "../v2/forgot/forgot";
import Users from "../admin/users/users";
import Landing from "../landing/landing";
import CsvRequest from "../csv-requests/csv";
import Settings from "../settings/settings";
import firebase from "../../components/firebase/firebase";
import BackgroundVideoSetup from "../v2/background-video-setup/background-video-setup.js";
import Analytics from "../analytics/analytics";
import Signup from "../signup/signup";
import Email from "../signup/email";
import privacyPolicy from "../signup/privacy-policy"
import Address from "../signup/address";
import Company from "../signup/company";
import Detail from "../signup/detail";
import Plan from "../signup/plan";
import Price from "../signup/pricing";
import Role from "../signup/role";
import Website from "../signup/website";
import Demo from "../signup/calendly";
import Policies from "../signup/policies";
import ThankYou from "../signup/thank-you";
import Tshirt from "../signup/tshirt";
import InviteUser from "../v2/invite-users/invite-user";
import CreateTemplate from "../v2/landing/landing";
import Script from "../v2/script/script";
import Template1 from "../v2/landing/components/template-preview/video/template1/template1";
import Template2 from "../v2/landing/components/template-preview/video/template2/template2";
import Template3 from "../v2/landing/components/template-preview/video/template3/template3";
import Template4 from "../v2/landing/components/template-preview/video/view/view";
import Microphone from "../v2/microphone/microphone";
import Voicetraining from "../v2/voiceTraining/VoiceTraining";
import VoiceTraining from "../v2/voiceTraining/VoiceTraining";
import AvatarVideoConfigPage from "../../views/AvatarVideoConfig/AvatarVideoConfigPage/AvatarVideoConfigPage";
import AvatarVideoRecording from "../../views/AvatarVideoRecording/AvatarVideoRecording";
import Congratulation from "../v2/landing/congratulation";
import TestAudio from "../v2/TestAudio/TestAudio";
import PostTraining from "../v2/post-training/post-training";
import TrainingComplete from "../v2/post-training/email-screen/email";
import SetVariable from "../v2/post-training/set-primary-variable/set-primary-variable";
import FirstVideo from "../v2/post-training/your-first-video/your-first-video";
import WaitingForTranscript from "../../views/WaitingForTranscript/WaitingForTranscript";
import V2Dashboard from '../../components/v2/dashboard/dashboard';
import SingleCampaign from '../../components/v2/dashboard/single-campaign';
import AllCampaigns from '../v2/dashboard/all-campaigns/all-campaigns';
import EditCampaigns from '../v2/dashboard/edit-campaign/edit-campaign';
import Integrations from '../integrations/integrations';
import SubstitutionAdminEditorPage from "../../views/SubstitutionAdminEditor/SubstitutionAdminEditorPage";
import IntroducingVoices from '../v2/introducing-voices/introducing-voices';
import MyVoices from '../v2/introducing-voices/my-voices/my-voices';
import campaignShare from "../v2/campaign-share/campaign-share";
import VoicesName from "../v2/introducing-voices/voices-name/voices-name";
import CampaignsList from "../v2/campaign-list/campaigns-list"
import Template from "../admin/templates/template";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      isLogin: false
    };
  }

  async componentDidMount() {
    const user = await firebase.isInitialized();
    if(user?.email){
      this.setState({ isLogin: true });
    }
    this.setState({ initialized: true });
  }


  render() {
    const { initialized,user } = this.state;
    return !initialized ? null : (
      <BrowserRouter>
        <React.Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/forgot" component={Forgot} />
            <AllUsersRoute exact path="/invite" component={InviteUser} />
            <Route exact path="/signup/company" component={Company} />
            <Route exact path="/signup/email" component={Email} />
            <Route exact path="/signup/privacy-policy" component={privacyPolicy} />
            <Route exact path="/signup/address" component={Address} />
            <Route exact path="/signup/detail" component={Detail} />
            <Route exact path="/signup/plan" component={Plan} />
            <Route exact path="/signup/price" component={Price} />
            <Route exact path="/signup/website" component={Website} />
            <Route exact path="/signup/role" component={Role} />
            <Route exact path="/signup/book-demo" component={Demo} />
            <Route exact path="/signup/policies" component={Policies} />
            <Route exact path="/signup/thank-you" component={ThankYou} />
            <Route exact path="/signup/tshirt" component={Tshirt} />

            {/* Landing Pages */}
            <AllUsersRoute exact path="/landing/:campaignId" component={CreateTemplate} />
            <AllUsersRoute exact path="/edit-campaign/landing/:campaignId" component={CreateTemplate} />
            <AllUsersRoute exact path="/microphone" component={Microphone} />
            <AllUsersRoute exact path="/microphone/:campaignId" component={Microphone} />
            <AllUsersRoute
              exact
              path="/landing/video/template1"
              component={Template1}
            />
            <AllUsersRoute 
              exact 
              path='/integrations/:campaignId' 
              component={Integrations} 
            />
            <AllUsersRoute
              exact
              path="/landing/video/template2"
              component={Template2}
            />
            <AllUsersRoute
              exact
              path="/landing/video/template3"
              component={Template3}
            />
            <AllUsersRoute exact path="/video/:id" component={Template4} />
            <AllUsersRoute exact path="/training/:campaignId" component={Voicetraining} />
            <AllUsersRoute exact path="/congratulation/:campaignId" component={Congratulation} />
            <AllUsersRoute
              exact
              path="/script-recording/:campaignId"
              component={AvatarVideoRecording}
            />
            <AllUsersRoute
              exact
              path="/setting-up-your-template/:campaignId"
              component={WaitingForTranscript}
            />

            <AllUsersRoute exact path="/template/:campaignId" component={AvatarVideoConfigPage} />
            <AllUsersRoute exact path="/edit-campaign/template/:campaignId" component={AvatarVideoConfigPage} />
            <AllUsersRoute
              exact
              path="/background-video-setup/:campaignId"
              component={BackgroundVideoSetup}
            />
            <AllUsersRoute
              exact
              path="/edit-campaign/background-video/:campaignId"
              component={BackgroundVideoSetup}
            />
            <AllUsersRoute exact path="/test-audio" component={TestAudio} />
            <AllUsersRoute exact path="/training-complete/:campaignId" component={TrainingComplete}/>
            <AllUsersRoute exact path="/set-variable/:campaignId" component={SetVariable}/>
            <AllUsersRoute exact path="/first-video/:campaignId" component={FirstVideo}/>
            <AllUsersRoute exact path="/create-video/:campaignId" component={FirstVideo}/>
            <AllUsersRoute exact path="/edit-video/:requestId/:campaignId" component={FirstVideo}/>
            <AllUsersRoute exact path="/first-video/:requestId"component={FirstVideo} />
            <AllUsersRoute exact path="/script/:campaignId" component={Script} />
            <AllUsersRoute exact path="/script" component={Script} />
            <AllUsersRoute exact path="/introducing-voices/:campaignId" component={IntroducingVoices} />
            <AllUsersRoute exact path="/my-voices/:campaignId" component={MyVoices} />
            <AllUsersRoute exact path="/voices-name/:campaignId" component={VoicesName} />
            <AllUsersRoute exact path="/campaign/script/" component={Script} />
            <AllUsersRoute exact path="/campaign/script/:campaignId" component={Script} />
            {/* Create Campaign Routes */}

            {/* With Frame */}
            <AppFrame>
              <Switch>
              <AdminUserRoute exact path="/campaigns-list" component={CampaignsList} />
                <CommonRoute exact path="/campaigns/:campaignId" component={SingleCampaign} />
                <AdminUserRoute  user={user} exact path="/dashboard" component={Dashboard} />
                <AdminUserRoute exact path="/dashboard/campaign/:campaignId" component={Dashboard} />
                <CommonRoute exact path="/V2Dashboard" component={V2Dashboard} />
                <CommonRoute
                  exact
                  path="/dashboard/:requestId"
                  component={Dashboard}
                />
                <PrivateRoute exact path="/settings" component={Settings} />
                <AllUsersRoute exact path="/settings/:id" component={Settings} />
                <PrivateRoute
                  exact
                  path="/csv-request"
                  component={CsvRequest}
                />
                <Route exact path="/analytics" component={Analytics} />
                <PrivateRoute
                  exact
                  path="/analytics/:id"
                  component={Analytics}
                />
                <AdminUserRoute exact path="/campaigns/share" component={campaignShare} />

                <AdminRoute exact path="/users" component={Users} />
                <AdminUserRoute exact path="/templates" component={Template} />
                <AdminRoute exact path="/substitutionEditor/:campaignId" component={SubstitutionAdminEditorPage} />
                <Route exact path="*">
                  <Redirect  to={`/signup/email`} />
                </Route>
              </Switch>
            </AppFrame>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isAdminLoggedIn() ? (
        <>
        <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const AllUsersRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // AuthService.isValidUser() ? (
      AuthService.isUserLogin()?(
        <>
        <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    
    render={(props) =>
      AuthService.isAdminLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const CommonRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const AdminUserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isUserLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);
