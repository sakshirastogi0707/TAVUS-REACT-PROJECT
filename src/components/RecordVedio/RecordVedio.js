import React, {Component} from 'react';
import './RecordVideo.scss';
import {html} from "./RecordVideo.html";

class RecordVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }

    componentDidMount() {

    }

    render = () => html.apply(this);
}

export default (RecordVideo);
