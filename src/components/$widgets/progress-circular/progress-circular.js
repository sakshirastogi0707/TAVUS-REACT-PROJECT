import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  }));




function CircularProgressWithLabel(props) {
  const CicularPogressWithStyles = withStyles({
    root: {
        width: '100%',
    },
    colorPrimary: {
        color: props.ringcolor
        
    },
    colorSecondary:{
      color: '#99a6a9'
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    }
})(CircularProgress)  
  return (
    <Box position="relative" display="inline-flex">
      <CicularPogressWithStyles  variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        width={160}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" >
          {`${Math.round(
          props.value,
        )}`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};



export default CircularProgressWithLabel
