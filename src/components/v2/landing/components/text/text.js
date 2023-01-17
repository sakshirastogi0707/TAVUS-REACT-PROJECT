import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash";
import Accordian from "../../../../$widgets/accordion/accordion";
import Inputs from "../../../../$widgets/input-fields/input-field";
import TextArea from "../../../../$widgets/input-fields/text-area";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../../../../../service/core/storage.service";
import { UserService } from "../../../../../service/api/user-service";
import Action from "../../../../../redux/action";
import { AppImage } from "../../../../$widgets/images/app-image";
import "./text.scss";
import TaggedInput from "../input-with-tags/input-with-tags";
import { SegmentService } from "../../../../../service/api/segment.service";

const ariaLabel = { "aria-label": "description" };

function SelectText(props) {
  const [isLoading, setLoading] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(false);
  const landingState = useSelector((s) => s.landingState);
  const [variValue, setVariValue] = useState("");
  const [formstate, setFromState] = useState({
    heading1: "",
    heading2: "",
    body: "",
    heading1_visibility: true,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setFromState({
      heading1: landingState.heading1,
      heading2: landingState.heading2,
      body: landingState.body,
      heading1_visibility: heading1_visibility,
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    const newObj = { ...formstate };
    newObj[name] = value;
    dispatch({
      type: Action.UpdateLandingState,
      payload: {
        [name]: value,
      },
      origin: "text.handleChange",
    });
    setFromState(newObj);
  }
  //------getting variable count-------
  var varr = [];
  let variableCount = "";
  let arr = variValue.split("@");
  arr.map((i) => {
    let variable = i.split("|");
    varr.push(variable[0]);
  });
  variableCount = varr.length - 1;
  //------getting variable count-------
  function handleChange2(name, value) {
    setVariValue(value);
    const newObj = { ...formstate };
    newObj[name] = value;
    dispatch({
      type: Action.UpdateLandingState,
      payload: {
        [name]: value,
      },
      origin: "text.handleChange2",
    });
    setFromState(newObj);
  }

  function showPwd() {
    let value = true;
    if (landingState.heading1_visibility == true) {
      value = false;
    }
    dispatch({
      type: Action.UpdateLandingState,
      payload: {
        heading1_visibility: value,
      },
      origin: "visibility.handleChange",
    });
  }

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const { heading1, heading2, body, heading1_visibility } = formstate;

  return (
    <div className="textAccording">
      <div className="titleBox">
        <h3 className="title">Text</h3>
        <h5 className="subtitle">Create engaging copy for your visitors</h5>
      </div>
      <div className="text_box">
        <div>
          <Accordian
            text="Title"
            expanded={expandedPanel === "heading1"}
            onChange={handleAccordionChange("heading1")}
            value={
              <>
                <TaggedInput
                  campaignId={props.campaignId}
                  placeholder={
                    landingState?.heading1_placeholder
                      ? landingState?.heading1_placeholder
                      : "Hi @first_name"
                  }
                  onChange={handleChange2}
                  name="heading1"
                  value={heading1}
                  onBlur={() =>
                    SegmentService.analyticsTrack("Text configured-title", {
                      VariablesUsed: variableCount,
                    })
                  }
                />

                <span
                  className={
                    landingState.heading1_visibility == false
                      ? "show-password"
                      : "show-password1"
                  }
                  onClick={() => showPwd()}
                >
                  {landingState.heading1_visibility == false ? (
                    <AppImage name={"eye-crossed.svg"} width="22" />
                  ) : (
                    <AppImage name={"eye.svg"} width="22" />
                  )}
                </span>
              </>
            }
          />
        </div>

        {landingState.template_id != 4 && (
          <div>
            <Accordian
              text="Subheading"
              expanded={expandedPanel === "heading2"}
              onChange={handleAccordionChange("heading2")}
              value={
                <TaggedInput
                  campaignId={props.campaignId}
                  placeholder={
                    landingState?.heading2_placeholder
                      ? landingState?.heading2_placeholder
                      : "Enter subheading"
                  }
                  onChange={handleChange2}
                  name="heading2"
                  value={heading2}
                  onBlur={() =>
                    SegmentService.analyticsTrack(
                      "Text configured-subheading",
                      {
                        VariablesUsed: variableCount,
                      }
                    )
                  }
                />
              }
            />
          </div>
        )}

        <div>
          <Accordian
            text="Body"
            expanded={expandedPanel === "body"}
            onChange={handleAccordionChange("body")}
            value={
              <TaggedInput
                campaignId={props.campaignId}
                placeholder={
                  landingState?.body_placeholder
                    ? landingState?.body_placeholder
                    : "Enter description"
                }
                onChange={handleChange2}
                name="body"
                value={body}
                onBlur={() =>
                  SegmentService.analyticsTrack("Text configured-body", {
                    VariablesUsed: variableCount,
                  })
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SelectText;
