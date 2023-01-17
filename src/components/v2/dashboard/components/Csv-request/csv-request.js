import React from "react";
import "./csv.scss";
import CsvData from "../Csv-request/csv-data";
export default function csvRequest() {
  return (
    <div className="CsvContainer">
      <h3>CSV Requests</h3>
      <CsvData />
    </div>
  );
}
