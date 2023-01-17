import * as React from 'react';
import Button from '@mui/material/Button';
import { AppImage } from '../../$widgets/images/app-image';
import Stack from '@mui/material/Stack';
import "./icon-label-buttons.scss"

export default function EndIconLabelButtons(props) {
  return (
   <div className='endiconButton'>
     <Button variant="contained" disabled={props.disabled} style={{background: props.color}} className={'icon-label-button '+props.className} onClick={props.onClick} endIcon={props.endIcon && <AppImage name={props.endIcon} width={'20'}/>}>
      {props.title}
      </Button>
   </div>
    
 
  );
}