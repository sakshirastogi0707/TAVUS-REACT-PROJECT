import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePickers(props) {
  return (
    <div className="date-range-picker d-flex justify-content-start">
      <DatePicker
        placeholderText="Start Date"
        dateFormat="dd/MM/yyyy"
        value={props.startDateValue}
        selected={props.startDateSelected}
        onChange={props.selectStartDate}
        maxDate={new Date()}
      />
      <span className="align-self p-2"> To</span>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        placeholderText="End Date"
        value={props.endDateValue}
        selected={props.endDateSelected}
        maxDate={new Date()}
        onChange={props.endDateStartDate}
        disabled={props.disabled}
      />

    </div>
  );
}
