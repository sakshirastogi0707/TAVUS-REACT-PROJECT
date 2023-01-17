import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AppImage } from "../images/app-image";
import "./app-table.scss";

export default function Table(props) {
  return (
    <div className="table-container">
      <div className="table">
        <div className="table-heading-container d-flex justify-content-between">
          <div><h3>My Videos</h3></div>
          <div className="image-container">
            <h5><AppImage name={"download-bottom-icon.svg"} width={"13"} /> <span>Export</span> </h5>
          </div>
        </div>
        <div className="data-grid">
          <DataGrid
            rows={props.rows}
            columns={props?.columns}
            width={props?.width}
            hideFooterPagination={true}
          />
        </div>
      </div>
    </div>
  );
}
