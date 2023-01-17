import * as React from 'react';
import Alert from '@mui/material/Alert';
import './Snackbar.scss';
import { AppImage } from '../../$widgets/images/app-image';
import IconButton from '@mui/material/IconButton';
const Snackbar = (props) => {

  return (
        <div className='alertSnackbar'> 
            <Alert severity="error"
            
             action={
              <IconButton
                onClick={props.onClose}
              >
                <AppImage name={'cross-icon.svg'} width={22} />
              </IconButton>
            } 
            >
               {props.serverError}
           </Alert>
        </div>
  );
}
export default Snackbar;
