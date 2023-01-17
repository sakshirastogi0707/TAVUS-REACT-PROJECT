import { color } from '@mui/system';
import React from 'react';
import Select, { components } from 'react-select';
import "./singledropdown.scss"

const options = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
];

const selectStyles = {
  menu: base => ({
    ...base,
    zIndex: 100,
    color:"#DDDEE3",
    backgroundColor:"#282C38",
    borderRadius: '10px !important',
    padding:'12px 0px',
    zIndex:999,
    vertical: "bottom",
    horizontal: "left"
  }),
  option: (provided, state) => ({
    ...provided,
    zIndex:999,
    color: state.isSelected ? "#fff" : "#FFFFFF;",
    backgroundColor: state.isSelected ? "#0062FF" : "#282C38",
    cursor: "pointer",
    '&:hover': { backgroundColor: state.isSelected ? "#0062FF" : "#282C38", },
  }),
};



class SingleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };


  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    return (
      <div className="singledropdown">
        <Select
          styles={selectStyles}
          className={this.props.className}
          isMulti={this.props.isMulti}
          value={this.props?.value?.value? this.props.value : ''}
          options={this.props.options}
          placeholder={this.props.placeholder?this.props.placeholder:null}
          onChange={this.props.onChange}
          onInputChange={this.props.onInputChange}
          components={this.props.components}
          menuPlacement="auto"
          menuPosition="fixed !important"
          onMenuClose={this.props.onMenuClose}
          isDisabled={this.props.isDisabled}
        />
      </div>
    );
  }
}

export default SingleDropdown;