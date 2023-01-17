import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, IconButton} from '@material-ui/core';
import {buttonCommonStyles} from "./styles";

export const ButtonOutlined = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        color: '#F67272',
        border: '1px solid #515666',
        borderRadius: '50px',
        '&:hover': {
            backgroundColor: '#0062FF',
            border: '1px solid #0062FF',
        },
        focused: {
            color: '#ffa000',
        },
        inkbar: {
            '&:after': {
                backgroundColor: '#ffa000',
            },
        },
        
        
    },
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
