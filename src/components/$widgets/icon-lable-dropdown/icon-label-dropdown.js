import React from "react";
import { components } from "react-select";
import Select from "react-select";
import { AppImage } from "../images/app-image";
import "./icon-label-dropdown.scss"
const options = [
  {
    label: "Option 1",
    value: 0,
    image: "meeting-camera.svg",
  },
  {
    label: "Option 2",
    value: 1,
    image: "setting-icon.svg",
  },
  {
    label: "Option 3",
    value: 2,
    image: "upload-bottom.svg",
  },
];
export default function Dropdown() {
  const { SingleValue, Option } = components;
  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <AppImage name={props.data.image} width={"16"} style={{marginRight: '9px' }}/>
      {props.data.label}
    </SingleValue>
  );
  const IconOption = (props) => (
    <Option {...props}>
      <AppImage name={props.data.image} width={"16"} style={{marginRight: '9px' }} />
      {props.data.label}
    </Option>
  );
  const customStyles = {
    option: (provided, state ) => ({
      ...provided,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontWeight:500,
      fontSize: 14,
      zIndex:999,
      padding:'12px 20px',
      color: state.isSelected ? "#fff" : "#FFFFFF;",
      backgroundColor: state.isSelected ? "#0062FF" : "#282C38",
      cursor: "pointer",
      '&:hover': { backgroundColor: state.isSelected ? "#0062FF" : "#282C38", },
    }),
    menu: base => ({
      ...base,
      zIndex: 100,
      color:"#DDDEE3",
      fontWeight:500,
      backgroundColor:"#282C38",
      borderRadius: '10px !important',
      padding:'24px 0px',
      zIndex:999,
      vertical: "bottom",
                horizontal: "left"
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }),
  };
  return (
    <div className="select-with-image">
      <Select
        styles={customStyles}
        components={{ SingleValue: IconSingleValue, Option: IconOption }}
        options={options}
        placeholder={"Generate"}
      />
    </div>
  );
}