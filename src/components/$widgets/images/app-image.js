import React from 'react';
import PropTypes from 'prop-types';
import {Config} from "../../../config/config";

export function AppImage(props) {
    const src = props.src || `${Config.IMAGE_URL}/assets/images/${props.name}`
    return (
        <img src={src}
             alt={props.alt || 'TAVUS'} {...props}/>
    );
}

AppImage.propTypes = {
    name: PropTypes.string
};
