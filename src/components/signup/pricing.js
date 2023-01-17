import React, { useEffect, useState, useCallback } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@mui/material/Button";
import { ButtonLightBlue } from "../$widgets/buttons/button-lightblue";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminService from "../../service/api/admin.service";
import Box from "@mui/material/Box";
import Loader from "../$widgets/loader/loader";
import Utils from "../../service/core/utils";
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import { Grid } from "@material-ui/core";
import { AppImage } from "../$widgets/images/app-image";
import { StorageService } from "../../service/core/storage.service";
import {SegmentService} from '../../service/api/segment.service'

const Price = (props) => {
  useEffect(() => {
    userDetails();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [screen, setScreen] = useState("monthly");
  const [errors, setErrors] = useState(false);
  const [userData, setUserData] = useState({});

  async function userDetails() {
    AdminService.userDetails()
      .then(async (response) => {
        if ((!response || !response.step) && !response?.data?.billingAccount) {
          props.history.push("/signup/email");
        }
        if (response?.step < 8) {
          Utils.signupUrls(response.step, props);
        }
        if (response?.data?.billingAccount?.subscription_type) {
          setScreen(response?.data?.billingAccount?.subscription_type);
        }
        setUserData(response?.data)
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updateUser(choice) {
    let isValid = true;
    if (!screen) {
      setErrors(true);
      isValid = false; 
    }

    if (isValid) {
      setErrors(false);
      let params = {
        subscription_type: choice,
        step: "step9",
      };
      if(choice == "Enterprise"){
        SegmentService.analyticsTrack('Enterprise',{})
      }
      else if(choice == "Book a Demo"){
        SegmentService.analyticsTrack('Demo Booked',{})

      }
      //if user click on on demand user active automatic
      if (choice == "On Demand") {
        params["launch"] = true;
        SegmentService.analyticsTrack('Launch Clicked',{})

      }
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            if (choice == "On Demand") {
              props.history.push("/signup/thank-you");
            } else {
              props.history.push("/signup/book-demo");
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className={"signup-main"}>
      <div className={" container "}>
        <div className={"align-self-center w-100 pricingDev-sec"}>
          {/* {isLoading ? <Loader /> : */}
          <>
            <Header title="Select your plan" userData={userData} />
            <div className="box Box_pricing d-flex flex-column align-items-center justify-content-center ">
              <div className="DevBox">
                <div className="DevBox_pricing">
                  <Grid container spacing={2} className="boxpadd">
                    <Grid item className="DevBox_pricing_left">
                      <div className="boxBg listBox">
                        <h4 className="">On Demand</h4>
                        <p>Simple, pay as you go pricing</p>
                        <div className="pricing_list">
                          <ul>
                            <li>
                              <AppImage name={"analytics.svg"} />
                              Powerful Video Analytics
                            </li>
                            <li>
                              <AppImage name={"dynamic-icon.svg"} />
                              Dynamic Background Videos
                            </li>
                            <li>
                              <AppImage name={"videos.svg"} />
                              Unlimited Personalized Videos
                            </li>
                            <li>
                              <AppImage name={"integrations.svg"} />
                              Advanced Integrations
                            </li>
                            <li>
                              <AppImage name={"smile.svg"} />
                              AI Voice & Face Cloning
                            </li>
                            <li>
                              <AppImage name={"documentation.svg"} />
                              API Documentation
                            </li>
                            <li>
                              <AppImage name={"custom-video.svg"} />
                              Custom Video Landing Pages
                            </li>
                            <li>
                              <AppImage name={"custom-star.svg"} />
                              Custom Domain Support
                            </li>
                          </ul>
                        </div>
                        <div className="d-md-flex justify-content-md-between">
                          <div className="bottomBack align-self">
                            <h4>
                              $89/
                              <span className="contVideo">
                                month + $1.479 per video
                              </span>{" "}
                              <span> billed monthly</span>
                            </h4>
                          </div>
                          <Button
                            className="btnDemo"
                            onClick={() => updateUser("On Demand")}
                          >
                            {" "}
                            Launch 🚀
                          </Button>
                        </div>
                      </div>
                    </Grid>
                    <Grid item className="DevBox_pricing_right">
                      <div className={"boxBg listBoxOne mb-3"}>
                        <h4 className="text-center">Enterprise</h4>
                        <div className="d-flex flex-column align-items-center justify-content-center ">
                          <ul className="enterprise">
                            <li>
                              {" "}
                              <AppImage name={"check-gray.svg"} /> Custom
                              pricing
                            </li>
                            <li>
                              {" "}
                              <AppImage name={"check-gray.svg"} /> Volume
                              discounts
                            </li>
                            <li>
                              {" "}
                              <AppImage name={"check-gray.svg"} /> Enterprise
                              features
                            </li>
                          </ul>
                        </div>
                        <Button
                          className="btn-white"
                          onClick={() => updateUser("Enterprise")}
                        >
                          Talk to us
                        </Button>
                      </div>
                      <div className={"boxBg Devoffer text-center"}>
                        <h4 className="mb-3">
                          Want to see what Tavus has to offer?
                        </h4>
                        <Button
                          className="btn-black"
                          onClick={() => updateUser("Book a Demo")}
                        >
                          Book a demo
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <AppFooter
              onClick={updateUser}
              userData={userData}
              disabled={false}
              onBack={() => props.history.push("/signup/address")}
              isBack={true}
              title={"Continue"}
              progress={95}
              invite={true}
              step={"registration"}
            />
          </>
        </div>
      </div>
    </div>
  );
};

export default Price;
