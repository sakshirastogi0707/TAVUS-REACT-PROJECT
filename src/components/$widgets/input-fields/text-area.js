import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';
import './input-fields.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      
    },
  },
}));

export default function Textarea(props) {
  const classes = useStyles();
  return (
    <div className={'text-field'}>
       <TextareaAutosize onBlur={props.onBlur} autoComplete='off' id="outlined-basic" label={props.label}  variant="outlined" {...props} />
    </div>
  );
}
