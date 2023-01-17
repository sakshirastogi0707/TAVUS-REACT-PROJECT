import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./basic-buttons.scss"

export default function BasicButtons( props) {
  
  return (
    <Stack spacing={2} className="basicBUtton" direction="row">
      {
        props.link?<a href={props.link} target='_blank' title={props.title}><Button variant="contained" style={{color:props.color, backgroundColor:props.backgroundColor}} onClick={props.onClick}>{props.title}</Button></a>:<Button variant="contained" style={{color:props.color, backgroundColor:props.backgroundColor}} onClick={props.onClick}>{props.title}</Button>
        
      }
      </Stack>      
  );
}