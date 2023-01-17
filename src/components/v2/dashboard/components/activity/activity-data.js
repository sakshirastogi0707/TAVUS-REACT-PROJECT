import React from "react";
import "./activity-data.scss";
export default function activityData() {
  const data = [
    {
      id: 1,
      title: "Cold Reach Out A",
      time: "2 days ago",
      info: "CTA Clicked · Denver, CO · iPhone XR",
    },
    {
      id: 2,
      title: "Cold Reach Out A",
      time: "2 days ago",
      info: "CTA Clicked · Denver, CO · iPhone XR",
    },
    {
      id: 3,
      title: "Cold Reach Out A",
      time: "2 days ago",
      info: "CTA Clicked · Denver, CO · iPhone XR",
    },
  ];
  return (
    <div className="Container">
      <div className="dataListContainer">
        {data?.map((item) => {
          return (
            <div className="listingContainer">
              <div className="borderLine"></div>
              <div className="list-data">
                <h1>{item.title}</h1>
                <p>{item.time}</p>
              </div>
              <p>{item.info}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
