import React, { useState,useEffect } from "react";
import "./dashboard.scss";
import CsvRequest from "./components/Csv-request/csv-request";
import AppTable from "../../$widgets/app-table-custom/app-table";
import SelectAutoWidthDropdown from "../../$widgets/icon-lable-dropdown/icon-label-dropdown";
import CampaignEditButton from "./components/edit-campaign-button/edit-button";
import CollaboratorsButton from "./components/add-Collaborators-button/add-Collaborators-button";
import {SegmentService} from '../../../service/api/segment.service'


export default function dashboard(props) {
  const columns = [
    { id: 1, field: "Video", headerName: "Video", width: 150 },
    { id: 2, field: "Campaign", headerName: "Campaign", width: 150 },
    { id: 3, field: "Action", headerName: "Action", width: 150 },
    { id: 4, field: "last", headerName: "last", width: 150 },
    { id: 5, field: "first", headerName: "first", width: 150 },
  ];

  
  
  const rows = [
    {
      id: 1,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 2,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 3,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 4,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 5,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 6,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
    {
      id: 7,
      Video: "Ada Lovelace Jan 12, 2022 at 11:59pm",
      Campaign: "Campaign A Jan 12, 2022 at 11:59pm",
      Action: "somthing",
      last: "last name",
      first: "first name",
    },
  ];
  return (
    <div className="container">
      <section className="btnSection">
        <SelectAutoWidthDropdown />
        <CampaignEditButton />
        <CollaboratorsButton />
      </section>
      <section className="tableSection">
        <AppTable rows={rows} columns={columns} pageSize={6} />
        <CsvRequest />
      </section>
    </div>
  );
}
