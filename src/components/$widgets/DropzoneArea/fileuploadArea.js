import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import './fileuploadArea.scss'
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    return <DropzoneArea 
              onChange={this.props.onChange} 
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={false}
              maxFileSize={5000000}
              dropzoneText="Drag and drop or browse to choose a file"
          />;
  }
}
