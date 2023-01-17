import React, {Component} from "react";
import {html} from "./AppDialogCalendly.html";
import {styles} from './AppDialogCalendly.styles';
import {withStyles} from "@material-ui/core";

class AppDialogCalendly extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeviceAboveXS: false,
            modelTitle:props.modelTitle
        }
    }

    onWindowResize = () => {
        const width = document.documentElement.clientWidth;
        if (width > 600) {
            this.setState({
                isDeviceAboveXS: true
            })
        } else {
            this.setState({
                isDeviceAboveXS: false
            })
        }
    };

    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

    render = () => html(this);

}

export default withStyles(styles)(AppDialogCalendly);
