import React from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Chip from "@mui/material/Chip";

const DynamicBlock = (props) => {
  const { onClick } = props;
  return (
    <div className="file-info-block-wrapper dynamic-block">
      <div>
        <Chip
          label="@background_url"
          variant="outlined"
          className="variable-chip"
        />{" "}
        =
      </div>
      <div className="text-field-wrapper">
        <Input
          placeholder="Video URL"
          id="url-input"
          onChange={props.onChange}
          type="url"
        />
      </div>
      <Button
        className="test-dynamic-wrapper"
        disabled={props.setGeneratingVedio}
        fullWidth
        onClick={onClick}
      >
        Test Dynamic
      </Button>
    </div>
  );
};

export default DynamicBlock;
