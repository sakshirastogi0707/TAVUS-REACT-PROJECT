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
const Tshirt = (props) => {
  useEffect(() => {
    userDetails();
  }, []);

  const [isLoading, setLoading] = useState(false);
  const [selectedTshirt, setTshirt] = useState("");
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
        if (response?.data?.survey?.tshirt_size) {
          setTshirt(response?.data?.survey?.tshirt_size);
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
    if (!selectedTshirt.trim()) {
      setErrors(true);
      isValid = false;
    }

    if (isValid) {
      setErrors(false);
      let params = {
        tshirt_size: selectedTshirt,
        step: "step7",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            if (response?.data?.id) {
              console.log(response.data.uuid,"response.data.uuid")
              await SegmentService.analyticsTrack("Shirt Size Selected", {
                teeShirtSize: selectedTshirt,
                userId:response.data.uuid
              });
            }
            props.history.push("/signup/address");
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

  async function selectTshirt(size) {
    let currentSize = selectedTshirt;
    if (currentSize == size) {
      setTshirt("");
    } else {
      setTshirt(size);
    }
  }

  function handleEnter(event) {
    if (
      event.key.toLowerCase() === "enter" &&
      (event.preventDefault() || selectedTshirt)
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
              title="What is your T-shirt size?"
              subtitle="We want to send you a welcome kit!"
            />
            <div className="box box-role DevRole d-flex flex-column align-items-center justify-content-center">
              <div className="DevBox">
                <div className="DevBoxSec">
                  <div className="wrong-video">
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectTshirt("Small")}
                        className={
                          selectedTshirt == "Small" ? "Btn selected" : "Btn"
                        }
                      >
                        Small
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectTshirt("Medium")}
                        className={
                          selectedTshirt == "Medium" ? "Btn selected" : "Btn"
                        }
                      >
                        Medium
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectTshirt("Large")}
                        className={
                          selectedTshirt == "Large" ? "Btn selected" : "Btn"
                        }
                      >
                        Large
                      </ButtonOutlined>
                    </div>
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => selectTshirt("Extra Large")}
                        className={
                          selectedTshirt == "Extra Large"
                            ? "Btn selected"
                            : "Btn"
                        }
                      >
                        Extra Large
                      </ButtonOutlined>
                    </div>
                    {errors && (
                      <span className="error">Please select your size.</span>
                    )}
                  </div>
                </div>
              </div>
              {/* <Footer /> */}
            </div>
            <AppFooter
              userData={userData}
              onClick={updateUser}
              className={!selectedTshirt && "disabled-btn"}
              disabled={!selectedTshirt || isLoading ? true : false}
              onBack={() => props.history.push("/signup/plan")}
              isBack={userData?.uuid && true}
              title={"Continue"}
              isLoading={isLoading}
              progress={75}
              invite={true}
              step={"registration"}
            />
            {/* <div className="signup-footer">
                <Box sx={{ width: '100%' }}>
                    <LinearProgress  onKeyDown={handleEnter} variant="determinate" value={70} />
                </Box>
                    <div className="d-flex justify-content-between">
                        <div className="bottomBack align-self">
                            <div className="back-box">
                                <ArrowBackIcon  onClick={()=>props.history.push('/signup/website')}/>
                            </div>
                        </div>
                        <Button autoFocus={true}  onKeyDown={handleEnter}    className={!selectedTshirt && 'disabled-btn'}  disabled={(!selectedTshirt ||isLoading) ? true : false}  onClick={updateUser} variant="contained" endIcon={<AppImage name={'arrow-left.svg'} width={'20'} />}>
                        {isLoading ? <span className='loader-btn'><CircularProgress />Loading...</span>  : 'Continue'}
                        </Button>
                    </div>
                </div> */}
          </form>
          {/* } */}
        </div>
      </div>
    </div>
  );
};

export default Tshirt;
