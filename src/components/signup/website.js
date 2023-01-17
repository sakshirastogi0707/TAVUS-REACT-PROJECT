import React, { useEffect, useState, useCallback } from "react";
import Inputs from "../$widgets/input-fields/input-field";
import { AppImage } from "../$widgets/images/app-image";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import AdminService from "../../service/api/admin.service";
import Loader from "../$widgets/loader/loader";
import Utils from "../../service/core/utils";
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import { StorageService } from "../../service/core/storage.service";
import { SegmentService } from "../../service/api/segment.service";
const ariaLabel = { "aria-label": "description" };

const Website = (props) => {
  useEffect(() => {
    userDetails();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState(false);
  const [disableWebsite, setDisable] = useState(false);
  const [userData, setUserData] = useState({});

  async function userDetails() {
      AdminService.userDetails()
        .then(async (response) => {
          if (!response || !response.step) {
            props.history.push("/signup/email");
          }
          if (response.step < 4) {
            Utils.signupUrls(response.step, props);
          }
          if (response?.data?.invitee?.survey?.website) {
            setWebsite(response?.data.invitee.survey.website);
            setDisable(true);
          } else if (response?.data?.survey?.website) {
            setWebsite(response?.data?.survey?.website);
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
    if (
      website &&
      website
        .toLocaleLowerCase()
        .match(
          /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/g
        ) == null
    ) {
      setErrors(true);
      isValid = false;
    }

    if (isValid) {
      setErrors(false);
      let params = {
        website: website,
        step: "step4",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            props.history.push("/signup/role");
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
      updateUser();
    }
  };

  return (
    <div className={"signup-main"}>
      <div className={" container "}>
        <div className={"align-self-center w-100"}>
          {/* {isLoading ? <Loader /> : */}

          <>
            <Header
              userData={userData}
              title="What’s your company website?"
              subtitle="This lets us personalize your experience"
            />
            <div className="box box-website mobile-box boxDev d-flex flex-column align-items-center justify-content-center">
              <div className="DevBox">
                <div className="DevBoxSec w7">
                  <Inputs
                    disabled={disableWebsite}
                    onKeyDown={handleEnter}
                    autoFocus={true}
                    className="customInput"
                    variant="outlined"
                    placeholder="Website URL"
                    name="website"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    autocomplete="false"
                    inputProps={ariaLabel}
                  />
                  {errors && (
                    <span className="error">Please enter a valid website.</span>
                  )}
                </div>
              </div>
            </div>
           
            <AppFooter
              onClick={updateUser}
              userData={userData}
              onBack={() => props.history.push("/signup/company")}
              isBack={userData?.uuid && true}
              title={website ? "Continue" : "Skip"}
              isLoading={isLoading}
              progress={40}
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

export default Website;
