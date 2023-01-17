import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./multidropdown.scss"

function  MultipleSelectLocation ({optiondData,handleChangeOption}){
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: 'Thing 1', value: 1},
    { label: 'Thing 2', value: 2},
  ];

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "")) {
      return `${placeholderButtonLabel}`;
    } else {
      let seletedValue = [];
      value.forEach(element => {
          seletedValue.push(element.label)
      });
      let dropdownValue = seletedValue.join(', ')
      dropdownValue = dropdownValue.slice(0, 18) + (dropdownValue > 18 ? "..." : "")
      if(seletedValue.length >=1){
          return dropdownValue
      }else{
          return 'Location';
      }
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
     
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
        this.setState(value);
    } else {
     
      this.setState(value);
    }
  }

  return (
    <div className="multi-select">
      <ReactMultiSelectCheckboxes
        options={[...options]}
        hideSearch={'false'}
        placeholderButtonLabel="Location"
        getDropdownButtonLabel={getDropdownButtonLabel}
        value={selectedOptions}
        onChange={onChange}
        setState={setSelectedOptions}
      />
    </div>
  );
};

export default MultipleSelectLocation;
