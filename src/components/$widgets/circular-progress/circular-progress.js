import React from "react";
import { render } from "react-dom";
import {
    CircularProgressbar,buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function CircilarProgress(props) {
    return (
        <CircularProgressbar 
            value={props.value} t
            text={`${Math.round(props.value)}%`}
            styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,
                pathColor: props.pathColor,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Text size
                textSize: '18px',
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
                // Colors
                //pathColor: `rgba(62, 152, 199, ${props.value / 100})`,
                textColor: '#000',
                trailColor: '#d6d6d6',
                //backgroundColor: '#3e98c7',
            })}
        />
    )
};

export default CircilarProgress