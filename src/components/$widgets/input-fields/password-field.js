import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Inputs from '../../$widgets/input-fields/input-field';
import {AppImage} from "../../$widgets/images/app-image";
import './input-field.scss';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffSharpIcon from '@material-ui/icons/VisibilityOffSharp';
const useStyles = makeStyles((theme) => ({
  root: {  
    //  margin: theme.spacing(1),
    //  width: '50ch',
      
  },

}));

export default function PasswordField(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false)
  const [pwdType, setpwdType] = useState('password')

  function showPwd(){
    if(show==true){
      setShow(false)
      setpwdType('password')
    } else {
      setShow(true)
      setpwdType('text')
    }
  }

  return ( 
    <div className="position-relative">
      <Inputs type="password" id="Password" label={props.label} type={pwdType} variant="outlined" {...props} placeholder="Password"/>
    
    {/* <TextField id="Password" label={props.label} type={pwdType} variant="outlined" {...props}  /> */}
    <span className={show==false? 'show-password':'show-password1'}  onClick={()=>showPwd()}   >
      {show==false ?
         <AppImage name={'eye-crossed-new.svg'} width="16"/>
         :
         <AppImage name={'eye-new.svg'}  width="16" />
      }
   
    
   </span>
      
    {/* <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="Standard" />
     <TextField id="filled-basic" label="Filled" variant="filled" /> 
    </form> */}
    </div>
  );
}
