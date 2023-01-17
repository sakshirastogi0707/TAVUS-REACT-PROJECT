import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { colors } from "../config/variableColors";

const useSuggestionStyles = makeStyles({
  suggestionContainer: {
    cursor: "pointer",
    backgroundColor: "#1D1F28",
    borderRadius: "5px",
    margin: "0 0 8px 0",
    padding: "4px 0",
    border: "1px solid #1D1F28",
  },
});

const Entry = ({
  mention,
  onMentionSelect,
  theme,
  searchValue, // eslint-disable-line no-unused-vars
  isFocused, // eslint-disable-line no-unused-vars
  setCurrentToFocusIndex,
  ...parentProps
}) => {
  const classes = useSuggestionStyles();
  if (mention.id === undefined) return null;
  const idxColor = mention.colorIdx;
  const color = colors[idxColor].font;
  return (
    <Grid
      onMouseEnter={()=>{
        setCurrentToFocusIndex()
      }}
      onMouseUp={async () => {
        await onMentionSelect(mention);
      }}
      item
      container
      style={isFocused ? { borderColor: "#1877F2" } : {}}
      className={classes.suggestionContainer}
      alignItems="center"
    >
      <Grid item>
        <FiberManualRecordIcon
          style={{ color: color, fontSize: "8px", margin: "0 13px" }}
        />
      </Grid>
      <Grid item style={{ color: "white", fontSize: "14px" }}>
        {mention.name}
      </Grid>
    </Grid>
  );
};

export default Entry;
