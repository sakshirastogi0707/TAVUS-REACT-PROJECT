import React, { useEffect, useState, useCallback } from "react";
import Inputs from "../$widgets/input-fields/input-field";
import { AppImage } from "../$widgets/images/app-image";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import AdminService from "../../service/api/admin.service";
import Loader from "../$widgets/loader/loader";
import Box from "@mui/material/Box";
import _ from "lodash";
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import { StorageService } from "../../service/core/storage.service";
import { HTTP } from "../../service/core/http.service";
import { urls } from "../../config/urlConfig";
import CustomizedCheckbox from "../$widgets/checkbox/customized-checkbox";
import Checkbox from "@mui/material/Checkbox";
import { SegmentService } from "../../service/api/segment.service";

const ariaLabel = { "aria-label": "description" };

const Detail = (props) => {

  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [formstate, setFromState] = useState({
    first_name: "",
    last_name: "",
    marketing_communication: true,
    errors: {},
  });

  useEffect(() => {
    userDetails();
  }, []);
  
  async function userDetails() {
    const newObj = { ...formstate };
      await AdminService.userDetails()
        .then(async (response) => {
          if (!response || !response.step) {
            props.history.push("/signup/email");
          }
          if (response?.data) {
            newObj["first_name"] = response?.data.first_name;
            newObj["last_name"] = response?.data.last_name;
            newObj["marketing_communication"] = true;
            setFromState(newObj);
            setUserData(response?.data)
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
  }

  function handleChange(event) {
    const { name, value, checked } = event.target;
    const newObj = { ...formstate };
    if (name == "marketing_communication") {
      newObj[name] = checked;
    } else {
      newObj[name] = value;
    }
    setFromState(newObj);
  }

  function handleClick() {
    const newObj = { ...formstate };
    newObj["marketing_communication"] = !newObj.marketing_communication;
    setFromState(newObj);
  }

  function validateForm() {
    const { first_name, last_name, marketing_communication } = formstate;
    const errors = {};
    if (!marketing_communication) {
      errors.marketing_communication = "You need to accept terms & condition.";
    }
    if (/[^a-zA-Z0-9 \-\/]/.test(first_name)) {
      errors.first_name = "Please enter valid first name.";
    }
    if (/[^a-zA-Z0-9 \-\/]/.test(last_name)) {
      errors.last_name = "Please enter valid last name.";
    }
    if (!first_name?.trim()) {
      errors.first_name = "Please enter first name.";
    }
    if (!last_name?.trim()) {
      errors.last_name = "Please enter last name.";
    }

    const newObj = { ...formstate };
    newObj.errors = errors;
    setFromState(newObj);
    return _.isEmpty(errors);
  }

  async function updateUser() {
    const isValid = validateForm();
    if (isValid) {
      let params = {
        first_name: formstate.first_name,
        last_name: formstate.last_name,
        step: "step2",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            props.history.push("/signup/company");
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
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index == 1 || index == 2) {
        updateUser();
      } else if (index == 0) {
        form.elements[index + 1].focus();
      }
      event.preventDefault();
    }
  };

  const { first_name, last_name, errors, marketing_communication } = formstate;

  return (
    <div className={"signup-main"}>
      <div className={"container"}>
        <div className={"align-self-center w-100"}>
          {isLoading ? <Loader /> :
          <>
          <Header userData={userData} title="What’s your name?" subtitle="Let’s get to know you" />
          <div className="box box-details mobile-box boxDev d-flex flex-column align-items-center justify-content-center ">
            <div className="DevBox m-auto w7 ">
              <form>
                <div className="DevBoxSec">
                  <Inputs
                    onKeyDown={handleEnter}
                    autoFocus={true}
                    variant="outlined"
                    placeholder="First Name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => handleChange(e)}
                    autocomplete="false"
                    inputProps={ariaLabel}
                    className="mb-md-4 pb-md-4"
                  />
                  {errors["first_name"] && (
                    <span className="error">{errors.first_name}</span>
                  )}
                  <Inputs
                    onKeyDown={handleEnter}
                    className="pt-2 mb-md-4 pb-md-4"
                    variant="outlined"
                    placeholder="Last Name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => handleChange(e)}
                    autocomplete="false"
                    inputProps={ariaLabel}
                  />
                  {errors["last_name"] && (
                    <span className="error">{errors.last_name}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
          </>
          }
          <AppFooter
            userData={userData}
            onClick={updateUser}
            className={
              (!first_name || !last_name) &&
              "disabled-btn"
            }
            disabled={
              !first_name || !last_name || isLoading
                ? true
                : false
            }
            title={"Continue"}
            isLoading={isLoading}
            progress={20}
            invite={true}
            step={"registration"}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
