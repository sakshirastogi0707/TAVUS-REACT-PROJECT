import React from 'react'
import  Button  from '@mui/material/Button'
import buttonsTheme from '../buttonTheme/buttonTheme'
import { ThemeProvider } from "@mui/material/styles"


const ActionTextButton = ({styleOverwrites, ...rest}) => {
    return (
    <ThemeProvider theme={buttonsTheme}>
            <Button style={{padding: "16px 50px", boxShadow: "none", textTransform: "capitalize", ...styleOverwrites}} {...rest } variant="contained" />
    </ThemeProvider>
)}



export default ActionTextButton