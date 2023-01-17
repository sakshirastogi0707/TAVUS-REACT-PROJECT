import React, { useEffect, useState, useCallback } from "react";
import SingleDropdown from "../$widgets/dropdown/singledropdown";
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
import { ButtonOutlined } from "../$widgets/buttons/button-outlined";
import { StorageService } from "../../service/core/storage.service";
import { SegmentService } from "../../service/api/segment.service";
const Role = (props) => {
  useEffect(() => {
    userDetails();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [selectedRole, setRole] = useState("");
  const [errors, setErrors] = useState(false);
  const [userData, setUserData] = useState({});

  async function userDetails() {
      await AdminService.userDetails()
        .then(async (response) => {
          if (!response || !response.step) {
            props.history.push("/signup/email");
          }
          if (response.step < 5) {
            Utils.signupUrls(response.step, props);
          }
          if (response?.data?.survey?.role) {
            setRole(response?.data?.survey?.role);
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
    if (!selectedRole.trim()) {
      setErrors(true);
      isValid = false;
    }

    if (isValid) {
      setErrors(false);
      let params = {
        role: selectedRole,
        step: "step5",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            if (response?.data?.id) {
              await SegmentService.analyticsTrack("Role Selected", {
                userRole: selectedRole,
              });
            }
            props.history.push("/signup/plan");
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

  async function selectRole(role) {
    let currentRole = selectedRole;
    if (currentRole == role) {
      setRole("");
    } else {
      setRole(role);
    }
  }

  function handleEnter(event) {
    if (
      event.key.toLowerCase() === "enter" &&
      (event.preventDefault() || selectedRole)
    ) {
      updateUser();
    }
  }

  return (
    <div className={"signup-main"}>
      <div className={" container"}>
        <div className={"align-self-center w-100"}>
          <form>
            <Header
              userData={userData}
              title="What is your role?"
              subtitle="This lets us personalize your experience"
            />
            <div className="box box-role DevRole d-flex flex-column align-items-center justify-content-center">
              <div className="DevBox">
                <div className="DevBoxSec">
                  <div className="wrong-video">
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("Director / C-Level / VP")}
                        className={
                          selectedRole == "Director / C-Level / VP"
                            ? "Btn selected"
                            : "Btn"
                        }
                      >
                        Director / C-Level / VP
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("Product Manager")}
                        className={
                          selectedRole == "Product Manager"
                            ? "Btn selected"
                            : "Btn"
                        }
                      >
                        Product Manager
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("SDR")}
                        className={
                          selectedRole == "SDR" ? "Btn selected" : "Btn"
                        }
                      >
                        SDR
                      </ButtonOutlined>
                    </div>
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("Account Executive")}
                        className={
                          selectedRole == "Account Executive"
                            ? "Btn selected"
                            : "Btn"
                        }
                      >
                        Account Executive
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("Marketer")}
                        className={
                          selectedRole == "Marketer" ? "Btn selected" : "Btn"
                        }
                      >
                        Marketer
                      </ButtonOutlined>
                    </div>
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectRole("Other")}
                        className={
                          selectedRole == "Other" ? "Btn selected" : "Btn"
                        }
                      >
                        Other
                      </ButtonOutlined>
                    </div>
                    {errors && (
                      <span className="error">Please select your role.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <AppFooter
              onClick={updateUser}
              userData={userData}
              className={!selectedRole && "disabled-btn"}
              disabled={!selectedRole || isLoading ? true : false}
              onBack={() => props.history.push("/signup/website")}
              isBack={true}
              title={"Continue"}
              isLoading={isLoading}
              progress={55}
              invite={true}
              step={"registration"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Role;
