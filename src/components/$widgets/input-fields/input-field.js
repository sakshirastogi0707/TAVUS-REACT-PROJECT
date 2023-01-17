import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import './input-fields.scss';
import { withStyles } from "@material-ui/core/styles";

const ariaLabel = { 'aria-label': 'description' };

const Inputs = withStyles({
  input: {
      '&::placeholder': {
          color: '#757B8C !important',
          opacity: '1 !important',
          
      },
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #171720 inset",
        WebkitTextFillColor: "#fff !important",
      }
      

  }

})(Input )

export default Inputs;