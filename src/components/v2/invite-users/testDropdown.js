import React, {useEffect, useState, useCallback} from 'react';
import Button from '@mui/material/Button';
import AppDialog from "../../$widgets/AppDialog/AppDialog";
import InputDropdown from "../../$widgets/multiple-input-dropdown/input-dropdown"
import MultiValTextField from "../../$widgets/multiple-input-dropdown/multiValueTextBox"
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import Alert from '@mui/material/Alert';
import { StorageService } from '../../../service/core/storage.service';
import { HTTP } from "../../../service/core/http.service";
import { urls } from "../../../config/urlConfig";
import IconLabelButtons from '../../$widgets/buttons/icon-label-buttons'
import Snackbar from "../../$widgets/snackbar/Snackbar"

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
export default NameForm;