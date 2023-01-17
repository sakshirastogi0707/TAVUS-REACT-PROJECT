import React, { useEffect, useState, useCallback } from "react";
import Inputs from "../$widgets/input-fields/input-field";
import { AppImage } from "../$widgets/images/app-image";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import AdminService from "../../service/api/admin.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import _ from "lodash";
import Loader from "../$widgets/loader/loader";
import Utils from "../../service/core/utils";
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import { StorageService } from "../../service/core/storage.service";
import { SegmentService } from "../../service/api/segment.service";

const ariaLabel = { "aria-label": "description" };

const Company = (props) => {
  useEffect(() => {
    userDetails();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState(false);
  const [lenghtErrors, setLengthErrors] = useState(false);
  const [disableCompany, setDisable] = useState(false);
  const [userData, setUserData] = useState({});

  async function userDetails() {
      AdminService.userDetails()
        .then(async (response) => {
          if (!response || !response.step) {
            props.history.push("/signup/email");
          }
          if (response.step < 3) {
            Utils.signupUrls(response.step, props);
          }

          if (response?.data?.invitee?.survey?.company_name) {
            setCompany(response?.data.invitee.survey.company_name);
            setDisable(true);
          } else if (response?.data) {
            if (response?.data.survey.company_name) {
              setCompany(response?.data.survey.company_name);
            }
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

  async function updateUser() {
    let isValid = true;
    if (!company.trim()) {
      setErrors(true);
      setLengthErrors(false);
      isValid = false;
    }
    if (company.trim().length > 100) {
      setLengthErrors(true);
      setErrors(false);
      isValid = false;
    }
    if (!company.trim()) {
      isValid = false;
    }
    if (isValid) {
      setErrors(false);
      let params = {
        company_name: company,
        step: "step3",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            props.history.push("/signup/website");
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

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      if (company) {
        updateUser();
      }
    }
  };

  return (
    <div className={"signup-main"}>
      <div className={"container"}>
        <div className={"align-self-center w-100"}>
          <>
            <Header
              userData={userData}
              title="What’s your company name?"
              subtitle="This lets us personalize your experience"
            />

            <div className="box box-company mobile-box boxDev d-flex flex-column align-items-center justify-content-center">
              <div className="DevBox m-auto w7">
                <div className="DevBoxSec">
                  <Inputs
                    disabled={disableCompany}
                    onKeyDown={handleEnter}
                    autoFocus={true}
                    className={disableCompany ? "btnDisable" : "customInput"}
                    variant="outlined"
                    placeholder="Company Name"
                    name="company"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    autocomplete="false"
                    inputProps={ariaLabel}
                  />
                  {errors && (
                    <span className="error">Please enter company name .</span>
                  )}
                  {lenghtErrors && (
                    <span className="error">
                      Company name must be less than 100 characters.
                    </span>
                  )}
                </div>
              </div>

            </div>

            <AppFooter
              userData={userData}
              onClick={updateUser}
              className={!company && "disabled-btn"}
              disabled={!company || isLoading ? true : false}
              onBack={() => props.history.push("/signup/detail")}
              isBack={true}
              title={"Continue"}
              isLoading={isLoading}
              progress={30}
              invite={true}
              step={"registration"}
            />
          </>
          {/* } */}
        </div>
      </div>
    </div>
  );
};

export default Company;
