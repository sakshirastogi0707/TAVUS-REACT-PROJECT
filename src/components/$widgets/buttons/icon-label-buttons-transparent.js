import * as React from 'react';
import Button from '@mui/material/Button';
import { AppImage } from '../../$widgets/images/app-image';
import Stack from '@mui/material/Stack';
import "./icon-label-buttons.scss"

export default function IconLabelButtonsTransparent(props) {
  return (
   <div className='iconButtonTransparent'>
     <Button variant="contained" disabled={props.disabled} className={'icon-label-button'} onClick={props.onClick} startIcon={props.startIcon && <AppImage name={props.startIcon} width={'20'}/>}>
      {props.title}
      </Button>
   </div>
    
 
  );
}