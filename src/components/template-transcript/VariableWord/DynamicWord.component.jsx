import React from "react";
import { colors } from "../../substitution/config/variableColors";



export const DynamicWord = ({ name, colorIdx }) => {
  return (
    <span
      style={{
        color: colors[colorIdx]?.font,
        background: colors[colorIdx]?.background,
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