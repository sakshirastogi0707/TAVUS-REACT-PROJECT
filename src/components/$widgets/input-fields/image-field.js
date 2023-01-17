import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './image-field.scss';
import {AppImage} from "../../$widgets/images/app-image";
import TaggedInput from "../../v2/landing/components/input-with-tags/input-with-tags";

export default function InputWithIcon(props) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl className='input-label' variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          {props.label}
        </InputLabel>
          {props.taggedInput === true
              ? <TaggedInput 
                            campaignId={props.campaignId}
                            value={props.value}
                            name={props.name}
                            onChange={props.onChange}
                            onBlur={props.onBlur}
                            placeholder={props.placeholder}
                            id="input-with-icon-adornment" />
              : <Input
                  value={props.value}
                  name={props.name}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
                  placeholder={props.placeholder}
                  id="input-with-icon-adornment"
                  startAdornment={
                      <InputAdornment position="start">
                          {/* < AccountCircle  /> */}
                          <AppImage name={props.textIcon}   width={'24'} />
                      </InputAdornment>
                  }
              />
          }

      </FormControl>
    </Box>
  );
}