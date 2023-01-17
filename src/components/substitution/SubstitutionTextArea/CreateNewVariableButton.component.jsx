import React from 'react'
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@mui/material";
import { CircularProgress } from '@material-ui/core';

const CreateNewVariableButton = ({ onClick, isLoading, disabled }) => {
    return (
      <Button
        style={{
          background: "#1877F2",
          fontSize: "14px",
          textTransform: "none",
          minWidth: "200px",
        }}
        disabled={disabled}
        startIcon={isLoading ? false : <AddIcon /> }
        variant="contained"
        onClick={onClick}
      >
        {isLoading ? <CircularProgress color="white" size="20px" /> : "Create a new variable"}
      </Button>
    );
  };

export default CreateNewVariableButton