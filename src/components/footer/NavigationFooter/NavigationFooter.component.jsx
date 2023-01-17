import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { ArrowIcon } from "../../icons";
import ActionTextButton from "../../buttons/ActionTextButton/ActionTextButton.component";
import NavFooterItem from "../NavFooterStepItem/NavFooterStepItem.component";
import { VideoTemplateFlow } from "./NavigationFooter.config";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ActionArrowButton } from "../../buttons";

//TODO: Add Multiple Flows in the Config
const items = VideoTemplateFlow;

const useStyles = makeStyles({
  arrowIconItem : { display: "inline-block", lineHeight: "6px" },
  footerContainer: {
    backgroundColor:"#232631",
    minHeight: "100px",
    maxWidth: "100vw"
}
})


const AppFooter = ({
  stepActive,
  onBackClick,
  onForwardClick,
  isForwardDisabled,
}) => {
  const classes = useStyles()
  const isMedium = useMediaQuery("(max-width:900px)");
  const currentItems = isMedium
    ? items.slice(stepActive, stepActive + 2)
    : items;
  return (
    <div style={{ position: "sticky", bottom: 0, zIndex: 100 }}>
      <Grid
        container
        className={classes.footerContainer}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item>
          {isMedium ? (
            <ActionArrowButton onClick={onBackClick} isLeft={true} />
          ) : (
            <ActionTextButton
              size="large"
              color="secondary"
              onClick={onBackClick}
            >
              Cancel
            </ActionTextButton>
          )}
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={5}
          sm={7}
        >
          {currentItems.map((item, idx) => {
            const step = idx + 1;
            const isComplete = step < stepActive;
            const isActive = step === stepActive;
            return (
              <React.Fragment key={`Fargment-Container-${idx}`}>
                <NavFooterItem
                  key={`NavFooterItem-${idx}`}
                  {...item}
                  number={step}
                  isActive={isActive}
                  isComplete={isComplete}
                />
                {idx < currentItems.length - 1 && (
                  <Grid
                    item
                    className={classes.arrowIconItem}
                  >
                    <ArrowIcon style={{ fontSize: "8px" }} />
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
        </Grid>
        <Grid item>
          {isMedium ? (
            <ActionArrowButton color="primary" onClick={onForwardClick} />
          ) : (
            <ActionTextButton
              disabled={isForwardDisabled}
              size="large"
              color="primary"
              onClick={onForwardClick}
            >
              Continue
            </ActionTextButton>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AppFooter;
