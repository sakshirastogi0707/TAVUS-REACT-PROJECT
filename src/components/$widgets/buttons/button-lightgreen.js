import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button} from '@material-ui/core';
import {buttonCommonStyles} from "./styles";

export const ButtonLightGray = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        backgroundColor: '#29CA9C',
        color: '#ffffff',
        borderRadius: '16px',
        border: '1.5px solid #29CA9C',
        fontSize:'16px',
        fontWeight:700,
        '&:hover': {
            backgroundColor: '#29CA9C',
        }
    }
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
