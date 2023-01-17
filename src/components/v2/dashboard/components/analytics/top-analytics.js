import React from "react";
import "./top-analytics.scss";
import AnalyticsData from './analytics-data'
export default function topAnalytics() {
  return (
    <div className="analyicsComponent">
      <h3>Top Analytics</h3>
      <AnalyticsData />
     </div>
  );
}
