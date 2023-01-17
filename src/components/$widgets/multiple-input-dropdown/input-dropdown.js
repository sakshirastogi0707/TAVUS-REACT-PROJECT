import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AppImage } from '../../$widgets/images/app-image';

export default function Tags(props) {
  const {seat_quantity, seats}=props
  return (
    <Stack spacing={3} className="input-drop">
       <Autocomplete
        multiple
        onKeyDown={props.handleKeyUp}
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        freeSolo
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" 
            deleteIcon={ <AppImage name={'cross-icon.svg'}  width={'24'} />}
            label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            className="input-drop"
            placeholder="Enter Email Addresses"
          />
        )}
      />

    <div className='seats'>{seats}/{seat_quantity} Seats</div>
    </Stack>
  );
}

const top100Films = []