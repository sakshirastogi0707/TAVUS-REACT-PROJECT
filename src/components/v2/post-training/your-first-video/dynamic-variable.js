import React from "react";



export const DynamicWord = ({ name, colorIdx }) => {
  return (
    <span
      style={{
        color: colorIdx,
        borderRadius: "8px",
        fontSize: "20px",
        padding: "2px 8px",
      }}
    >
      @{name}
    </span>
  );
};

export default DynamicWord