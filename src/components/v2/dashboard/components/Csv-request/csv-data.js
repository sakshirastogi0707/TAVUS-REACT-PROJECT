import React, { useState, useEffect } from "react";
import { AppImage } from "../../../../$widgets/images/app-image";
import './csv.scss';
import './csv-data.scss';
import {VideoService} from "../../../../../service/api/video.service";


export default function CsvData() {
  const [isloading, setLoading] = useState(false);
  const [requests, setRequests] = useState([])

  const callApiToGetCSVRequests = async () => {
    setLoading(true)
    const requests = await VideoService.getCSVRequests()
    setRequests(requests)
    setLoading(false)
  }

  useEffect(() => {
    callApiToGetCSVRequests()
  }, [])

  const data = [
    {
      id: 1,
      title: "test.csv",
      status: "Complete",
    },
    {
      id: 2,
      title: "test.csv",
      status: "Complete",
    },
    {
      id: 3,
      title: "test.csv",
      status: "Complete",
    },
  ];
  return (
      <div className="CsvContainer">
        <h3>CSV Requests</h3>

        <div className="contDev">
          <div className="dataListContainer">
            {requests?.map((item) => {
              return (
                  <div className="listingContainer">
                    <div className="borderLine"></div>
                    <div className="list-data">
                      <div className="">
                        <h1>{item.title}</h1>
                        <p>{item.status}</p>
                      </div>
                      <div className="downloadSvg">
                      {isloading ? (
                          <AppImage name={"loading_csv.svg"} width={"16"} />
                      ) : (
                          <AppImage onClick={() => window.open(item?.original_csv)} name={"download-bottom-black.svg"} width={"16"} />
                      )}
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}
