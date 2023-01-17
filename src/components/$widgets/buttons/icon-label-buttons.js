import * as React from 'react';
import Button from '@mui/material/Button';
import { AppImage } from '../../$widgets/images/app-image';
import Stack from '@mui/material/Stack';
import "./icon-label-buttons.scss"

export default function IconLabelButtons(props) {
  const className = props.className ? props.className + ' icon-label-button' : 'icon-label-button'
  return (
   <div className='iconButton'>
     <Button variant="contained" disabled={props.disabled} className={className} onClick={props.onClick} startIcon={props.startIcon && <AppImage name={props.startIcon} width={'20'}/>}>
      {props.title}
      </Button>
   </div>
    
 
  );
}