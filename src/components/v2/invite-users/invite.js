import React, { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import AppDialogInvite from "../../$widgets/AppDialogInvite/AppDialogInvite";
import InputDropdown from "../../$widgets/multiple-input-dropdown/input-dropdown";
import MultiValTextField from "../../$widgets/multiple-input-dropdown/multiValueTextBox";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import Alert from "@mui/material/Alert";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../../../service/core/storage.service";
import { UserService } from "../../../service/api/user-service";
import { HTTP } from "../../../service/core/http.service";
import { urls } from "../../../config/urlConfig";
import IconLabelButtons from "../../$widgets/buttons/icon-label-buttons";
import Snackbar from "../../$widgets/snackbar/Snackbar";
import { SegmentService } from "../../../service/api/segment.service";

let occupiedSeats = 0;
const Invite = (props) => {
  

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [customMessage, setMessage] = useState(
    "A team member has invited you to join their tavus workspace!"
  );
  const [userDetail, setUser] = useState();
  const [errors, setErr] = useState({});
  const [serverError, setServerError] = useState("");
  const [currValue, setCurrValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      occupiedSeats = props.seats;
    })();
  }, [props.isInviteTeam])

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode == 13 || e.keyCode == 9) {
      addEmails();
    }
  };

  const addEmails = (e) => {
    setServerError("");
    if (
      props?.seats + selectedEmails?.length <
      props?.myDetail?.billingAccount?.seat_quantity
    ) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let value = selectedEmails;
      if (currValue) {
        if (selectedEmails.length > 0) {
          for (let i = 0; i < selectedEmails.length; i++) {
            if (selectedEmails[i].email.includes(currValue)) {
              // if(currValue){
              //     return setServerError('Email already Exists.')
              // }
              return;
            }
          }
          if (currValue) {
            if (!re.test(String(currValue).toLowerCase())) {
              return setServerError("Please enter a valid email address.");
            } else {
              value.push({ email: currValue, text: currValue.split("@")[0] });
              occupiedSeats = props.seats + selectedEmails.length;
            }
          }
        } else {
          if (currValue) {
            if (!re.test(String(currValue).toLowerCase())) {
              return setServerError("Please enter a valid email address.");
            } else {
              value.push({ email: currValue, text: currValue.split("@")[0] });
              occupiedSeats = props.seats + selectedEmails.length;
            }
          }
        }
        setSelectedEmails(value);
        setCurrValue("");
      }
    } else {
      if (!currValue.trim()) {
        return;
      } else {
        return setServerError("Maximum seat quantity reached");
      }
    }
  };

  const submit = async () => {
    let isValid = false;
    setErr({});
    if (selectedEmails.length > 0 && customMessage) {
      isValid = true;
    }
    let emails = [];
    for (let i = 0; i < selectedEmails.length; i++) {
      emails.push(selectedEmails[i].email);
    }
    let data = {
      email: emails,
      custom_message: customMessage,
    };
    if (isValid && !isLoading) {
      setLoading(true);
      await HTTP.post(urls.userInvite, data)
        .then((result) => {
          if (result?.status) {
            // window.analytics.track('Invite User Completed', {
            //     usersInvited: selectedEmails,
            //     userId: props.myDetail.uuid
            // });
            //console.log(selectedEmails,'selectedEmails-')
            let emailData = []
            if(selectedEmails.length>0){
              for(let i=0; i<selectedEmails.length; i++){
                emailData.push({email: selectedEmails[i].email, text: customMessage})
              }
            }
            SegmentService.analyticsTrack("User Invited", {
              usersInvited: emailData,
              numberOfInvites: selectedEmails.length
            });
            updateUsersSteps();
            setCurrValue("");
            popupClose();
          } else {
            if (
              result &&
              result?.data?.length > 0 &&
              result?.data[0].validatorKey == "not_unique"
            ) {
              setServerError(result?.data[0].value + " already exists.");
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err, "err");
          setLoading(false);
        });
    } else {
      setLoading(false);
      const errors = {};
      if (!selectedEmails.length > 0) {
        return setServerError("Please add an email address.");
      }
      if (!customMessage) {
        return setServerError("Please enter a message.");
      }
      const newObj = { ...errors };
      newObj.errors = errors;
      setErr(newObj);
      setLoading(false);
      return _.isEmpty(errors);
    }
  };

  const updateUsersSteps = async () => {
    try {
        if(props?.myDetail?.steps){
          let steps = props?.myDetail?.steps
          steps.invite= true
          const result = await UserService.userSteps(steps)
          return result
        }
    } catch (e) {
      //setLoading(false)
      console.log("campaign not saved", e);
      return false;
    }
  };

  const popupClose = () => {
    props.setInvite(false);
    setSelectedEmails([]);
    setMessage("A team member has invited you to join their tavus workspace!");
    setErr({});
    setServerError("");
    setCurrValue("");
    props.getUserDEtail();
  };

  const handleDelete = (item, index) => {
    let arr = [...selectedEmails];
    arr.splice(index, 1);
    occupiedSeats = occupiedSeats - 1;
    setSelectedEmails(arr);
    setServerError("");
  };

  return (
    <div>
      <AppDialogInvite
        open={props.isInviteTeam}
        maxWidth={"md"}
        className="video-modal"
        customClassMain="inviteUser"
        onClose={() => popupClose()}
        modelTitle="Invite Members"
        modelSubTitle={
          "You can invite up to " +
          props?.myDetail?.billingAccount?.seat_quantity +
          " seats"
        }
        content={
          <div className="contentModal">
            <div>
              <MultiValTextField
                onBlur={addEmails}
                handleDelete={handleDelete}
                handleChange={handleChange}
                onKeyDown={handleKeyUp}
                values={
                  selectedEmails &&
                  selectedEmails.map((val) => {
                    return val.text;
                  })
                }
                placeholder={
                  selectedEmails.length > 0 ? "" : "Enter Email Addresses"
                }
                value={currValue}
                seat_quantity={props?.myDetail?.billingAccount?.seat_quantity}
                seats={occupiedSeats}
              />
              {/* {errors['email'] && <span className='error'>{errors.email}</span>} */}

              <div className="pt-3">
                <TextField
                  id="standard-multiline-static"
                  placeholder="Enter Custom Message"
                  multiline
                  value={customMessage}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={4}
                />
                {serverError && (
                  <Snackbar
                    onClose={() => setServerError("")}
                    serverError={serverError}
                  />
                )}

                {/* {errors['message'] && <span className='error'>{errors.message}</span>} */}
              </div>
              <div className="text-center pt-32 ">
                <IconLabelButtons
                  disabled={isLoading}
                  className="invitebtn"
                  onClick={submit}
                  title="Invite"
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Invite;
