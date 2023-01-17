import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './date-picker.scss';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {AppImage} from "../../$widgets/images/app-image";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
      <div className="date-picker">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          minDateMessage={false}
          maxDateMessage={false}
          minDate={props.minDate}
          maxDate={props.maxDate}
          autoOk={true}
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={props.label}
          value={props.selectedDate}
          onChange={props.onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          disabled={props.disabled}
          TextFieldComponent={props.TextFieldComponent}
          open={props.open}
          onClose={props.onClose}
        />
        </MuiPickersUtilsProvider>
      </div>
  );
}
