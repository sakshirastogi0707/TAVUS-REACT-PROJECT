import React, { useState, ComponentProps } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';
import Utils from "../../../service/core/utils";


export function ToolTip(props) {
  const [hovered, setHovered] = useState(false);
  const data = props.data && props.data.map(({ title, ...entry }) => {
    return {
      ...entry,
      tooltip: title,
    };
  });

  function onHoverFunction(data) {
    var element = document.getElementById("chart");
    if(data===false){ 
      element.classList.remove("__react_component_tooltip_hover");     
    } else {
      element.classList.add("__react_component_tooltip_hover");
    }
    setHovered(data)
  }

  function makeTooltipContent(selection) {
    return <div className='d-flex justify-content-around '><span className='tooptipbgc align-self' style={{ background: selection.color }}></span> <h5>{selection.tooltip}</h5></div>;
  }

  return (
    <>
      <PieChart
        data={data}
        lineWidth={20}
        viewBoxSize={50, 50}
        onMouseOver={(e, index) => {
          onHoverFunction(index);
        }}
        onMouseOut={() => {
          onHoverFunction(false);
        }}
        className="piechart_tool"
      />
      <ReactTooltip
        id="chart"
        className="chart-tooltip"
        type={'success'}
        getContent={() =>
          typeof hovered === 'number' ? makeTooltipContent(data[hovered]) : false
        }
      />
    </>
  );
}

export default ToolTip;