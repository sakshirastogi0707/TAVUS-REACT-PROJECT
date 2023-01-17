import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {Button, IconButton} from '@material-ui/core';
import {buttonCommonStyles} from "./styles";

export const ButtonGreenOutlined = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        color: '#171725',
        border: '2px solid #29CA9C',
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
