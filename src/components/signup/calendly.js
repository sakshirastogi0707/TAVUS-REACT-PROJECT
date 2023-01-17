import React, { useEffect, useState, useCallback } from "react";
import { InlineWidget } from "react-calendly";
import AdminService from "../../service/api/admin.service";
import Utils from "../../service/core/utils";
import Box from "@mui/material/Box";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../../service/core/storage.service";
import { UserService } from "../../service/api/user-service";
import { SegmentService } from "../../service/api/segment.service";
import {Config} from "../../config/config";

let subDetail = {};

const Price = (props) => {
  useEffect(() => {
    userDetails();
    window.addEventListener("message", function (e) {
      if (isCalendlyEvent(e)) {
        if (e.data.event == "calendly.event_scheduled") {
          updateUser();
        }
      }
    });
  }, []);

  async function userDetails() {
    let reshedule = StorageService.getPerm("reshedule");
    if (!reshedule) {
      await AdminService.userDetails()
        .then(async (response) => {
          if ((!response || !response.step) && !response?.data?.billingAccount) {
            props.history.push("/signup/email");
          }
          if (response?.data?.billingAccount) {
            subDetail = response?.data?.billingAccount;
          }
          if (response.step < 9) {
            Utils.signupUrls(response.step, props);
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

  async function updateUser() {
    let params = {
      is_demo_booked: true,
      step: "step10",
    };
    setLoading(true);
    await AdminService.survey(params)
      .then(async (response) => {
          if (
            response?.data?.id &&
            subDetail?.subscription_type &&
            subDetail?.seat_quantity
          ) {
            await SegmentService.analyticsTrack("Demo Booked", {
              paymentPlan: subDetail?.subscription_type,
              Seats: subDetail?.seat_quantity,
            });
          }
          props.history.push("/signup/thank-you");
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
        StorageService.deletePerm("reshedule");
      });
  }

  function isCalendlyEvent(e) {
    return e.data.event && e.data.event.indexOf("calendly") === 0;
  }

  const [isLoading, setLoading] = useState(false);
  const [screen, setScreen] = useState(1);
  const [formstate, setFromState] = useState({
    first_name: "",
    last_name: "",
  });

  return (
    <div className={"signup-main"}>
      <div className="box">
        <div className="DevBox">
          <div className="DevBoxSec">
            <InlineWidget url={Config.CALENDLY} />
         </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
