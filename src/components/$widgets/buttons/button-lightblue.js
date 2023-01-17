import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button} from '@material-ui/core';
import {buttonCommonStyles} from "./styles";

export const ButtonLightBlue = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        backgroundColor: '#0062FF;',
        color: '#ffffff',
        borderRadius: '30px',
        fontSize:'16px',
        fontWeight:700,
        border: '0px solid #0062FF;',
        '&:hover': {
            backgroundColor: '#0062FF;',
            color:"#ffffff;",
        }
    }
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
