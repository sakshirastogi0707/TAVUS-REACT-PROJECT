import React from 'react'
import  Button  from '@mui/material/Button'
import buttonsTheme from '../buttonTheme/buttonTheme'
import { ArrowIconLeft } from '../../icons'
import { ThemeProvider } from "@mui/material/styles"
import ArrowIconRight from '../../icons/ArrowIconRight/ArrowIconRight.component'



const ActionArrowButton = ({isLeft, ...rest}) => {
    return (
    <ThemeProvider theme={buttonsTheme}>
            <Button {...rest} color={isLeft ? "secondary" : "primary"}  style={
                {    
                    color:"rgba(0,0,0,0)",
                    boxShadow: "none",
                    padding: "2px 4px",
                    minHeight: 32,
                    minWidth: 32,
                }
            } variant="contained" >
                   {isLeft ? <ArrowIconLeft style={{fontSize: '20px'}}/> : <ArrowIconRight style={{fontSize: '20px'}} />}
                </Button>
    </ThemeProvider>
)}



export default ActionArrowButton