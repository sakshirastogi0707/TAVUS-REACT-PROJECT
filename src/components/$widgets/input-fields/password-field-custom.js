import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {AppImage} from "../images/app-image";
import './input-fields.scss';
const useStyles = makeStyles((theme) => ({
  root: {  
   
      
  },

}));

export default function PasswordFieldCustom(props) {
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
    <div className="text-field-custom">
      <TextField id="Password" label={props.label} type={pwdType} {...props}  />
      <AppImage className={show==false? 'change-password':'change-password1'} onClick={()=>showPwd()} name={show==false? 'eye-closed.png':'eye-open.png'} />
    </div>
  );
}
