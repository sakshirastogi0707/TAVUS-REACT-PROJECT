import React, { useState } from "react";
import { KeyboardTimePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import './time-picker.scss';
import {AppImage} from "../../$widgets/images/app-image";

export default function TimePickers(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
      <div className="time-pickers">
          <MuiPickersUtilsProvider  utils={DateFnsUtils}>
            <KeyboardTimePicker
              helperText={''}
              placeholder="08:00"
              label={props.label}
              mask="__:__ _M"
              value={props.selectedDate}
              onChange={props.onChange}
              minDate={props.minDate}
              disabled={props.disabled}
            />
            <AppImage name={props.icon} className="time-img" />
            
          </MuiPickersUtilsProvider>
      </div>
  );
}
