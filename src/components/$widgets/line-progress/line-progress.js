import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@mui/material/Box';



export default function LinearProgres(props) {

  return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress  variant="determinate" value={props.value}/>
        </Box>
  );
}