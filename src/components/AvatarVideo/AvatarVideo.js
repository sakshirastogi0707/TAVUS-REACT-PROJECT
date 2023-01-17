import React, {Component} from 'react';
import './AvatarVideo.scss';
import {html} from "./AvatarVideo.html";

class AvatarVideo extends Component {
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

export default (AvatarVideo);
