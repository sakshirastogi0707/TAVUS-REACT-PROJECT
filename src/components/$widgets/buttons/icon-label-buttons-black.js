import * as React from 'react';
import Button from '@mui/material/Button';
import { AppImage } from '../../$widgets/images/app-image';
import Stack from '@mui/material/Stack';
import "./icon-label-buttons.scss"

export default function IconLabelButtonsBlack(props) {
  return (
   <div className='iconButtonBlack'>
     <Button variant="contained" disabled={props.disabled} className={'icon-label-button'} onClick={props.onClick} startIcon={props.startIcon && <AppImage name={props.startIcon} width={'20'}/>}>
      {props.title}
      </Button>
   </div>
    
 
  );
}