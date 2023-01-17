import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button} from '@material-ui/core';
import {buttonCommonStyles} from "./styles";

export const ButtonGreen = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        backgroundColor: '#1AF98E',
        color: 'rgb(9, 37, 43)',
        '&:hover': {
            backgroundColor: '#1AF98E',
        },
    },
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
