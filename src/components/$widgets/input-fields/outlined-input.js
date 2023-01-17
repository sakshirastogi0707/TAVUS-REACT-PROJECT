import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import './outlined-input.scss';

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 12,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#232631' : '#232631',
      border: '0px solid #232631',
      fontSize: 16,
      width: 'auto',
      height:50,
      padding: '0px 16px',
      transition: theme.transitions.create([
        
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

export default function OutlinedInputCustom(props) {
  return (
    <BootstrapInput placeholder={props.placeholder}   {...props}   id="bootstrap-input" />
  );
}