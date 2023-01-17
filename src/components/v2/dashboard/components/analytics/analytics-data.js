import React from "react";
import "./analytics-data.scss";

export default function analyticsData() {
  const data = [
    {
      id: 1,
      title: "Impressions",
      analytics: "193",
      progress: "20% last 30 days",
    },
    {
      id: 2,
      title: "Impressions",
      analytics: "193",
      progress: "20% last 30 days",
    },
    {
      id: 3,
      title: "Impressions",
      analytics: "193",
      progress: "20% last 30 days",
    },
    {
      id: 4,
      title: "Impressions",
      analytics: "193",
      progress: "20% last 30 days",
    },
  ];
  return (
    <div className="analytics-data-component">
      {data?.map((item) => {
        return (
          <div className="wrapper">
            <h4>{item.title}</h4>
            <div className="inner-div">
              <h2>{item.analytics}</h2>
            </div>
            <p>{item.progress}</p>
          </div>
        );
      })}
    </div>
  );
}
