
import React, {useEffect, useState, useCallback} from 'react';
import Action from "../../../../../redux/action";
import {useDispatch, useSelector} from "react-redux";
import './template-toggle.scss';
import {AppImage} from '../../../../$widgets/images/app-image';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonNotEmpty() {
    const dispatch = useDispatch()
    const landingState = useSelector(s => s.landingState)
    const template_id = landingState.template_id;
    const templatePreviewType = landingState.templatePreviewType;

    const handleSubmit = (type) => {
        dispatch({
            type: Action.UpdateLandingState,
            payload: {
                templatePreviewType: type
            },
            origin: 'template-toogle.handleSubmit'
        })
    }
  const [alignment, setAlignment] = React.useState('left');
  const [devices, setDevices] = React.useState(() => ['phone']);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleDevices = (event, newDevices) => {
    if (newDevices.length) {
      setDevices(newDevices);
    }
  };

  return (
    <Stack direction="row" className='togglebutton' spacing={4}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="laptop" className={templatePreviewType=='web'?'active':'main'} onClick={() => handleSubmit("web")} aria-label="laptop">
          <AppImage name={"computer-free-icon-font.svg"}/>
        </ToggleButton>
        <ToggleButton className={templatePreviewType=='mobile'?'active':'main'} onClick={() => handleSubmit("mobile")} value="phone" aria-label="phone">
          <AppImage name={'mobile-icon.svg'}/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
