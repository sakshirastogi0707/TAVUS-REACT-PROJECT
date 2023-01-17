import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './input-fields.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      background: '#ffffff',
    },
  },
}));

export default function TextFieldsCustom(props) {
  const classes = useStyles();

  return (
    <div className={'text-field-custom'}>
       <TextField autoComplete='off' id="standard-basic" label={props.label}   {...props} />
       {props.isEdit && <span className="show-edit"> Edit </span>}
    </div>
  );
}
