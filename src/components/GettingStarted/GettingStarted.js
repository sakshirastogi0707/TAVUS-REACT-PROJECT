import React, {Component} from 'react';
import './GettingStarted.scss';
import {html} from "./GettingStarted.html";

class GettingStarted extends Component {
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

export default (GettingStarted);
