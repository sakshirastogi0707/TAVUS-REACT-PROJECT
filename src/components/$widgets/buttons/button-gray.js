import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import { buttonCommonStyles } from "./styles";

export const ButtonGray = withStyles({
    ...buttonCommonStyles,
    root: {
        ...buttonCommonStyles.root,
        minWidth: '44px',
        backgroundColor: '#0062FF',
        color: '#ffffff',
        borderRadius: 10,

        '&:hover': {
            backgroundColor: '#0062FF',
        }
    }
})(React.forwardRef((props, ref) => <Button innerRef={ref} {...props}>{props.children}</Button>))
