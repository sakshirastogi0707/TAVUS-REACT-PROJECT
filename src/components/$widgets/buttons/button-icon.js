import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import {IconButton} from '@material-ui/core';

export const ButtonIcon = withStyles({
    root: {
        '&:focus': {
            outline: 'none',
        }
    }
})(React.forwardRef((props, ref) => <IconButton innerRef={ref} {...props}>{props.children}</IconButton>))
