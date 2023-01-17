import React, { useEffect, useState, useCallback } from "react";
import Input from "@mui/material/Input";
import { AppImage } from "../$widgets/images/app-image";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import AdminService from "../../service/api/admin.service";
import Loader from "../$widgets/loader/loader";
import Header from "../app-frame/app-header/app-header";
import AppFooter from "../app-frame/app-footer/app-footer";
import Utils from "../../service/core/utils";
import { StorageService } from "../../service/core/storage.service";
import { ButtonOutlined } from "../$widgets/buttons/button-outlined";
import { SegmentService } from "../../service/api/segment.service";
const ariaLabel = { "aria-label": "description" };

const Plan = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [selecedPlan, setPlan] = useState([]);
  const [errors, setErrors] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {}, [selecedPlan]);

  async function userDetails() {
      AdminService.userDetails()
        .then(async (response) => {
          if (!response || !response.step) {
            props.history.push("/signup/email");
          }
          if (response.step < 6) {
            Utils.signupUrls(response.step, props);
          }
          if (response?.data.survey.plan) {
            const myArray = response?.data.survey.plan.split(",");
            setPlan(myArray);
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

  async function addPlans(choice) {
    let selectedPlan = selecedPlan;
    if (choice) {
      if (selecedPlan.includes(choice)) {
        var myIndex = selectedPlan.indexOf(choice);
        if (myIndex !== -1) {
          selectedPlan.splice(myIndex, 1);
        }
      } else {
        selectedPlan.push(choice);
      }
    }
    var newArray = [];
    for (let obj of selectedPlan) {
      newArray.push(obj);
    }
    setPlan(newArray);
  }

  async function updateUser() {
    let isValid = true;
    if (!selecedPlan.length > 0) {
      setErrors(true);
      isValid = false;
    }
    if (isValid) {
      setErrors(false);
      let params = {
        plan: selecedPlan.toString(),
        step: "step6",
      };
      setLoading(true);
      AdminService.survey(params)
        .then(async (response) => {
          if (response.status) {
            props.history.push("/signup/tshirt");
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

  function handleEnter(event) {
    if (
      event.key.toLowerCase() === "enter" &&
      (event.preventDefault() || selecedPlan.length > 0)
    ) {
      updateUser();
    }
  }

  return (
    <div className={"signup-main"}>
      <div className={"container"}>
        <div className={"align-self-center w-100"}>
          {/* {isLoading ? <Loader /> : */}
          <form>
            <Header
              userData={userData}
              title="How do you plan to use Tavus?"
              subtitle="This lets us personalize your experience"
            />
            <div className="box box-plan DevRole d-flex flex-column align-items-center justify-content-center ">
              <div className="DevBox">
                <div className="DevBoxSec">
                  {/* <Input placeholder="How do you plan to use Tavus?" name="detail" value={plan} onChange={(event)=>setPlan(event.target.value)} autocomplete="false" inputProps={ariaLabel} />
                   */}
                  <div className="wrong-video">
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => addPlans("Sales outreach")}
                        className={
                          selecedPlan.includes("Sales outreach")
                            ? "Btn selected"
                            : "Btn "
                        }
                      >
                        Sales Outreach
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => addPlans("Neutering drip campaigns")}
                        className={
                          selecedPlan.includes("Neutering drip campaigns")
                            ? "Btn selected"
                            : "Btn "
                        }
                      >
                        {" "}
                        Nurturing Drip Campaigns{" "}
                      </ButtonOutlined>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => addPlans("Product education")}
                        className={
                          selecedPlan.includes("Product education")
                            ? "Btn selected"
                            : "Btn "
                        }
                      >
                        Product Education
                      </ButtonOutlined>
                    </div>
                    <div>
                      <ButtonOutlined
                        onKeyDown={handleEnter}
                        onClick={() => addPlans("Other")}
                        className={
                          selecedPlan.includes("Other")
                            ? "Btn selected"
                            : "Btn "
                        }
                      >
                        Other
                      </ButtonOutlined>
                    </div>
                    {errors && (
                      <span className="error">
                        Please select atleast one option.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* <Footer /> */}
            </div>
            {/* <div className="signup-footer">
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={80} />
                    </Box> */}
            {/* <div className="d-flex justify-content-between">
                        <div className="bottomBack align-self">
                            <div className="back-box">
                                <ArrowBackIcon onClick={()=>props.history.push('/signup/role')}/>
                            </div>
                        </div>
                        <Button autoFocus={true}  onKeyDown={handleEnter} className={!selecedPlan.length>0 && 'disabled-btn'}  disabled={!selecedPlan || isLoading ? true : false}  onClick={updateUser}  variant="contained" endIcon={<AppImage name={'arrow-left.svg'} width={'20'} />}>
                        {isLoading ? <span className='loader-btn'><CircularProgress />Loading...</span>  : 'Continue'}
                        </Button>
                    </div> */}
            {/* </div> */}
            <AppFooter
              onClick={updateUser}
              userData={userData}
              className={!selecedPlan.length > 0 && "disabled-btn"}
              disabled={!selecedPlan.length > 0 || isLoading ? true : false}
              onBack={() => props.history.push("/signup/role")}
              isBack={true}
              title={"Continue"}
              isLoading={isLoading}
              progress={70}
              invite={true}
              step={"registration"}
            />
          </form>

          {/* } */}
        </div>
      </div>
    </div>
  );
};

export default Plan;
